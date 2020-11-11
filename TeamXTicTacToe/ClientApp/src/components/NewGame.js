import React, { Component, Fragment } from 'react';

export class NewGame extends Component {
    static displayName = NewGame.name;

    render() {
        return (
            <Fragment>
                <div class="jumbotron">
                    <h1 class="display-1 text-center"> Tic Tac Toe </h1>
                </div>

                <div class="row justify-content-start">
                    <div class="col align-self-start">
                        <button type="button" class="btn btn-primary rounded-circle">Stats</button>
                    </div>

                    <div class="col  align-self-end text-right">
                        <button type="button" class="btn btn-primary rounded-circle">Settings</button>
                    </div>
                </div>

                <div class = "row align-items-center h-50 ">
                    <div class = "col-md-12 text-center mt-4">
                        <button type="button" class="btn btn-lrg btn-primary shadow-large  rounded-pill w-25 h-50">One Player</button>

                    </div>

                    <div class = "col-md-12 text-center mt-4">
                        <button type="button" class="btn btn-lrg btn-primary shadow-large rounded-pill w-25 h-50">Two Player</button>
                    </div>
                </div>
            </Fragment>
        );
    }
}
