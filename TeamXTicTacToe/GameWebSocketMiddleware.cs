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

        private System.Collections.Generic.Dictionary<string,string> connectionNameIDs = new System.Collections.Generic.Dictionary<string,string>();
        private System.Collections.Generic.Dictionary<string, string> Statuses = new System.Collections.Generic.Dictionary<string, string>();

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
                var showMyID = "yourID:" + socketId;
                await SendStringAsync(currentSocket, showMyID, ct);
                // getting to know others currently in the lobby
                foreach (var s in connectionNameIDs)
                {
                    string broadcast;
                    if (s.Key.Length > 0)
                    {
                        string stat = "";
                        Statuses.TryGetValue(s.Key, out stat);
                        broadcast = "Lobby:" + "Add:" + s.Key + ":" + s.Value +":"+ stat;
                    }
                    else
                    {
                        broadcast = "Lobby:" + "Add:" + s.Value;
                    }
                    await SendStringAsync(currentSocket, broadcast, ct);
                }
                //System.Diagnostics.Debug.WriteLine("xxxxxxxxxxxx");

                
                //var count = 0;

            }




            while (true)
            {
                if (ct.IsCancellationRequested)
                {
                    break;
                }


                var response = await ReceiveStringAsync(currentSocket, ct);
                
                
                
                if (string.IsNullOrEmpty(response))
                {
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

                if (val.Length == 4 && val[0].Trim(' ') == "Lobby")
                {
                    if (val[1].Trim(' ') == "Add")
                    {
                        bool s = connectionNameIDs.TryAdd(val[2].Trim(' '), val[3].Trim(' '));
                        System.Diagnostics.Debug.WriteLine(s);
                        foreach (var socket in _sockets)
                        {
                            if (socket.Value.State != WebSocketState.Open)
                            {
                                // if null socket then pass
                                continue;
                            }
                            var name = val[2].Trim(' ');
                            var ID = val[3].Trim(' ');
                            Statuses.TryAdd(name, "Available");
                            var broadcast = "Lobby:" + "Add:" + name + ":" + ID + ":Available";
                            
                            await SendStringAsync(socket.Value, broadcast, ct);
                        }
                    }
                    if (val[1].Trim(' ') == "Invite" || val[1].Trim(' ') == "In-Game")
                    {
                            string inviterID = val[2].Trim(' ');
                            string inviteeID = val[3].Trim(' ');
                        string inviterName = "";
                        string inviteeName = "";

                        foreach (var s in connectionNameIDs)
                        {
                            if (s.Value == inviterID) { inviterName = s.Key; }
                            else if (s.Value == inviteeID) { inviteeName = s.Key; }

                        }

                        string broadcast = "";
                        if (val[1].Trim(' ') == "Invite") { 
                            broadcast =  "Lobby:Update:" + inviterID + ":Inviting:" + inviteeID + ":getting invited";
                            Statuses[inviterName] = "Inviting";
                            Statuses[inviteeName] = "getting invited";
                        }
                        else if (val[1].Trim(' ') == "In-Game") { 
                            broadcast = "Lobby:Update:" + inviterID + ":In-Game:" + inviteeID + ":In-Game";
                            Statuses[inviterName] = "In-Game";
                            Statuses[inviteeName] = "In-Game";
                        }
                            foreach (var socket in _sockets)
                            {
                                if (socket.Value.State != WebSocketState.Open)
                                {
                                    // if null socket then pass
                                    continue;
                                }
                                await SendStringAsync(socket.Value, broadcast, ct);
                            }
                    }
                    
                }

            }

            WebSocket dummy;
            _sockets.TryRemove(socketId, out dummy);

            //await currentSocket.CloseOutputAsync(WebSocketCloseStatus.NormalClosure, string.Empty, CancellationToken.None);
            await currentSocket.CloseAsync(WebSocketCloseStatus.NormalClosure, "Closing", ct);
            currentSocket.Dispose();

        }

        private static Task SendStringAsync(WebSocket socket, string data, CancellationToken ct = default(CancellationToken))
        {
            System.Diagnostics.Debug.WriteLine("sending " + data);
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
            catch (OperationCanceledException)
            {
                // take out the name along with ID out of set
                // removing

                throw;
            }
            

        }
    }
}