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
                new PlayerStat{Name = "Jack", Score = 5},
                new PlayerStat{Name = "Jane", Score = 4},
                new PlayerStat{Name = "Peter", Score = 3},
                new PlayerStat{Name = "Nancy", Score = 2},
                new PlayerStat{Name = "Julia", Score = 1}
            };
        }
    }
}
