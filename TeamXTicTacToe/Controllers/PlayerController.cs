using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TeamXTicTacToe.TicTacToe;


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

        [HttpGet("{id}")]
        public Player GetPlayer(string id)
        {
            Player result = playerDAO.GetPlayer(id);
            return result;
        }
        
        [HttpPost()]
        public IActionResult CreatePlayer([FromBody] string id)
        {
            Player player = new Player();
            player.Id = id;
            if (playerDAO.CreatePlayer(player)) // Player successfully created
            {
                return Ok(player);
            }
            else // Failed to create player
            {
                return BadRequest();
            }
        }

        [HttpPut("{id}")]
        public IActionResult UpdatePlayer(string id, [FromBody] Player player)
        {
            if (id != player.Id) return BadRequest(); //ID from URI and payload don't match

            if (playerDAO.UpdatePlayer(player)) // Player successfully updated
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
            players.Add(new Player() { Id = "Bob", WinCount = 5, LoseCount = 3, DrawCount = 0 });
            players.Add(new Player() { Id = "Jill", WinCount = 5, LoseCount = 3, DrawCount = 0 });
            players.Add(new Player() { Id = "Jack", WinCount = 3, LoseCount = 1, DrawCount = 0 });
            players.Add(new Player() { Id = "Jane", WinCount = 4, LoseCount = 3, DrawCount = 0 });
            players.Add(new Player() { Id = "Phil", WinCount = 1, LoseCount = 3, DrawCount = 0 });
            players.Add(new Player() { Id = "Anna", WinCount = 3, LoseCount = 3, DrawCount = 1 });
            players.Add(new Player() { Id = "Joe", WinCount = 4, LoseCount = 3, DrawCount = 0 });
            players.Add(new Player() { Id = "Tim", WinCount = 2, LoseCount = 3, DrawCount = 0 });
            players.Add(new Player() { Id = "Lucy", WinCount = 2, LoseCount = 3, DrawCount = 1 });
            players.Add(new Player() { Id = "Sam", WinCount = 1, LoseCount = 3, DrawCount = 0 });
            players.Add(new Player() { Id = "Linda", WinCount = 2, LoseCount = 3, DrawCount = 1 });

            return players.OrderByDescending(x => x.WinCount ).ThenBy(x => x.LoseCount).ThenBy(x => x.DrawCount).Take(10);
        }
    }
}
