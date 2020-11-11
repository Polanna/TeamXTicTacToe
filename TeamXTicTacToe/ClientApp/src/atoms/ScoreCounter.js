import React from 'react';
import './ScoreCounter.css';

const ScoreCounter = () => {
    return (
        <div className="container">
            <div className="scoreCounter">
                <div className="player">You</div>
                <div className="tie">Tie</div>
                <div className="opponent">Them</div>
            </div>
        </div>
    );
}

export default ScoreCounter;