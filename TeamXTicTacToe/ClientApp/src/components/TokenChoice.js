import React, { Component, Fragment } from 'react';
import { Button } from 'reactstrap';
import './Game.css';

// import the pictures used as pieces on board
import pig from '../img/pig.png';
import chick from '../img/chick.png';
import bear from '../img/bear.png';
import cat from '../img/cat.png';
import cow from '../img/cow.png';
import deer from '../img/deer.png';
import dog from '../img/dog.png';
import fox from '../img/fox.png';
import goat from '../img/goat.png';
import mouse from '../img/mouse.png';
import panda from '../img/panda.png';
import rabbit from '../img/rabbit.png';

export class TokenChoice extends Component {
    static displayName = TokenChoice.name;



    render() {

        console.log('this.props.token ' + this.props.token)
        return (
            <Fragment>
                <div className="row">
                    <div className="col-md-4 text-center">
                        <Button type='button' outline active={this.props.token === 'panda'} onClick={() => this.props.setToken('panda')}>
                            <img className="blankPiece" src={panda} alt='panda' />
                        </Button>
                    </div>
                    <div className="col-md-4 text-center">
                        <Button type='button' outline active={this.props.token === 'cat'} onClick={() => this.props.setToken('cat')}>
                            <img className="blankPiece" src={cat} alt='cat' />
                        </Button>
                    </div>
                    <div className="col-md-4 text-center">
                        <Button type='button' outline active={this.props.token === 'fox'} onClick={() => this.props.setToken('fox')}>
                            <img className="blankPiece" src={fox} alt='fox' />
                        </Button>
                    </div>
                    <div className="col-md-4 text-center">
                        <Button type='button' outline active={this.props.token === 'cow'} onClick={() => this.props.setToken('cow')}>
                            <img className="blankPiece" value='cow' src={cow} alt='cow' />
                        </Button>
                    </div>
                    <div className="col-md-4 text-center">
                        <Button type='button' outline active={this.props.token === 'rabbit'} onClick={() => this.props.setToken('rabbit')}>
                            <img className="blankPiece" value='rabbit' src={rabbit} alt='rabbit' />
                        </Button>
                    </div>
                    <div className="col-md-4 text-center">
                        <Button type='button' outline active={this.props.token === 'dog'} onClick={() => this.props.setToken('dog')}>
                            <img className="blankPiece" value='dog' src={dog} alt='dog' />
                        </Button>
                    </div>
                    <div className="col-md-4 text-center">
                        <Button type='button' outline active={this.props.token === 'pig'} onClick={() => this.props.setToken('pig')}>
                            <img className="blankPiece" value='pig' src={pig} alt='pig' />
                        </Button>
                    </div><div className="col-md-4 text-center">
                        <Button type='button' outline active={this.props.token === 'chick'} onClick={() => this.props.setToken('chick')}>
                            <img className="blankPiece" value='chick' src={chick} alt='chick' />
                        </Button>
                    </div><div className="col-md-4 text-center">
                        <Button type='button' outline active={this.props.token === 'bear'} onClick={() => this.props.setToken('bear')}>
                            <img className="blankPiece" value='bear' src={bear} alt='bear' />
                        </Button>
                    </div><div className="col-md-4 text-center">
                        <Button type='button' outline active={this.props.token === 'deer'} onClick={() => this.props.setToken('deer')}>
                            <img className="blankPiece" value='deer' src={deer} alt='deer' />
                        </Button>
                    </div><div className="col-md-4 text-center">
                        <Button type='button' outline active={this.props.token === 'goat'} onClick={() => this.props.setToken('goat')}>
                            <img className="blankPiece" value='goat' src={goat} alt='goat' />
                        </Button>
                    </div><div className="col-md-4 text-center">
                        <Button type='button' outline active={this.props.token === 'mouse'} onClick={() => this.props.setToken('mouse')}>
                            <img className="blankPiece" value='mouse' src={mouse} alt='mouse' />
                        </Button>
                    </div>
                </div>
            </Fragment >
        );
    }
}

