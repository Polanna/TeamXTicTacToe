using System;
using System.Collections.Concurrent;
using System.IO;
using System.Net.WebSockets;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

//using Microsoft.AspNetCore.WebSockets;
//using System.Collections.Generic.IList;

namespace TeamXTicTacToe
{
    public class GameWebSocketMiddleware
    {
        private static ConcurrentDictionary<string, WebSocket> _sockets = new ConcurrentDictionary<string, WebSocket>();

        private readonly RequestDelegate _next;

        private System.Collections.Generic.HashSet<string> connectionIDs = new System.Collections.Generic.HashSet<string>();


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

            System.Diagnostics.Debug.WriteLine("here0");

            CancellationToken ct = context.RequestAborted;
            WebSocket currentSocket = await context.WebSockets.AcceptWebSocketAsync();

            var socketId = Guid.NewGuid().ToString();
            bool success = _sockets.TryAdd(socketId, currentSocket);

            System.Diagnostics.Debug.WriteLine("here1");
            if (success)
            {

                //System.Diagnostics.Debug.WriteLine("============");
                foreach(var s in connectionIDs){
                    //System.Diagnostics.Debug.WriteLine(s);
                    //WebSocket to;
                    //bool found_from = _sockets.TryGetValue(s, out to);
                    var broadcast = "Lobby:" + "Add:" + s;
                    await SendStringAsync(currentSocket, broadcast, ct);
                }
                //System.Diagnostics.Debug.WriteLine("xxxxxxxxxxxx");

                var showMyID = "yourID:" + socketId;
                await SendStringAsync(currentSocket, showMyID, ct);
                //var count = 0;
                
            }
            
            


            while (true)
            {
                if (ct.IsCancellationRequested)
                {
                    break;
                }

                System.Diagnostics.Debug.WriteLine("here2");
                var response = await ReceiveStringAsync(currentSocket, ct);
                System.Diagnostics.Debug.WriteLine(response);
                //System.Diagnostics.Debug.WriteLine("here3");
                //if (response.GetTypeCode == WebSocketMessageType.Close)
                //{

                //}
                // ^^ server receive a response from one of the clients
                if (string.IsNullOrEmpty(response))
                {
                    System.Diagnostics.Debug.WriteLine("shutting 1 down");
                    System.Diagnostics.Debug.WriteLine(currentSocket.State);
                    System.Diagnostics.Debug.WriteLine(response);

                    if (currentSocket.State != WebSocketState.Open)
                    {
                        break;
                    }


                    break;

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

                if (val.Length == 3 && val[0].Trim(' ') == "Lobby")
                {
                    if (val[1].Trim(' ') == "Add")
                    {

                        foreach (var socket in _sockets)
                        {
                            if (socket.Value.State != WebSocketState.Open)
                            {
                                // if null socket then pass
                                continue;
                            }
                            var broadcast = "Lobby:" + "Add:" + socketId;
                            connectionIDs.Add(socketId);
                            await SendStringAsync(socket.Value, broadcast, ct);
                        }
                    }
                    if (val[1].Trim(' ') == "Remove")
                    {
                        //System.Diagnostics.Debug.WriteLine("REMOVING");
                        foreach (var socket in _sockets)
                        {
                            if (socket.Value.State != WebSocketState.Open)
                            {
                                // if null socket then pass
                                continue;
                            }
                            var broadcast = "Lobby:" + "Remove:" + socketId;
                            connectionIDs.Remove(socketId);
                            await SendStringAsync(socket.Value, broadcast, ct);
                        }
                    }
                }
                
            }
            System.Diagnostics.Debug.WriteLine("here3");
            WebSocket dummy;
            _sockets.TryRemove(socketId, out dummy);

            //await currentSocket.CloseOutputAsync(WebSocketCloseStatus.NormalClosure, string.Empty, CancellationToken.None);
            await currentSocket.CloseAsync(WebSocketCloseStatus.NormalClosure, "Closing", ct);
            currentSocket.Dispose();
            System.Diagnostics.Debug.WriteLine("here4");

        }

        private static Task SendStringAsync(WebSocket socket, string data, CancellationToken ct = default(CancellationToken))
        {

            var buffer = Encoding.UTF8.GetBytes(data);
            var segment = new ArraySegment<byte>(buffer);

            
            return socket.SendAsync(segment, WebSocketMessageType.Text, true, ct);
        }

        

        private static async Task<string> ReceiveStringAsync(WebSocket socket, CancellationToken ct = default(CancellationToken))
        {
            try
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
            catch (Exception ex)
            {
                return null;
            }


        }
    }
}
