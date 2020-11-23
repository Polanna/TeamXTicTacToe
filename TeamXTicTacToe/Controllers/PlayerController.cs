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
            else //player exists so get player
            {
                return Ok(await playerDAO.GetPlayer(player.Name));
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
        public async Task<IEnumerable<Player>> GetTopScores(int count)
        {
            return await playerDAO.GetTopPlayers(count);
        }
    }
}
