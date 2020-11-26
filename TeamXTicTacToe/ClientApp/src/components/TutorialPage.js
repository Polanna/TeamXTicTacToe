import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Tutorial } from './Tutorial';
import pieceX from '../img/pig.png';
import pieceO from '../img/chick.png';
import { OneNamePrompt } from './OneNamePrompt';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';


export class TutorialPage extends Component {
    static displayName = TutorialPage.name;
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

    render() {
        return (
            <Fragment>
                <div className="row">
                    <div className="col">
                        <OneNamePrompt isOpen={this.state.namePromptSeen} toggle={this.toggleNamePrompt} onSubmit={this.setPlayer} />
                    </div>
                </div>
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
                        <h3>Information here </h3>
                    </div>
                    <div className="col-md-8 text-center align-items-center">
                        <Tutorial tokenX={this.props.tokenX} tokenO={this.props.tokenO} boardTheme={this.state.boardTheme}/>
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
