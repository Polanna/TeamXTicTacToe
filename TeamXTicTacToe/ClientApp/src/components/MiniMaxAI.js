/** @function minimax
 * @brief AI function that finds the best move according to the MiniMax algorithm.
 * @param {string[]} reboard - The current TicTacToe board (this array is modified in the function).
 * @param {string} player - The player whose turn it currently is (should be "X" or "O").
 * @param {string} winningPlayer - The player that the algorithm is trying to make win.
 * @returns {score | move} - If reboard is in a terminal state (win/lose/draw) when passed in,
 *      returns an object with a property "score" that represents the MiniMax score. If reboard
 *      has available spaces for moves, a move object representing the best move will be returned.
 *      This object has two properties:
 *          index - The index of the move
 *          score - The associated MiniMax score
 */
function minimax(reboard, player, winningPlayer) {
    // Get a list of the available moves
    let availableMoves = avail(reboard);

    // Check for win/lose/draw
    var losingPlayer = winningPlayer === "X" ? "O" : "X";
    if (winning(reboard, losingPlayer)) {
        return {
            score: -10
        };
    } else if (winning(reboard, winningPlayer)) {
        return {
            score: 10
        };
    } else if (availableMoves.length === 0) {
        return {
            score: 0
        };
    }

    // Calculate minimax scores for every available move
    var moves = [];
    for (var i = 0; i < availableMoves.length; i++) {
        var move = {};
        move.index = availableMoves[i];
        reboard[availableMoves[i]] = player;

        if (player == winningPlayer) {
            var g = minimax(reboard, losingPlayer, winningPlayer);
            move.score = g.score;
        } else {
            var g = minimax(reboard, winningPlayer, winningPlayer);
            move.score = g.score;
        }
        reboard[availableMoves[i]] = null;
        moves.push(move);
    }

    // Find the move with the best score from the list of moves
    var bestMove;
    if (player === winningPlayer) {
        var bestScore = -10000;
        for (var i = 0; i < moves.length; i++) {
            if (moves[i].score > bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    } else {
        var bestScore = 10000;
        for (var i = 0; i < moves.length; i++) {
            if (moves[i].score < bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    }
    return moves[bestMove];
}

//available spots
function avail(reboard) {
    var indicesAvailable = [];
    for (let i = 0; i < reboard.length; i++) {
        if (reboard[i] == null) {
            indicesAvailable.push(i);
        }
    }
    return indicesAvailable;
}

// winning combinations
function winning(board, player) {
    if (
        (board[0] == player && board[1] == player && board[2] == player) ||
        (board[3] == player && board[4] == player && board[5] == player) ||
        (board[6] == player && board[7] == player && board[8] == player) ||
        (board[0] == player && board[3] == player && board[6] == player) ||
        (board[1] == player && board[4] == player && board[7] == player) ||
        (board[2] == player && board[5] == player && board[8] == player) ||
        (board[0] == player && board[4] == player && board[8] == player) ||
        (board[2] == player && board[4] == player && board[6] == player)
    ) {
        return true;
    } else {
        return false;
    }
}
const MiniMaxAI = { minimax };
export default MiniMaxAI;