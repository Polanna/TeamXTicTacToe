using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TeamXTicTacToe.TicTacToe
{
    public interface IPlayerDAO
    {
        public Player GetPlayer(string id);
        public bool CreatePlayer(Player player);
    }
}
