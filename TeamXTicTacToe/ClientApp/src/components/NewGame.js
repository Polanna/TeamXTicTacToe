import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TopTen } from './TopTen';
import './NewGame.css';

const NewGame = () => {
    const displayName = NewGame.name;

    const [seen, setSeen] = useState(false);

    function toggleTopTen() {
        console.log("flip state!!!")
        setSeen(!seen)
    };

    return (
        <div className="container-newgame">
            <h1 className="title-newgame">Tic Tac Toe</h1>
            <h2 className="subtitle-newgame">Team X</h2>

            <TopTen isOpen={seen} toggle={toggleTopTen} />

            <div className="subcontainer-newgame">
                <Link to='/boardpage'>
                        <button type="button" className="btn-newgame">One Player</button>
                </Link>
                <Link to='/boardpage'>
                        <button type="button" className="btn-newgame">Two Player</button>
                </Link>
            </div>

            <div className="subcontainer-newgame">
                    <button type="button" onClick={toggleTopTen} className="btn-newgame">Stats</button>

                <Link to='/settings'>
                        <button type="button" className="btn-newgame">Settings</button>
                </Link>
            </div>


        </div>
    );
}

export default NewGame;
