using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TeamXTicTacToe.TicTacToe
{
    public class Player
    {
        private String id;
        private String name;
        private int winCount;
        private int loseCount;
        private int drawCount;

        public Player() { }
        public Player(string Id, int WinCount, int LoseCount, int DrawCount)
        {
            id = Id;
            winCount = WinCount;
            loseCount = LoseCount;
            drawCount = DrawCount;
        }

        public string Name { get => name; set => name = value; }
        public string Id { get => id; set => id = value; }
        public int WinCount { get => winCount; set => winCount = value; }
        public int LoseCount { get => loseCount; set => loseCount = value; }
        public int DrawCount { get => drawCount; set => drawCount = value; }
    }
}
