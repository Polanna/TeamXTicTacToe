import React, { Component, Fragment } from 'react';
import { Collapse, Button, CardBody, Card } from 'reactstrap';

export class FAQQuestion extends Component {
    static displayName = FAQQuestion.name;

    state = {
        seen: false
    };

    toggleAnswer = () => {
        this.setState({
            seen: !this.state.seen
        });
    };


    render() {
        return (
            <div>
                <Button color="primary" onClick={this.toggleAnswer} style={{ marginBottom: '1rem' }}>{this.props.question}</Button>
                <Collapse isOpen={this.state.seen}>
                    <Card>
                        <CardBody>
                            {this.props.answer}
                        </CardBody>
                    </Card>
                </Collapse>
            </div>
        );
    }
}