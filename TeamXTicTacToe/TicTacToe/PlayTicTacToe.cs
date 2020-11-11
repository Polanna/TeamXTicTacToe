using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TeamXTicTacToe.TicTacToe
{
    public class PlayTicTacToe: IPlayTicTacToe
    {
        private List<string> games = new List<string> { "tictactoe", "chess" };
        private List<PlayerStats> stats = new List<PlayerStats> { };

       
        PlayerStats IPlayTicTacToe.GetPlayer(string name)
        {
            stats.Add(new PlayerStats() { GameId = 10, TimeStamp = "20201109", Player1 = "Bob", Player2 = "Jill", WinCount = 3, LoseCount = 2, DrawCount = 1 });
            var record = stats.Find(x => x.Player1 == name || x.Player2 == name);
            return record;
        }
    }
}

