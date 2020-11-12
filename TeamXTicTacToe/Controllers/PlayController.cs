using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TeamXTicTacToe.TicTacToe;

namespace TeamXTicTacToe.Controllers
{
    [Route("play")]
    [ApiController]
    public class PlayController : Controller
    {
        private readonly IPlayTicTacToe play;

        public PlayController(IPlayTicTacToe playTicTacToe)
        {
            this.play = playTicTacToe;
        }

        public IActionResult Index()
        {
            return View();
        }

        //GET play/Bob
        [HttpGet("{name}")]
        public PlayerStats Get(string name)
        {
            return play.GetPlayer(name);
        }
    }
}
