using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TeamXTicTacToe.DAO
{
    public class DummyPlayDao : IPlayDao
    {
        private List<string> games = new List<string> { "tictactoe", "chess"};
        void IPlayDao.AddGame(string game)
        {
            throw new NotImplementedException();
        }

        string IPlayDao.GetGame(int index)
        {
            return games[index];
        }

        List<string> IPlayDao.GetGames()
        {
            return games;
        }
    }
}
