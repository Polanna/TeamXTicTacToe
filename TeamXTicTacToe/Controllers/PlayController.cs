using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TeamXTicTacToe.DAO;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TeamXTicTacToe.Controllers
{
    [Route("play")]
    [ApiController]
    public class PlayController : ControllerBase
    {
        private readonly IPlayDao dao;

        public PlayController(IPlayDao dao)
        {
            this.dao = dao;
        }

        // GET: api/<PlayController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return dao.GetGames();
        }

        // GET api/<PlayController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return dao.GetGame(id);
        }

        // POST api/<PlayController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
            dao.AddGame(value);
        }

        // PUT api/<PlayController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<PlayController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
