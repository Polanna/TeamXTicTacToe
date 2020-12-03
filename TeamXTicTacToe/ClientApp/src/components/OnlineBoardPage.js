import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { OnlineGame } from './OnlineGame';
import Client from './Client';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { OneNamePrompt } from './OneNamePrompt';
import Scoreboard from './Scoreboard';



export class OnlineBoardPage extends Component {
    static displayName = OnlineBoardPage.name;


    constructor(props) {
        super(props);
        this.state = {
            namePromptSeen: true,
            player1: {},
            player2: {},
            boardTheme: '1',

            tokenX: this.props.tokenX,
            tokenO: this.props.tokenO,
            myIcon: "X",
            friendIcon:"O",

            p1Score: [0, 0, 0],
            p2Score: [0, 0, 0],

        }
    }

    //chang the board theme to a user specified one
    setBoardTheme = (a) => {
        this.setState({
            boardTheme: a
        });
    }




    updatePlayers = (result) => {
        console.log("updatePlayers:" + result);
        console.log(this.state.player1.token);
        //make copy of state.player1
        let player1 = Object.assign({}, this.state.player1);
        let player2 = Object.assign({}, this.state.player2);

        let p1Score = this.state.p1Score.slice();
        let p2Score = this.state.p2Score.slice();

        if (result === this.state.myIcon) {
            //increase player 1 wins, inc player 2 losses
            player1.winCount++;
            p1Score[0]++;
            player2.loseCount++;
            p2Score[1]++;
        }
        else if (result === this.state.friendIcon) {
            //increase player 2 wins, inc player 1 losses
            player2.winCount++;
            p2Score[0]++;
            player1.loseCount++;
            p1Score[1]++;
        }
        else {
            //increase both draws
            player1.drawCount++;
            player2.drawCount++;
            p1Score[2]++;
            p2Score[2]++;
        }
        console.log("player1: ")
        console.log(player1)
        console.log("player2: ")
        console.log(player2)

        

        //save new data
        Client.updatePlayer(player1);
        Client.updatePlayer(player2);
        //update player1 and player2 state (left is label, right is object)
        this.setState({
            player1: player1,
            player2: player2,
            p1Score: p1Score,
            p2Score: p2Score,
        });
    };
    setOnePlayer = (nick1) => {
        let player1 = {
            name: nick1,
            token: "X"
        }

        let player2 = {
            name: 'Not Yet determined',
            token: "O"
        }

        this.setState({
            player1: player1,
            player2: player2
        });
    }
    toggleNamePrompt = () => {
        this.setState({
            namePromptSeen: !this.state.namePromptSeen
        });

    }
    setTwoPlayers = (nick1, nick2) => {
        Client.getPlayer(nick1, (player) => { this.setState({ player1: player }) });
        Client.getPlayer(nick2, (player) => { this.setState({ player2: player }) });
    }
    updateNames = (e) => {
        let arr = e.split('/')
        let n1 = {
            name: '',
            token: ''
        }
        let n2 = {
            name: '',
            token: ''
        }
        
        //console.log(this.state.player1.name)
        //console.log(this.state.player1.name === arr[0])
        //if (this.state.player1.name === arr[0]) { n2.name = arr[1] }
        //else { n2.name = arr[0] }

        let swap = false;
        if (this.state.player1.name === arr[1]) {
            swap = true
            n1.name = arr[1];
            n1.token = "O";
            n2.name = arr[0];
            n2.token = "X";

        }
        else {
            n1.token = "X";
            n2.token = "O";
            n1.name = arr[0];
            n2.name = arr[1];
        }
        this.setTwoPlayers(n1.name,n2.name);
        this.setState({
            player1: n1,
            player2: n2,
            tokenX: (swap ? this.props.tokenO : this.props.tokenX),
            tokenO: (swap ? this.props.tokenX : this.props.tokenO),
            myIcon: (swap ? "O" : "X"),
            friendIcon: (swap ? "X": "O")
        })
    }
    render() {
        let prompt = <OneNamePrompt isOpen={this.state.namePromptSeen} toggle={this.toggleNamePrompt} onSubmit={this.setOnePlayer} />;

        return (
            <Fragment>
                <div className="row">
                    <div className="col">
                        {prompt}
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-2 text-center">
                        <h2>{this.state.player1.name}</h2>
                    </div>
                    <div className="col-md-8 text-center">
                        <h2>vs</h2>
                    </div>
                    <div className="col-md-2 text-center">
                        <h2>{this.state.player2.name}</h2>
                    </div>
                    <div className="col-md-2 text-center">
                        <h2>{this.state.myIcon}</h2>
                    </div>
                    <div className="col-md-8 text-center">
                        <h2></h2>
                    </div>
                    <div className="col-md-2 text-center">
                        <h2>{this.state.friendIcon}</h2>
                    </div>

                    <div className="col-md-2 text-center">
                        <h2><img className="player1" src={require('../img/' + this.state.tokenX + '.png')} alt="pieceX" /></h2>
                    </div>
                    <div class="col-md-8 text-center">
                        <UncontrolledDropdown>
                            <DropdownToggle caret>
                                Board Themes
                        </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem onClick={() => this.setBoardTheme('1')}>Default Light Theme</DropdownItem>
                                <DropdownItem onClick={() => this.setBoardTheme('2')}>Coder Theme</DropdownItem>
                                <DropdownItem onClick={() => this.setBoardTheme('3')}>Harvest Theme</DropdownItem>
                                <DropdownItem onClick={() => this.setBoardTheme('4')}>Spring Theme</DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </div>
                    <div className="col-md-2 text-center">
                        <h2><img className="player2" require src={require('../img/' + this.state.tokenO + '.png')} alt="pieceO" /></h2>
                    </div>

                </div>
                <div className="row">
                    <div className="col-md-2">
                        <Scoreboard
                            score={this.state.p1Score}
                        />
                    </div>

                    <div className="col-md-8 text-center align-items-center">
                        {this.state.player1.name && this.state.player2.name ?
                            (<OnlineGame
                                updateName={(e) => { this.updateNames(e) }}
                                player1={this.state.player1.name}
                                player2={this.state.player2.name}
                                updatePlayers={this.updatePlayers}
                                tokenX={this.props.tokenX}
                                tokenO={this.props.tokenO}
                                boardTheme={this.state.boardTheme} />)
                            : null}

                    </div>
                    <div className="col-md-2">
                        <Scoreboard
                            score={this.state.p2Score}
                        />
                    </div>
                </div>

                <div className="row align-items-center h-50 ">
                    <div className="col-md-12 text-center mt-4">
                        <Link to='/'>
                            <button type="button" className="btn btn-lrg btn-primary active  shadow-large  rounded-pill w-25 h-50">Quit</button>
                        </Link>
                    </div>
                </div>
            </Fragment>
        );
    }
}
