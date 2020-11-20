import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Tutorial } from './Tutorial';
import pieceX from '../img/pig.png';
import pieceO from '../img/chick.png';


export class TutorialPage extends Component {
    static displayName = TutorialPage.name;
    state = {
        player1: '',
        player2: ''
    }

    componentDidMount() {
        const nick1 = window.prompt('Player 1:', 'Player1');
        const nick2 = 'AI';
        this.setState({ player1: nick1, player2: nick2 })
    }

    render() {
        return (
            <Fragment>
                <div class="row">
                    <div class="col-md-12 text-center">
                        <h1>Tutorial</h1>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-2 text-center">
                        <h2>{this.state.player1}</h2>
                    </div>
                    <div class="col-md-8 text-center">
                        <h2>vs</h2>
                    </div>
                    <div class="col-md-2 text-center">
                        <h2>{this.state.player2}</h2>
                    </div>
                    <div class="col-md-2 text-center">
                        <h2>X</h2>
                    </div>
                    <div class="col-md-8 text-center">
                        <h2></h2>
                    </div>
                    <div class="col-md-2 text-center">
                        <h2>O</h2>
                    </div>
                    <div class="col-md-2 text-center">
                        <h2><img className="player1" src={pieceX} alt="pieceX" /></h2>
                    </div>
                    <div class="col-md-8 text-center">
                        <h2></h2>
                    </div>
                    <div class="col-md-2 text-center">
                        <h2><img className="player2" src={pieceO} alt="pieceO" /></h2>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-2">
                        <h3>Information here </h3>
                    </div>
                    <div class="col-md-8 text-center align-items-center">
                        <Tutorial />
                    </div>
                    <div class="col-md-2">
                        <h3>Information here </h3>
                    </div>
                </div>

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
