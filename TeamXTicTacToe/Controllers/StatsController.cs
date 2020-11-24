using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TeamXTicTacToe.Models;

namespace TeamXTicTacToe.Controllers
{
    [Route("stats")]
    [ApiController]
    public class StatsController : ControllerBase
    {
        [HttpGet]
        public IEnumerable<Player> Get(int count)
        {
            //TODO: connect to storage here
            return new List<Player>
            {
                new Player{Name = "Jack", WinCount = 5, LoseCount = 0, DrawCount = 0},
                new Player{Name = "Jane", WinCount = 4, LoseCount = 1, DrawCount = 0},
                new Player{Name = "Peter", WinCount = 3, LoseCount = 2, DrawCount = 0},
                new Player{Name = "Nancy", WinCount = 2, LoseCount = 3, DrawCount = 0},
                new Player{Name = "Julia", WinCount = 1, LoseCount = 4, DrawCount = 1}
            };
        }
    }
}
