import React, { useState } from 'react';

const Scoreboard = (props) => {
    const [winCount, setWincount] = useState(0);
    const [lossCount, setLosscount] = useState(0);
    const [drawCount, setDrawcount] = useState(0);
    const playerName = props.playerName;
    const playerShape = props.playerShape;

    return (
        <div>
            <h3>{playerName}</h3>
            <h3>{playerShape}</h3>
            <h3>Wins: {winCount}</h3>
            <h3>Losses: {lossCount}</h3>
            <h3>Draws: {drawCount}</h3>
        </div>
    );
}

export default Scoreboard;