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
        public IEnumerable<PlayerStat> Get(int count)
        {
            //TODO: connect to storage here
            return new List<PlayerStat>
            {
                new PlayerStat{Name = "Jack", Wins = 5},
                new PlayerStat{Name = "Jane", Wins = 4},
                new PlayerStat{Name = "Peter", Wins = 3},
                new PlayerStat{Name = "Nancy", Wins = 2},
                new PlayerStat{Name = "Julia", Wins = 1}
            };
        }
    }
}
