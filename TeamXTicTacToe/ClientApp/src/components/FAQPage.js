import React, { Component, Fragment } from 'react';
import { FAQQuestion } from './FAQQuestion';

export class FAQPage extends Component {
    static displayName = FAQPage.name;

    render() {
        return (
            <Fragment>
                <div className="jumbotron">
                    <h1 className="display-1 text-center"> Frequently Asked Questions </h1>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        <FAQQuestion question="How to win" answer="3 in a row" />

                    </div>
                    <div className="col-md-12">
                        <FAQQuestion question="Inviting a friend" answer="good luck with that" />
                    </div>

                    <div className="col-md-12">
                        <FAQQuestion question="No idea" answer="I hope you have some ideas" />
                    </div>


                </div>
            </Fragment>
        );
    }
}