import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Game } from './Game';

export class BoardPage extends Component {
    static displayName = BoardPage.name;

    constructor(props) {
        super(props);
        this.state = {
            player1: '',
            player2: '',
        }
    }

    componentDidMount() {
        const nick1 = window.prompt('Player 1:', 'Player1');
        const nick2 = window.prompt('Player 2:', 'Player2');
        this.setState({ player1: nick1, player2: nick2 })
    }

    render() {
        const player1 = this.state.player1;
        const player2 = this.state.player2;
        return (
            <Fragment>
                <Game player1={player1} player2={player2} />
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
