import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Game } from './Game';


// 1. create a socket and successfully connect to the server: DONE
// 2. 


export class BoardPage extends Component {
    static displayName = BoardPage.name;
    constructor(props) {
        super(props);

        this.state = {
            player1: "You",
            player2: "Them"
        }
    }
    



    componentDidMount() {
        //const name = window.prompt('the other player:', 'type ID');

        //this.setState({ player2: name })
    }

    render() {
        return (
            <Fragment>
                

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
                </div>
                <div class="row">
                    <div class="col-md-2">
                        <h3>Player scores component here </h3>
                    </div>
                    <div class="col-md-8 text-center align-items-center">
                        <Game />
                        
                    </div>
                    <div class="col-md-2">
                        <h3>Player scores  component here </h3>
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
