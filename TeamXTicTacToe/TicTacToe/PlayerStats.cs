using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TeamXTicTacToe
{
    public class PlayerStats
    {
        private int winCount;
        private int loseCount;
        private int drawCount;
        private string player2;
        private string player1;
        private string timeStamp;
        private int gameId;

        public int GameId { get => gameId; set => gameId = value; }
        public string TimeStamp { get => timeStamp; set => timeStamp = value; }
        public string Player1 { get => player1; set => player1 = value; }
        public string Player2 { get => player2; set => player2 = value; }
        public int WinCount { get => winCount; set => winCount = value; }
        public int LoseCount { get => loseCount; set => loseCount = value; }
        public int DrawCount { get => drawCount; set => drawCount = value; }
    }
}
