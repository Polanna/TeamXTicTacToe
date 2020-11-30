import React from 'react';
import { Link } from 'react-router-dom';
import { Board } from './Board';

import './Game.css';

export class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            stepNumber: 0,
            xIsNext: true,
            winner: null,
            winningLine: null,
            suggestion: -1,
            p1Score: [0, 0, 0],
            p2Score: [0, 0, 0],
        };
        let isWinner = false;
        let isDraw = false;
        let p1Win = false;
        let p2Win = false;
        let draw = false;

        console.log(this.props.gameLogic.describe());
    }

    componentDidMount() {
        this.props.gameLogic.initialize(this.props, this.state, this.updateStateCallback);
    }

    updateStateCallback = (state) => {
        this.setState(state);
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
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
        this.setState({ 
            winner: null,
            winningLine: null
        })
        this.p1Win = false;
        this.p2Win = false;
        this.draw = false;

        this.jumpTo(0);
    }

    toggleLobby = () => {
        this.setState({ showLobby: !this.state.showLobby })
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

    updateScoreP1 = () => {
        this.props.parentCallbackP1(this.state.p1Score);
        //event.preventDefault();
    }

    updateScoreP2 = () => {
        this.props.parentCallbackP2(this.state.p2Score);
        //event.preventDefault();
    }

    playerAction(i) {
        this.props.gameLogic.handleClick(i, this.state, this.updateStateCallback, this.props.updatePlayers);
        this.updateScoreP1();
        this.updateScoreP2();
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];

        let status;
        if (this.state.winner) {
            this.isWinner = true;
            if (this.state.winner === "D" && !this.draw) {
                this.draw = true;
                this.calculateScore();
                status = 'Draw';
            }
            else if (this.state.winner === "X" && !this.p1Win) {
                this.p1win = true;
                this.calculateScore();
                status = 'Winner: ' + this.state.winner;
            }
            else if (this.state.winner === "O" && !this.p2Win) {
                this.p2Win = true;
                this.calculateScore();
            }
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'Player 1' : 'Player 2');
            this.isWinner = false;
        }

        let undoDiv = this.props.supportUndo ?
            <div class="row align-items-center h-50 ">
                <div class="col-md-12 text-center mt-4">
                    <button className="btn btn-lrg btn-primary active shadow-large rounded-pill w-25 h-50" onClick={() => this.goBack()} disabled={this.state.winner !== null}>Undo</button>
                </div>
            </div> : null;

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        //passing down the winning line info for highlighting winningLine
                        winningLine={this.state.winningLine}
                        onClick={(i) => this.playerAction(i)}
                        tokenX={this.props.tokenX}
                        tokenO={this.props.tokenO}
                        suggestion={this.state.suggestion}
                        //pass down indicator for different theme
                        boardTheme={this.props.boardTheme}
                    />
                </div>
                <div className="game-info">
                    <div className="status">{status}</div>
                </div>
                {this.isWinner ?
                    <div className="col-md-12 text-center mt-4">
                        <button className="btn btn-lrg btn-primary active shadow-large rounded-pill w-25 h-50" onClick={() => this.clearBoard()}>Restart</button>
                        <Link to='/'>
                            <button type="button" class="btn btn-lrg btn-primary active  shadow-large  rounded-pill w-25 h-50">Concede</button>
                        </Link>
                    </div> : null}
                {undoDiv}
            </div>

        );
    }
}