import React from 'react';
import './Scoreboard.css';

const Scoreboard = (props) => {
    const playerName = props.playerName;
    const playerImage = props.playerImage;

    return (
        <div className="container-scoreboard">
            <div>
                <h3>Wins: {props.score[0]}</h3>
                <h3>Losses: {props.score[1]}</h3>
                <h3>Draws: {props.score[2]}</h3>
            </div>
        </div>
    );
}

export default Scoreboard;