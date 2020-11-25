import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Tutorial } from './Tutorial';
import pieceX from '../img/pig.png';
import pieceO from '../img/chick.png';
import { OnePlayer } from './OnePlayer';
import Scoreboard from './Scoreboard';


export class OnePlayerPage extends Component {
    static displayName = OnePlayerPage.name;
    state = {
        player1: '',
        player2: ''
    }

    componentDidMount() {
        const nick1 = window.prompt('Player 1:', 'Player1');
        const nick2 = 'AI';
        this.setState({ player1: nick1, player2: nick2 });
    }

    render() {
        return (
            <Fragment>
                <div class="row">
                    <div class="col-md-12 text-center">
                        <h1>One Player Mode</h1>
                    </div>
                </div>
                <OnePlayer
                    tokenX={this.props.tokenX}
                    tokenO={this.props.tokenO}
                    p1Name={this.state.player1}
                    p2Name={this.state.player2}
                    p1Image={require('../img/' + this.props.tokenX + '.png')}
                    p2Image={require('../img/' + this.props.tokenO + '.png')}
                />

                <div class="row align-items-center h-50 ">
                    <div class="col-md-12 text-center mt-4">
                        <Link to='/'>
                            <button type="button" class="btn btn-lrg btn-primary active  shadow-large  rounded-pill w-25 h-50">Quit</button>
                        </Link>
                    </div>
                </div>
            </Fragment>
        );
    }
}
