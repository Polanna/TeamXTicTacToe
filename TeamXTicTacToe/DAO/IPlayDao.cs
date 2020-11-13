using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TeamXTicTacToe.DAO
{
    public interface IPlayDao
    {
        List<string> GetGames();

        void AddGame(string game);

        string GetGame(int index);
    }
}
