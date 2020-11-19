using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TeamXTicTacToe.TicTacToe
{
    public interface IPlayerDAO
    {
        public Task<Player> GetPlayer(string id);
        public Task<bool> CreatePlayer(Player player);
        public Task<bool> UpdatePlayer(Player player);
    }
}
