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
        if (nick1) {
            const nick2 = 'AI';
            this.setState({ player1: nick1, player2: nick2 })
        }
        else {
            window.location.href = '/';
        }
    }

    render() {
        return (
            <Fragment>
                <div className="row">
                    <div className="col-md-12 text-center">
                        <h1>Tutorial</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-2 text-center">
                        <h2>{this.state.player1}</h2>
                    </div>
                    <div className="col-md-8 text-center">
                        <h2>vs</h2>
                    </div>
                    <div className="col-md-2 text-center">
                        <h2>{this.state.player2}</h2>
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
                        <h3>Information here </h3>
                    </div>
                    <div className="col-md-8 text-center align-items-center">
                        <Tutorial tokenX={this.props.tokenX} tokenO={this.props.tokenO}/>
                    </div>
                    <div className="col-md-2">
                        <h3>Information here </h3>
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
