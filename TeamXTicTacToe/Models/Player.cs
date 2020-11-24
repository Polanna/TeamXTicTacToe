using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TeamXTicTacToe.Models
{
    public class Player : IComparable<Player>
    {
        public string Name { get; set; }
        public int WinCount { get; set; }
        public int LoseCount { get; set; }
        public int DrawCount { get; set; }
        public int CompareTo(Player other)
        {
            if (other == null)
            {
                return 1;
            }
            // Order first by wins
            else if (this.WinCount.CompareTo(other.WinCount) != 0)
            {
                return this.WinCount.CompareTo(other.WinCount);
            }
            // Then by losses
            else if (other.LoseCount.CompareTo(this.LoseCount) != 0)
            {
                return other.LoseCount.CompareTo(this.LoseCount);
            }
            // Then by draws
            else if (other.DrawCount.CompareTo(this.DrawCount) != 0)
            {
                return other.DrawCount.CompareTo(this.DrawCount);
            }
            else
            {
                return 0;
            }
        }
    }
}
