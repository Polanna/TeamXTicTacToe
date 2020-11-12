using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TeamXTicTacToe.TicTacToe
{
    public interface IPlayTicTacToe
    {
        PlayerStats GetPlayer(string name);
    }
}
