import React from 'react';
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
            suggestion: -1
        };

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

    // Clear the and restart the board
    clearBoard() {
        if (this.state.stepNumber === 0) {
            return;
        }
        this.setState({
            history: [{
                squares: Array(9).fill(null),
            }],
            stepNumber: 0,
            xIsNext: true,
            winner: null,
            winningLine: null,
            suggestion: -1
        });
        this.props.gameLogic.initialize(this.props, this.state, this.updateStateCallback);
    }

    // Implementation of undo button
    goBack() {
        if (this.state.stepNumber === 0) {
            return;
        }
        { this.jumpTo(this.state.stepNumber - 1) }
    }

    toggleLobby = () => {
        this.setState({ showLobby: !this.state.showLobby })
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];

        let status;
        if (this.state.winner) {
            if (this.state.winner === "D") {
                status = 'Draw';
            }
            else {
                status = 'Winner: ' + this.state.winner;
            }
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'Player 1' : 'Player 2');
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
                        onClick={(i) => this.props.gameLogic.handleClick(i, this.state, this.updateStateCallback, this.props.updatePlayers)}
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
                {undoDiv}
                {this.state.winner!== null ?
                    <div className="col-md-12 text-center mt-4">
                        <button className="btn btn-lrg btn-primary active shadow-large rounded-pill w-25 h-50" onClick={() => this.clearBoard()}>Restart</button>
                    </div> : null}
            </div>

        );
    }
}