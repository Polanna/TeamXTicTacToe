using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TeamXTicTacToe.Models;
using TeamXTicTacToe.DAO;


// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TeamXTicTacToe.Controllers
{
    [Route("players")]
    [ApiController]
    public class PlayerController : ControllerBase
    {
        private IPlayerDAO playerDAO;

        public PlayerController(IPlayerDAO playerDAO)
        {
            this.playerDAO = playerDAO;
        }

        //GET players/
        [HttpGet()]
        public Task<IEnumerable<Player>> GetPlayers()
        {
            return playerDAO.GetPlayers();
        }

        //GET players/Bob
        [HttpGet("{id}")]
        public Task<Player> GetPlayer(string id)
        {
            return playerDAO.GetPlayer(id);
        }
        
        [HttpPost()]
        public async Task<IActionResult> CreatePlayer([FromBody] Player player)
        {
            if (await playerDAO.CreatePlayer(player)) // Player successfully created
            {
                return Ok(player);
            }
            else // Failed to create player
            {
                return BadRequest();
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePlayer(string id, [FromBody] Player player)
        {
            if (id != player.Name) return BadRequest(); //ID from URI and payload don't match

            if (await playerDAO.UpdatePlayer(player)) // Player successfully updated
            {
                return Ok(player);
            }
            else // Failed to update player
            {
                return BadRequest();
            }
        }

        [HttpGet]
        [Route("getTopScores")]
        public IEnumerable<Player> GetTopScores()
        {
            //TODO: connect to storage here
            List<Player> players = new List<Player>();
            players.Add(new Player() { Name = "Bob", WinCount = 5, LoseCount = 3, DrawCount = 0 });
            players.Add(new Player() { Name = "Jill", WinCount = 5, LoseCount = 3, DrawCount = 0 });
            players.Add(new Player() { Name = "Jack", WinCount = 3, LoseCount = 1, DrawCount = 0 });
            players.Add(new Player() { Name = "Jane", WinCount = 4, LoseCount = 3, DrawCount = 0 });
            players.Add(new Player() { Name = "Phil", WinCount = 1, LoseCount = 3, DrawCount = 0 });
            players.Add(new Player() { Name = "Anna", WinCount = 3, LoseCount = 3, DrawCount = 1 });
            players.Add(new Player() { Name = "Joe", WinCount = 4, LoseCount = 3, DrawCount = 0 });
            players.Add(new Player() { Name = "Tim", WinCount = 2, LoseCount = 3, DrawCount = 0 });
            players.Add(new Player() { Name = "Lucy", WinCount = 2, LoseCount = 3, DrawCount = 1 });
            players.Add(new Player() { Name = "Sam", WinCount = 1, LoseCount = 3, DrawCount = 0 });
            players.Add(new Player() { Name = "Linda", WinCount = 2, LoseCount = 3, DrawCount = 1 });

            return players.OrderByDescending(x => x.WinCount ).ThenBy(x => x.LoseCount).ThenBy(x => x.DrawCount).Take(10);
        }
    }
}
