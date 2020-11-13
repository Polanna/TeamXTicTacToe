import React, { Component, Fragment } from 'react';

export class BoardPage extends Component {
    static displayName = BoardPage.name;
    render() {
        return (
            <Fragment>
                <div class="row">
                    <div class="col-md-2 text-center">
                        <h2>Player 1</h2>
                    </div>
                    <div class="col-md-8 text-center">
                                <h2>vs</h2>
                            </div>
                            <div class="col-md-2 text-center">
                                <h2>Player 2</h2>
                            </div>
                </div>
                <div class="row">
                    <div class="col-md-2">
                        <h3>Player scores component here </h3>
                    </div>
                    <div class="col-md-8">
                        <h3>Board component here </h3>
                    </div>
                    <div class="col-md-2">
                        <h3>Player scores  component here </h3>
                    </div>
                </div>

                <!-- button quit: concede question if game not done, else return to main page -->
                <div class="row align-items-center h-50 ">
                    <div class="col-md-12 text-center mt-4">
                        <button type="button" class="btn btn-lrg btn-primary active  shadow-large  rounded-pill w-25 h-50">Quit</button>
                    </div>
                </div>
            </Fragment>
        );
    }
}
