import React, { Component, Fragment } from 'react';
import { FAQQuestion } from './FAQQuestion';

export class FAQPage extends Component {
    static displayName = FAQPage.name;

    rules() {
        return (
            <div>
                <ul className="list-unstyled col-md-12">
                    <li>1.The game is played on a grid that's 3 squares by 3 squares.</li>
                    <li>2. If you are X, your friend (or the computer) is O. Players take turns putting their marks in empty squares.</li>
                    <li>3. The first player to get 3 of the marks in a row (up, down, across, or diagonally) is the winner.</li>
                    <li>4. When all 9 squares are full, the game is over. If no player has 3 marks in a row, the game ends in a tie.</li>
                </ul>
            </div>
        );
    }

    toWin() {
        return (
            <div>
                <p class="col-md-12 ">To win against aanother player or computer (or at least tie), you need to make use of a little bit of strategy.</p>
                <p class="col-md-12">Part of your strategy is trying to figure out how to get three Xs in a row. The other part is trying to figure out how to stop
                                    the computer from getting three Os in a row..</p>
                <p class="col-md-12">After you put an X in a square, you start looking ahead.Where's the best place for your next X? You look at the empty squares
                                        and decide which ones are good choices—which ones might let you make three Xs in a row.</p>
                <p class="col-md-12">You also have to watch where the computer puts its O. That could change what you do next. If the computer gets two Os in a row,
                you have to put your next X in the last empty square in that row, or the computer will win. You are forced to play in a particular
                                        square or lose the game.</p>
                <p class="col-md-12">If you always pay attention and look ahead, you'll never lose a game of Tic-Tac-Toe. You may not win, but at least you'll tie.</p>
            </div>
        );
    }

    render() {
        return (
            <Fragment>
                <div className="jumbotron">
                    <h1 className="display-1 text-center"> Frequently Asked Questions </h1>
                </div>

                <div className="row">
                    <div className="col-md-12 mb-3">
                        <FAQQuestion question="Rules of the game" answer={this.rules()} />
                    </div>
                    <div className="col-md-12 mb-3">
                        <FAQQuestion question="How to win" answer={this.toWin()} />
                    </div>

                    <div className="col-md-12 mb-3">
                        <FAQQuestion question="Inviting a friend" answer="good luck with that" />
                    </div>

                    <div className="col-md-12 mb-3">
                        <FAQQuestion question="No idea" answer="I hope you have some ideas" />
                    </div>

                </div>
            </Fragment>
        );
    }


}