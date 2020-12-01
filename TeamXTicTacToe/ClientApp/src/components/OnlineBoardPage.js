import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { OnlineGame } from './OnlineGame';
import Client from './Client';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { OneNamePrompt } from './OneNamePrompt';




export class OnlineBoardPage extends Component {
    static displayName = OnlineBoardPage.name;


    constructor(props) {
        super(props);
        this.state = {
            namePromptSeen: true,
            player1: {},
            player2: {},
            boardTheme: '1',
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
        let player1 = Object.assign({}, this.state.player1);
        let player2 = Object.assign({}, this.state.player2);

        if (result === 'X') {
            //increase player 1 wins, inc player 2 losses
            player1.winCount++;
            player2.loseCount++;
        }
        else if (result === 'O') {
            //increase player 2 wins, inc player 1 losses
            player2.winCount++;
            player1.loseCount++;
        }
        else {
            //increase both draws
            player1.drawCount++;
            player2.drawCount++;
        }
        //save new data
        Client.updatePlayer(player1);
        Client.updatePlayer(player2);
        //update player1 and player2 state (left is label, right is object)
        this.setState({
            player1: player1,
            player2: player2
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
            player1: player1,
            player2: player2
        });
    }
    toggleNamePrompt = () => {
        this.setState({
            namePromptSeen: !this.state.namePromptSeen
        });

    }
    updateNames = (e) => {
        let arr = e.split('/')
        let n2 = {
            name: 'Not Yet determined'
        }
        console.log(this.state.player1.name)
        console.log(this.state.player1.name === arr[0])
        if (this.state.player1.name === arr[0]) { n2.name = arr[1] }
        else { n2.name = arr[0] }
        this.setState({ player2: n2 })
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
                        <h2>X</h2>
                    </div>
                    <div className="col-md-8 text-center">
                        <h2></h2>
                    </div>
                    <div className="col-md-2 text-center">
                        <h2>O</h2>
                    </div>

                    <div className="col-md-2 text-center">
                        <h2><img className="player1" src={require('../img/' + this.props.tokenX + '.png')} alt="pieceX" /></h2>
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
                        <h2><img className="player2" require src={require('../img/' + this.props.tokenO + '.png')} alt="pieceO" /></h2>
                    </div>

                </div>
                <div className="row">                   
                    <div className="col-md-2">
                        <h3>Player scores component here </h3>
                    </div>

                    <div className="col-md-8 text-center align-items-center">
                        {this.state.player1.name && this.state.player2.name ?
                            (<OnlineGame
                                updateName={(e) => { this.updateNames (e) }}
                                player1={this.state.player1.name}
                                player2={this.state.player2.name}
                                updatePlayers={this.updatePlayers}
                                tokenX={this.props.tokenX}
                                tokenO={this.props.tokenO}
                                boardTheme={this.state.boardTheme} />)
                            : null}
                        
                    </div>
                    <div className="col-md-2">
                        <h3>Player scores  component here </h3>
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
