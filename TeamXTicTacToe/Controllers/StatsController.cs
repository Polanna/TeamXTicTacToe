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
                new Player{Name = "Jack", WinCount = 5},
                new Player{Name = "Jane", WinCount = 4},
                new Player{Name = "Peter", WinCount = 3},
                new Player{Name = "Nancy", WinCount = 2},
                new Player{Name = "Julia", WinCount = 1}
            };
        }
    }
}
