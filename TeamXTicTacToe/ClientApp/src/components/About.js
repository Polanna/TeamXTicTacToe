﻿import React, { Component, Fragment } from 'react';

export class About extends Component {
    static displayName = About.name;

    render() {
        return (
            <Fragment>
                <div className="row">
                    <div className="col-md-12 text-center mt-4">
                        <h1> About</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12 ">
                        <h2> Team:</h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12 ">
                        <ul>
                            <li><h3> Prarin Behdarvandian</h3></li>
                            <li><h3> Hiramani Jain</h3></li>                            
                            <li><h3> Jason Kozodoy</h3></li>                            
                            <li><h3> Dat Le</h3></li>
                            <li><h3> Jonathan Lee</h3></li>
                            <li><h3> Carl Mofjeld</h3></li>
                            <li><h3> Maré Sieling</h3></li>
                            <li><h3> Luyao Wang</h3></li>
                        </ul>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12 ">
                        <h2> References:</h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12 ">
                        <h3> Tutorial: <a href="https://reactjs.org/tutorial/tutorial.html" target="_blank">https://reactjs.org/tutorial/tutorial.html</a> </h3>
                        <h3> Image sources: <a href="https://pngtree.com/so/hand-drawn-style" target="_blank"> https://pngtree.com/so/hand-drawn-style</a> </h3>
                        <h3> Icons: <a href="https://icons8.com/" target="_blank"> https://icons8.com</a> </h3>
                        <h3> MiniMax Tutorial: <a href="https://www.freecodecamp.org/news/how-to-make-your-tic-tac-toe-game-unbeatable-by-using-the-minimax-algorithm-9d690bad4b37/" target="_blank"> https://www.freecodecamp.org/news/how-to-make-your-tic-tac-toe-game-unbeatable-by-using-the-minimax-algorithm-9d690bad4b37/ </a> </h3>
                        <h3> Themes: <a href="https://bootswatch.com/" target="_blank">https://bootswatch.com/</a> </h3>
                        <h3> Theme Switcher:  <a href="https://www.npmjs.com/package/react-bootstrap-theme-switcher" target="_blank">https://www.npmjs.com/package/react-bootstrap-theme-switcher</a> </h3>
                    </div>
                </div>

            </Fragment >
        );
    }
}