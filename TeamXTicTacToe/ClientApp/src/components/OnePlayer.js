import React from 'react';
import MiniMaxAI from './MiniMaxAI';
// import the pictures used as pieces on board
import pieceX from '../img/pig.png';
import pieceO from '../img/chick.png';
import blank from '../img/blank.png';
import './Game.css';


class Square extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let piece = <img className="blankPiece" src={blank} alt="empty" />

        /*
        // if we have suggestion, render it on board
        if (this.props.isSuggestion) {
            piece = <img className="suggestionPiece" src={suggest} alt="suggestion" />
        }
        */

        if (this.props.value) {
            piece = this.props.value === "X" ?
                <img className="player1" src={require('../img/' + this.props.tokenX + '.png')} alt="pieceX" />
                : <img className="player2" src={require('../img/' + this.props.tokenO + '.png')} alt="pieceO" />
        }

        return (
            <button className="squareInGame" data-pro={this.props.value} data-win={this.props.win} data-boardtheme={this.props.boardTheme} onClick={this.props.onClick}>
                {piece}
            </button>
        );
    }
}

class Board extends React.Component {

    renderSquare(i) {
        let win = false;

        if (this.props.winningLine && this.props.winningLine.includes(i)) {
            win = true;
        }

        return (
            <Square
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
                win={win}
                //isSuggestion={i === this.props.suggestion}
                tokenX={this.props.tokenX}
                tokenO={this.props.tokenO}
                boardTheme={this.props.boardTheme}
            />
        );
    }


    render() {
        return (
            <div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

export class OnePlayer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            stepNumber: 0,
            xIsNext: true,
            suggestion: 0
        };
    }

    /*
    componentDidMount() {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        var AIPlayer = this.state.xIsNext ? "X" : "O"

        var suggestion;
        var AIMove = MiniMaxAI.minimax(squares.slice(), AIPlayer, AIPlayer).index;
        if (AIMove != undefined) {
            suggestion = AIMove;
        }

        // not only change suggestion, also change history to actually put the AI piece and acutally update current state
        squares[suggestion] = this.state.xIsNext ? "X" : "O"
        this.setState({
            history: history.concat([
                {
                    squares: squares
                }
            ]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
            suggestion: suggestion
        });

    }
    */

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        const result = calculateWinner(squares);
        let winner = null;
        if (result) {
            winner = result.winner;
        }

        if (winner || squares[i]) {
            return;
        }

        squares[i] = this.state.xIsNext ? "X" : "O"
        // Demo code showing AI functionality and how to call the minimax function
        var AIPlayer = squares[i] === "O" ? "X" : "O";
        var suggestion;
        var AIMove = MiniMaxAI.minimax(squares.slice(), AIPlayer, AIPlayer).index;
        if (AIMove != undefined) {
            suggestion = AIMove;
        } 

        // not only change suggestion, also change history to actually put the AI piece and acutally update current state
        squares[suggestion] = !this.state.xIsNext ? "X" : "O"
        this.setState({
            history: history.concat([
                {
                    squares: squares
                }
            ]),
            stepNumber: history.length,
            //player moved and then AI moved, therefore now it's player's turn again, no need to flip xIsNext
            //xIsNext: !this.state.xIsNext,
            suggestion: suggestion
        });

    }

    jumpTo(step) {
        this.setState({
            stepNumber: step
            // do not change xIsNext since it's always player1's turn
            // xIsNext: (step % 2) === 0,
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const result = calculateWinner(current.squares);
        let winner = null;
        let winningLine = null;
        if (result) {
            winner = result.winner;
            winningLine = result.match;
        }

        const moves = history.map((step, move) => {
            const desc = move ?
                'Go to move #' + move :
                'Go to game start';
            return (
                <li key={move}>
                    <button className="move" onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            );
        });

        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'Player 1' : 'Player 2');
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        //passing down the winning line info for highlighting winningLine
                        winningLine={winningLine}
                        onClick={(i) => this.handleClick(i)}
                        //no need to pass suggestion since we already updated the current state of the board
                        //suggestion={this.state.suggestion}
                        tokenX={this.props.tokenX}
                        tokenO={this.props.tokenO}
                        //pass down indicator for different theme
                        boardTheme={this.props.boardTheme}
                    />
                </div>
                <div className="game-info">
                    <div className="status">{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
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
            return { winner: squares[a], match: lines[i] };
        }
    }
    return null;
}

