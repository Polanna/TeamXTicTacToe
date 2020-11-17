import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TopTen } from './TopTen';
import { useSpring, animated } from 'react-spring';
import './NewGame.css';

const NewGame = () => {
    const displayName = NewGame.name;

    const [seen, setSeen] = useState(false);

    function toggleTopTen() {
        console.log("flip state!!!")
        setSeen(!seen)
    };

    return (
        <div className="container">
            <h1 className="title-newgame">Tic Tac Toe</h1>
            <h2 className="subtitle-newgame">Team X</h2>

            <TopTen isOpen={seen} toggle={toggleTopTen} />

            <animated.div>
                <button type="button" onClick={toggleTopTen} className="btn-newgame">Stats</button>
            </animated.div>

            <Link to='/settings'>
                <animated.div>
                    <button type="button" className="btn-newgame">Settings</button>
                </animated.div>
            </Link>

            <Link to='/boardpage'>
                <animated.div>
                    <button type="button" className="btn-newgame">One Player</button>
                </animated.div>
            </Link>

            <Link to='/boardpage'>
                <animated.div>
                    <button type="button" className="btn-newgame">Two Player</button>
                </animated.div>
            </Link>
        </div>
    );
}

export default NewGame;
