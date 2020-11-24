using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TeamXTicTacToe.Models;

namespace TeamXTicTacToe.DAO
{
    public interface IPlayerDAO
    {
        public Task<Player> GetPlayer(string id);
        public Task<IEnumerable<Player>> GetPlayers();
        public Task<bool> CreatePlayer(Player player);
        public Task<bool> UpdatePlayer(Player player);
        public Task<IEnumerable<Player>> GetTopPlayers(int count);
    }
}
