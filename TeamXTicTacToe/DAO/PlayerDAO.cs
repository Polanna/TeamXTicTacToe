using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TeamXTicTacToe.Models;

namespace TeamXTicTacToe.DAO
{
    public class PlayerDAO : IPlayerDAO
    {
        private TicTacBlobClient<Player> blobClient;

        public PlayerDAO(TicTacBlobClient<Player> blobClient)
        {
            this.blobClient = blobClient;
        }

        public Task<Player> GetPlayer(string id)
        {
            return blobClient.GetAsync(id);

        }
        public async Task<IEnumerable<Player>> GetPlayers()
        {
            return await blobClient.GetAllAsync();
        }


        public async Task<bool> CreatePlayer(Player player)
        {

            var existing = blobClient.GetIds().FirstOrDefault(id => player.Name == id);
            if (existing == null) // No player with that name exists yet
            {
                await blobClient.SaveAsync(player, player.Name);
                return true;
            }
            else // Player with that name already exists
            {
                return false;
            }
        }

        public async Task<bool> UpdatePlayer(Player player)
        {
            var existing = blobClient.GetIds().FirstOrDefault(id => player.Name == id);
            if (existing == null)
            {
                // No player with that name exists - indicated failure
                return false;
            }
            else
            {
                // Update the player and indicate successs
                await blobClient.SaveAsync(player, player.Name);
                return true;
            }
        }

    }
}
