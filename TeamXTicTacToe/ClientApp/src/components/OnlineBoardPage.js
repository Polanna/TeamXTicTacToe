import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { OnlineGame } from './OnlineGame';
import Client from './Client';


// 1. create a socket and successfully connect to the server: DONE
// 2. 


export class OnlineBoardPage extends Component {
    static displayName = OnlineBoardPage.name;


    constructor(props) {
        super(props);
        this.state = {
            player1: {},
            player2: {}
        }
    }




    componentDidMount() {

        const nick1 = window.prompt('Player 1:', 'Player1');
        const nick2 = window.prompt('Player 2:', 'Player2');
        Client.getPlayer(nick1, (player) => { this.setState({ player1: player }) })
        Client.getPlayer(nick2, (player) => { this.setState({ player2: player }) })
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

    render() {
        return (
            <Fragment>

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
                    <div className="col-md-8 text-center">
                        <h2></h2>
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
                        <OnlineGame updatePlayers={this.updatePlayers} tokenX={this.props.tokenX} tokenO={this.props.tokenO}/>
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
