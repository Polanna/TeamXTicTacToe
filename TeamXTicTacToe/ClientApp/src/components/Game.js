import React, { Component } from 'react';

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
            piece = this.props.value === "X" ? <img className="player1" src={pieceX} alt="pieceX" /> : <img className="player2" src={pieceO} alt="pieceO" />
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

export class Game extends React.Component {
    constructor(props) {
        super(props);

        this.LobbyContainer = [];

        this.state = {

            showLobby:true,

            Lobby:[],


            socket: new WebSocket(wsUri),
            myName:"unknownUser",
            myID:"",
            friendID: "unknown",
            history: [{
                squares: Array(9).fill(null),
            }],
            stepNumber: 0,
            xIsNext: true,
        };
        this.state.socket.onopen = e => {
            //console.log("socket opened", e);
            this.state.socket.send("Lobby:" + "Add:" + this.state.myID);

        };

        this.state.socket.onclose = ((e) => {
            console.log("socket closed", e);
            this.state.socket.send("Lobby:" + "Remove:" + this.state.myID);
        });

        this.state.socket.onmessage = ((e) => {
            // receive message
            let message = e.data
            let str = message.split(":")
            console.log(str)
            if (str[0] === "yourID" && str[1].length == 36) { this.setState({ myID: str[1] }) }
            if (str[0] === "playGame" && str.length == 2) {
                var move = str[1].split("/");
                var opponentChoose = parseInt(move[0]);
                this.handleClick(opponentChoose);
            }
            if (str[0] === "Lobby") {
                 
                if (str[1] === "Remove") {
                    this.setState({ Lobby: this.state.Lobby.filter((val) => { val != str[2] }) })
                    //var filtered = this.state.Lobby.filter(function (value, index, arr) {
                    //    return value != str[2];
                    //});
                    //this.setState({ Lobby: filtered });
                }
                if (str[1] === "Add") {
                    this.setState({ Lobby: this.state.Lobby.concat([str[2]])})
                }
            }
            //$('#msgs').append(e.data + '<br />');
        });

        this.state.socket.onerror = ((e) => {
            console.error(e.data);
        });
        //this.state.socket.onDisconnected = ((e) => {
        //    console.log("bye");
        //})
        this.handleKeyDown = this.handleKeyDown.bind(this)
        this.buildLobby = this.buildLobby.bind(this);
        //this.handleWindowClose = this.handleWindowClose.bind(this);
    }

    componentWillUnMount() {
        window.addEventListener("beforeunload", (ev) => {
            ev.preventDefault();
            this.state.socket.send("Lobby:Remove:"+this.state.myID);
            //return ev.returnValue = 'Are you sure you want to close?';
        });

    }
    
    handleClick(i) { // THIS IS THE ONE FOR PRIVATE MESSAGING 
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

        this.state.socket.send("playGame"+":" + this.state.myID + ":" + this.state.friendID + ":" + i + "/" + squares[i]);

        this.setState({
            history: history.concat([
                {
                    squares: squares
                }
            ]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext
        });
        
        // Demo code showing AI functionality and how to call the minimax function
        //var AIPlayer = squares[i] === "O" ? "X" : "O";
        //var AIMove = minimax(squares.slice(), AIPlayer, AIPlayer).index;
        //if (AIMove != undefined) {
        //    alert(AIMove);
        //}
    }
  
    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }

    buildLobby() {
        this.LobbyContainer = []
        this.state.Lobby.forEach((val) => {
            if (val != this.state.myID) {
                this.LobbyContainer.push(<div>{val}</div>);
            }
        })
    }

    handleKeyDown(e) {
        if (e.key === 'Enter') { this.setState({ friendID: e.target.value }) }
    }
    render() {

        if (this.state.showLobby) { this.buildLobby() }
        console.log(this.state.Lobby)
        //console.log("this.state.showLobby is "+this.state.showLobby)

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
                    />
                </div>
                <div>
                    <p>Your ID: {this.state.myID}</p>
                </div>
                {this.state.friendID === "unknown" ?
                    (<input placeholder="type Friend ID here and then Enter"
                        name="FriendID"
                        onKeyDown={this.handleKeyDown} />)
                    : (<p>Friend ID: {this.state.friendID}</p>)
                    }
                <div>
                    {
                        this.state.showLobby ?
                            <button onClick={() => {
                                this.setState({ showLobby: false })
                            }}>
                    Hide Lobby
                    </button>
                        : (<button onClick= {() => {this.setState({ showLobby: true })}}>Show Lobby</button>)
                    }
                </div>
                <div>
                    {this.state.showLobby?this.LobbyContainer:null}
                </div>
                <div className="game-info">
                    <div className = "status">{status}</div>
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