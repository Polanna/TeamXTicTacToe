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
            playerX: {},
            playerO: {},
            boardTheme: '1',

            tokenX: this.props.tokenX,
            tokenO: this.props.tokenO,

            pXScore: [0, 0, 0],
            pOScore: [0, 0, 0],

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
        //make copy of state.player1
        let playerX = Object.assign({}, this.state.playerX);
        let playerO = Object.assign({}, this.state.playerO);

        let pXScore = this.state.pXScore.slice();
        let pOScore = this.state.pOScore.slice();

        if (result === 'X') {
            //increase player 1 wins, inc player 2 losses
            playerX.winCount++;
            pXScore[0]++;
            playerO.loseCount++;
            pOScore[1]++;
        }
        else if (result === 'O') {
            //increase player 2 wins, inc player 1 losses
            playerO.winCount++;
            pOScore[0]++;
            playerX.loseCount++;
            pXScore[1]++;
        }
        else {
            //increase both draws
            playerX.drawCount++;
            playerO.drawCount++;
            pXScore[2]++;
            pOScore[2]++;
        }
        //console.log("player1.winCount: ")
        //console.log(player1)
        //console.log("player2.loseCount: ")
        //console.log(player2)

        

        //save new data
        Client.updatePlayer(playerX);
        Client.updatePlayer(playerO);
        //update player1 and player2 state (left is label, right is object)
        this.setState({
            playerX: playerX,
            playerO: playerO,
            pXScore: pXScore,
            pOScore: pOScore,
        });
    };
    setOnePlayer = (nick1) => {
        let player1 = {
            name: nick1
        }

        let player2 = {
            name: 'Not Yet determined'
        }

        this.setState({
            playerX: player1,
            playerO: player2
        });
    }
    toggleNamePrompt = () => {
        this.setState({
            namePromptSeen: !this.state.namePromptSeen
        });

    }
    updateNames = (e) => {
        let arr = e.split('/');
        let inviter = arr[0];
        let invitee = arr[1];
        Client.getPlayer(inviter, (player) => { this.setState({ playerX: player }) });
        Client.getPlayer(invitee, (player) => { this.setState({ playerO: player }) });
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
                        <h2>{this.state.playerX.name}</h2>
                    </div>
                    <div className="col-md-8 text-center">
                        <h2>vs</h2>
                    </div>
                    <div className="col-md-2 text-center">
                        <h2>{this.state.playerO.name}</h2>
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
                            score={this.state.pXScore}
                        />
                    </div>

                    <div className="col-md-8 text-center align-items-center">
                        {this.state.playerX.name && this.state.playerO.name ?
                            (<OnlineGame
                                updateName={(e) => { this.updateNames(e) }}
                                player1={this.state.playerX.name}
                                player2={this.state.playerO.name}
                                updatePlayers={this.updatePlayers}
                                tokenX={this.props.tokenX}
                                tokenO={this.props.tokenO}
                                boardTheme={this.state.boardTheme} />)
                            : null}

                    </div>
                    <div className="col-md-2">
                        <Scoreboard
                            score={this.state.pOScore}
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
