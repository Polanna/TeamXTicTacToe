import React, { Component } from 'react';
import MiniMaxAI from './MiniMaxAI';
// import the pictures used as pieces on board
import pieceX from '../img/pig.png';
import pieceO from '../img/chick.png';
import blank from '../img/blank.png';
import suggest from '../img/suggestion.png';
import './Game.css';
import { Link } from 'react-router-dom';
import Scoreboard from './Scoreboard';
import './OnePlayer.css';

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
            suggestion: 0,
            p1Score: [0, 0, 0],
            p2Score: [0, 0, 0],
            showRestartBtn: false
        };

        let isWinner = false;
        let isDraw = false;
        let p1Win = false;
        let p2Win = false;
        let draw = false;
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

    // Implementation of undo button
    goBack() {
        if (this.state.stepNumber === 0) {
            return;
        }
        { this.jumpTo(this.state.stepNumber - 1) }
    }

    // Clear the and restart the board
    clearBoard() {
        if (this.state.stepNumber === 0) {
            return;
        }
        this.p1Win = false;
        this.p2Win = false;
        this.draw = false;

        this.jumpTo(0);
    }

    calculateScore() {

        if (this.p2Win) {
            let p1 = this.state.p1Score.slice();
            let p2 = this.state.p2Score.slice();
            p1[1] += 1;
            p2[0] += 1;
            this.setState({
                p1Score: p1,
                p2Score: p2,
            });
        }
        else if (this.p1Win) {
            let p1 = this.state.p1Score.slice();
            let p2 = this.state.p2Score.slice();
            p1[0] += 1;
            p2[1] += 1;
            this.setState({
                p1Score: p1,
                p2Score: p2,
            });
        }
        else if (this.draw) {
            let p1 = this.state.p1Score.slice();
            let p2 = this.state.p2Score.slice();
            p1[2] += 1;
            p2[2] += 1;
            this.setState({
                p1Score: p1,
                p2Score: p2,
            });
        }
    }

    playerAction(i) {
        this.handleClick(i);
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const result = calculateWinner(current.squares);
        const isFilled = areAllBoxesClicked(current.squares);
        let winner = null;
        let winningLine = null;
        if (result) {
            this.isWinner = true;
            winner = result.winner;
            if (winner === "O" && !this.p2Win) {
                this.p2Win = true;
                this.calculateScore();
            }
            else if (winner === "X" && !this.p1Win) {
                this.p1win = true;
                this.calculateScore();
            }
            else if (winner === "Draw" && !this.draw) {
                this.draw = true;
                this.calculateScore();
            }

            if (winner) {
                winningLine = result.match;
            } else if (!winner && isFilled) {
                winner = "Draw";
            }
        }
        else {
            this.isWinner = false;
        }

        /*const moves = history.map((step, move) => {
            const desc = move ?
                'Go to move #' + move :
                'Go to game start';
            return (
                <li key={move}>
                    <button className="move" onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            );
        });*/

        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'Player 1' : 'Player 2');
        }

        return (
            <div className="row">
                <div className="col-md-1">
                    <Scoreboard score={this.state.p1Score} />
                </div>
                <div className="col-md-10 text center">
                    <div className="game-board">
                        <Board
                            squares={current.squares}
                            //passing down the winning line info for highlighting winningLine
                            winningLine={winningLine}
                            onClick={(i) => this.playerAction(i)}
                            //no need to pass suggestion since we already updated the current state of the board
                            //suggestion={this.state.suggestion}
                            tokenX={this.props.tokenX}
                            tokenO={this.props.tokenO}
                            //pass down indicator for different theme
                            boardTheme={this.props.boardTheme}
                        />
                        <div className="game-info">
                            <div className="status">{status}</div>
                        </div>
                        <div class="row align-items-center h-50">
                            {this.isWinner ?
                                <div className="col-md-12 text-center mt-4">
                                    <button className="btn btn-lrg btn-primary active shadow-large rounded-pill w-25 h-50" onClick={() => this.clearBoard()}>Restart</button>
                                    <Link to='/'>
                                        <button type="button" class="btn btn-lrg btn-primary active  shadow-large  rounded-pill w-25 h-50">Quit</button>
                                    </Link>
                                </div> : <div class="col-md-12 text-center mt-4">
                                    <button className="btn btn-lrg btn-primary active shadow-large rounded-pill w-25 h-50" onClick={() => this.goBack()}>Undo</button>
                                </div>}
                        </div>
                    </div>
                </div>
                <div className="col-md-1">
                    <Scoreboard score={this.state.p2Score} />
                </div>
                {this.isWinner ? null :
                    <div class="col-md-12 text-center mt-4">
                        <Link to='/'>
                            <button type="button" class="btn btn-lrg btn-primary active  shadow-large  rounded-pill w-25 h-50">Concede</button>
                        </Link>
                    </div>
                }
            </div >
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
    for (let i = 0; i < squares.length; i++) {
        if (squares[i] !== "X" && squares[i] !== "O")
            return null;
    }
    return { winner: "Draw", match: null };
}

export function areAllBoxesClicked(boxes) {
    // Declare variable to store number of clicked boxes.
    let count = 0

    // Iterate over all boxes
    boxes.forEach(function (item) {
        // Check if box is clicked (not null)
        if (item !== null) {
            // If yes, increase the value of count by 1
            count++
        }
    })

    // Check if all boxes are clicked (filled)
    if (count === 9) {
        return true
    } else {
        return false
    }
}
