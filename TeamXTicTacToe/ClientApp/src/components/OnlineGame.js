import React from 'react';

import { OnlineGameDetails } from './game/OnlineGameDetails';
import { Board } from './game/Board';
import './Game.css';

// 1. create a socket and successfully connect to the server: DONE

const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
const wsUri = protocol + "//" + window.location.host;

export class OnlineGame extends React.Component {
    constructor(props) {
        super(props);

        console.log(this.props.player1)
        this.LobbyContainer = [];
        this.state = {
            
            showLobby: true,
            LobbyIDs: [],
            LobbyNames: [],
            LobbyStatuses: [],
            myTurn: false,

            socket: new WebSocket(wsUri),
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
            console.log(str)
            if (str[0] === "yourID" && str[1].length == 36) {
                this.state.socket.send("Lobby:" + "Add:" + this.props.player1 + ":" + str[1]);
                this.setState({ myID: str[1] })
            }
            if (str[0] === "playGame" && str.length == 2) {
                var move = str[1].split("/")
                var opponentChoose = parseInt(move[0])
                this.handleClick(opponentChoose)
            }
            if (str[0] === "Lobby") {
                if (str[1] === "Add") {
                    this.setState({
                        LobbyIDs: this.state.LobbyIDs.concat([str[3]]),
                        LobbyStatuses: this.state.LobbyStatuses.concat(str[4]),
                        LobbyNames: this.state.LobbyNames.concat([str[2]])
                    })
                }
                if (str[1] === "Update" && str.length == 6) {
                    let inviter = str[2]
                    let inviterStatus = str[3]
                    let invitee = str[4]
                    let inviteeStatus = str[5]

                    let name1 = this.state.LobbyNames[this.state.LobbyIDs.indexOf(inviter)];
                    let name2 = this.state.LobbyNames[this.state.LobbyIDs.indexOf(invitee)];
                    if (inviteeStatus === "In-Game" && inviterStatus === "In-Game") { this.props.updateName(name1 + "/" + name2); }
                    this.state.LobbyStatuses[this.state.LobbyIDs.indexOf(inviter)] = inviterStatus
                    this.state.LobbyStatuses[this.state.LobbyIDs.indexOf(invitee)] = inviteeStatus
                    let arr = this.state.LobbyStatuses;
                    this.setState({
                        LobbyStatuses: arr
                    })
                }
                
            }
        });

        this.state.socket.onerror = ((e) => {
            console.error(e.data);
        });
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }



    handleClick(i) { // THIS IS THE ONE FOR PRIVATE MESSAGING 
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        if (this.state.friendID === "unknown") {
            return;
        }

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

        this.state.socket.send("playGame" + ":" + this.state.myID + ":" + this.state.friendID + ":" + i + "/" + squares[i]);

        this.setState({
            history: history.concat([
                {
                    squares: squares
                }
            ]),
            myTurn: !this.state.myTurn,
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

    inviteClicked = (idx) => {
        let myTurn = false;
        if (this.state.LobbyStatuses[idx] === "Inviting") {

            // I'm getting the invitation, I go second

            this.state.socket.send("Lobby:In-Game:" + this.state.myID + ":" + this.state.LobbyIDs[idx]);
        } else {
            // set flag go first
            myTurn = true;
            this.state.socket.send("Lobby:Invite:" + this.state.myID + ":" + this.state.LobbyIDs[idx]);
        }

        this.setState({
            friendID: this.state.LobbyIDs[idx],
            myTurn: myTurn
        })
    }

    toggleLobby = () => {
        this.setState({ showLobby: !this.state.showLobby })
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
                        onClick={(i) => { if (this.state.myTurn) { this.handleClick(i) } }}
                        tokenX={this.props.tokenX}
                        tokenO={this.props.tokenO}
                        //pass down indicator for different theme
                        boardTheme={this.props.boardTheme}
                    />
                </div>
                <OnlineGameDetails
                    myID={this.state.myID}
                    friendID={this.state.friendID}
                    handleKeyDown={this.handleKeyDown}
                    toggleLobby={this.toggleLobby}
                    showLobby={this.state.showLobby}
                    LobbyNames={this.state.LobbyNames}
                    LobbyIDs={this.state.LobbyIDs}
                    LobbyStatuses={this.state.LobbyStatuses}
                    inviteClicked={this.inviteClicked} />
                

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

