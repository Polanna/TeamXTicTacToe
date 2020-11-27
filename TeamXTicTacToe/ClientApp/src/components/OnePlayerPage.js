import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Tutorial } from './Tutorial';
import pieceX from '../img/pig.png';
import pieceO from '../img/chick.png';
import { OnePlayer } from './OnePlayer';
import { OneNamePrompt } from './OneNamePrompt';
//import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

export class OnePlayerPage extends Component {
    static displayName = OnePlayerPage.name;
    state = {
        player1: '',
        player2: 'AI',
        namePromptSeen: true,
        boardTheme: '1',
    }

    toggleNamePrompt = () => {
        console.log("flip state!!!")
        this.setState({
            namePromptSeen: !this.state.namePromptSeen
        });
    }

     setPlayer = (nick1) => {
        this.setState({
            player1: nick1,
        });
     }

    //chang the board theme to a user specified one
    setBoardTheme = (a) => {
        this.setState({
            boardTheme: a
        });

    }

     setPlayer = (nick1) => {
        this.setState({
            player1: nick1,
        });
     }

    render() {
        return (
            <Fragment>
                <div className="row">
                    <div className="col">
                        <OneNamePrompt isOpen={this.state.namePromptSeen} toggle={this.toggleNamePrompt} onSubmit={this.setPlayer} />
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12 text-center">
                        <h1>One Player Mode</h1>
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

                    <div class="col-md-2 text-center">
                        <h2><img className="player2" require src={require('../img/' + this.props.tokenO + '.png')} alt="pieceO" /></h2>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-2">
                        <h3>Information here </h3>
                    </div>
                    <div class="col-md-8 text-center align-items-center">
                        <OnePlayer tokenX={this.props.tokenX} tokenO={this.props.tokenO} boardTheme={this.state.boardTheme} />
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
