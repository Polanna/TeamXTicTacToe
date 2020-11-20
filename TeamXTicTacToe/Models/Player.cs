using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TeamXTicTacToe.Models
{
    public class Player
    {
        public string Name { get; set; }
        public int WinCount { get; set; }
        public int LoseCount { get; set; }
        public int DrawCount { get; set; }
    }
}
