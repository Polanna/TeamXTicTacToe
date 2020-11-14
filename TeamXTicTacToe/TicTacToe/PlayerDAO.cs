using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TeamXTicTacToe.TicTacToe
{
    public class PlayerDAO : IPlayerDAO
    {
        private List<Player> players = new List<Player>
        {
            new Player("Bob", 1, 2, 3),
            new Player("Linda", 3, 2, 1)
        };

        Player IPlayerDAO.GetPlayer(string id)
        {
            var record = players.Find(x => x.Id == id);
            return record;
        }

        bool IPlayerDAO.CreatePlayer(Player player)
        {
            var existing = players.Find(x => x.Id == player.Id);
            if (existing == null) // No player with that name exists yet
            {
                players.Add(player);
                return true;
            }
            else // Player with that name already exists
            {
                return false;
            }
        }

        bool IPlayerDAO.UpdatePlayer(Player player)
        {
            var existing = players.Find(x => x.Id == player.Id);
            if (existing == null)
            {
                // No player with that name exists - indicated failure
                return false;
            }
            else
            {
                // Update the player and indicate successs
                existing.WinCount = player.WinCount;
                existing.LoseCount = player.LoseCount;
                existing.DrawCount = player.DrawCount;
                return true;
            }
        }

    }
}
