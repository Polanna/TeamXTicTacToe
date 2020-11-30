﻿import MiniMaxAI from './MiniMaxAI';

export class OnePlayer {
    describe() {
        return "One Player Game Logic";
    }

    initialize = (props, state, updateStateCallback) => {
        // nothing to do
    }

    handleClick = (i, state, updateStateCallback, updatePlayersCallback) => {
        const history = state.history.slice(0, state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        if (state.winner || squares[i]) {
            return;
        }

        squares[i] = state.xIsNext ? "X" : "O"

        // Did the player win?
        const result = calculateWinner(squares);
        let winner = null;
        let winningLine = null;
        if (result) {
            console.log("Winner is " + result.winner);
            winner = result.winner;
            winningLine = result.match;
            updatePlayersCallback(winner);
        } else {
            var AIPlayer = squares[i] === "O" ? "X" : "O";
            var AIMove = MiniMaxAI.minimax(squares.slice(), AIPlayer, AIPlayer).index;
            if (AIMove != undefined) {
                squares[AIMove] = !state.xIsNext ? "X" : "O"
            }

            // Did the AI win?
            const result = calculateWinner(squares);
            if (result) {
                console.log("Winner is " + result.winner);
                winner = result.winner;
                winningLine = result.match;
                updatePlayersCallback(winner);
            }
        }

        updateStateCallback({
            history: history.concat([
                {
                    squares: squares
                }
            ]),
            stepNumber: history.length,
            winner: winner,
            winningLine: winningLine,
        });
    }
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            console.log("WIN")
            return { winner: squares[a], match: lines[i] };
        }
    }
    //check for draw
    for (let i = 0; i < squares.length; i++) {
        if (squares[i] !== "X" && squares[i] !== "O")
            return null;
    }
    console.log("DRAW")
    return { winner: "D", match: null };
}