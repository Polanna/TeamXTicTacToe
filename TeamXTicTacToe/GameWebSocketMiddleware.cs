using System;
using System.Collections.Concurrent;
using System.IO;
using System.Net.WebSockets;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.WebSockets;
namespace TeamXTicTacToe
{
    public class GameWebSocketMiddleware
    {
        private static ConcurrentDictionary<string, WebSocket> _sockets = new ConcurrentDictionary<string, WebSocket>();

        private readonly RequestDelegate _next;

        public GameWebSocketMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            if (!context.WebSockets.IsWebSocketRequest)
            {
                await _next.Invoke(context);
                return;
            }

            CancellationToken ct = context.RequestAborted;
            WebSocket currentSocket = await context.WebSockets.AcceptWebSocketAsync();

            var socketId = Guid.NewGuid().ToString();
            bool success = _sockets.TryAdd(socketId, currentSocket);
            if (success)
            {
                System.Diagnostics.Debug.WriteLine("this client is " + socketId);
                var message = "yourID:" + socketId;
                await SendStringAsync(currentSocket, message, ct);
            }

            while (true)
            {
                if (ct.IsCancellationRequested)
                {
                    break;
                }

                var response = await ReceiveStringAsync(currentSocket, ct);
                // ^^ server receive a response from one of the clients
                if (string.IsNullOrEmpty(response))
                {
                    if (currentSocket.State != WebSocketState.Open)
                    {
                        break;
                    }

                    continue;
                }

                /// <- here the server receive a message from one of the clients
                string[] val = response.Split(':');
                if (val.Length == 4 && val[1].Trim(' ').Length == 36)
                {
                    //1st: name of sender, 2nd: unique ID of sender, 3nd: unique ID of receiver
                    // 4th:message
                    string target_from = val[1].Trim(' ');
                    string target_to = val[2].Trim(' ');

                    WebSocket from;
                    WebSocket to;

                    bool found_from = _sockets.TryGetValue(target_from, out from);
                    bool found_to = _sockets.TryGetValue(target_to, out to);

                    var private_message = val[0].Trim(' ') + ":" + val[3].Trim(' ');
                    await SendStringAsync(from, private_message, ct);
                    await SendStringAsync(to, private_message, ct);

                }
                else
                {
                    foreach (var socket in _sockets)
                    {
                        if (socket.Value.State != WebSocketState.Open)
                        {
                            // if null socket then pass
                            continue;
                        }



                        await SendStringAsync(socket.Value, response, ct);

                        // server broadcasting message
                        // FYI: socket.Value is each client socket
                        // socket.Key is the unique ID of each client
                    }
                }

            }

            WebSocket dummy;
            _sockets.TryRemove(socketId, out dummy);

            await currentSocket.CloseAsync(WebSocketCloseStatus.NormalClosure, "Closing", ct);
            currentSocket.Dispose();
        }

        private static Task SendStringAsync(WebSocket socket, string data, CancellationToken ct = default(CancellationToken))
        {

            var buffer = Encoding.UTF8.GetBytes(data);
            var segment = new ArraySegment<byte>(buffer);
            return socket.SendAsync(segment, WebSocketMessageType.Text, true, ct);
        }

        private static async Task<string> ReceiveStringAsync(WebSocket socket, CancellationToken ct = default(CancellationToken))
        {
            var buffer = new ArraySegment<byte>(new byte[8192]);
            using (var ms = new MemoryStream())
            {
                WebSocketReceiveResult result;
                do
                {
                    ct.ThrowIfCancellationRequested();

                    result = await socket.ReceiveAsync(buffer, ct);
                    ms.Write(buffer.Array, buffer.Offset, result.Count);
                }
                while (!result.EndOfMessage);

                ms.Seek(0, SeekOrigin.Begin);
                if (result.MessageType != WebSocketMessageType.Text)
                {
                    return null;
                }

                // Encoding UTF8: https://tools.ietf.org/html/rfc6455#section-5.6
                using (var reader = new StreamReader(ms, Encoding.UTF8))
                {
                    return await reader.ReadToEndAsync();
                }
            }
        }
    }
}
