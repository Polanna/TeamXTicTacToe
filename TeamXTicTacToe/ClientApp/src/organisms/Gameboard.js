import React from 'react';
import Scoreboard from './Scoreboard';
import ScoreCounter from '../atoms/ScoreCounter';
import './Gameboard.css'

const Gameboard = () => {

    return (
        <div className="game">
            <div className="board">
                <div className="square-top-left"></div>
                <div className="square-top"></div>
                <div className="square-top-right"></div>
                <div className="square-left"></div>
                <div className="square"></div>
                <div className="square-right"></div>
                <div className="square-bottom-left"></div>
                <div className="square-bottom"></div>
                <div className="square-bottom-right"></div>
            </div>
            <ScoreCounter />
        </div>
    );
}

export default Gameboard;