import React from 'react';

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
        if (this.props.value) {
            piece = this.props.value === "X" ? <img className="player1" src={require('../img/' + this.props.tokenX + '.png')} alt="X" />
                : <img className="player2" src={require('../img/' + this.props.tokenO + '.png')} alt="O" />
        }

        return (
            <button className="squareInGame" data-pro={this.props.value} data-win={this.props.win} onClick={this.props.onClick}>
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
                tokenX={this.props.tokenX}
                tokenO={this.props.tokenO}
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

// 1. create a socket and successfully connect to the server: DONE

const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
const wsUri = protocol + "//" + window.location.host;

export class OnlineGame extends React.Component {
    constructor(props) {
        super(props);



        this.state = {

            socket: new WebSocket(wsUri),
            myName: "unknownUser",
            myID: "",
            friendID: "unknown",
            history: [{
                squares: Array(9).fill(null),
            }],
            stepNumber: 0,
            xIsNext: true,
            winner: null,
            winningLine: null
        };

        this.state.socket.onclose = ((e) => {
            console.log("socket closed", e);
        });

        this.state.socket.onmessage = ((e) => {
            // receive message
            let message = e.data
            let str = message.split(":")
            if (str[0] === "yourID" && str[1].length == 36) { this.setState({ myID: str[1] }) }
            if (str[0] === "playGame" && str.length == 2) {
                var move = str[1].split("/")
                var opponentChoose = parseInt(move[0])
                this.handleClick(opponentChoose)
            }
            //$('#msgs').append(e.data + '<br />');
        });

        this.state.socket.onerror = ((e) => {
            console.error(e.data);
        });
        this.handleKeyDown = this.handleKeyDown.bind(this)
    }

    componentDidMount() {
        this.state.socket.onopen = e => {
            console.log("socket opened", e);
        };


    }

    handleClick(i) { // THIS IS THE ONE FOR PRIVATE MESSAGING 
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        if (this.state.winner || squares[i]) {
            return;
        }

        squares[i] = this.state.xIsNext ? "X" : "O"
        const result = calculateWinner(squares);
        let winner = null;
        let winningLine = null;
        if (result) {
            console.log("Winner is " + result.winner);
            winner = result.winner;
            winningLine = result.match;
            this.props.updatePlayers(winner);
        }

        if (winner || squares[i]) {
            return;
        }

        squares[i] = this.state.xIsNext ? "X" : "O"

        this.state.socket.send("playGame" + ":" + this.state.myID + ":" + this.state.friendID + ":" + i + "/" + squares[i]);

        this.setState({
            history: history.concat([
                {
                    squares: squares
                }
            ]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
            winner: winner,
            winningLine: winningLine
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }

    handleKeyDown(e) {
        if (e.key === 'Enter') { this.setState({ friendID: e.target.value }) }
    }
    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];

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

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        //passing down the winning line info for highlighting winningLine
                        winningLine={this.state.winningLine}
                        onClick={(i) => this.handleClick(i)}
                        tokenX={this.props.tokenX}
                        tokenO={this.props.tokenO}
                    />
                </div>
                <div>
                    <p>Your ID: {this.state.myID}</p>
                </div>
                {this.state.friendID === "unknown" ?
                    (<input placeholder="type Friend ID"
                        name="FriendID"
                        onKeyDown={this.handleKeyDown} />)
                    : (<p>Friend ID: {this.state.friendID}</p>)
                }

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

