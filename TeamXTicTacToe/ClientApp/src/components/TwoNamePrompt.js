import React, { Component, Fragment } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input } from 'reactstrap';
import { Link } from 'react-router-dom';

export class TwoNamePrompt extends Component {
    constructor(props) {
        super(props);
        this.state = {
            player1Name: "Player1",
            player2Name: "Player2",
        }
    }

    player1NameChange = (e) => {
        this.setState({
            player1Name: e.target.value
        })
    }

    player2NameChange = (e) => {
        this.setState({
            player2Name: e.target.value
        })
    }

    submit = () => {
        this.props.toggle();
        this.props.onSubmit(this.state.player1Name, this.state.player2Name);
    }

    render() {
        return (
            <div>
                <Modal isOpen={this.props.isOpen}>
                    <ModalHeader>Enter Player Names</ModalHeader>
                    <ModalBody>
                        Player 1 Name: <Input onChange={this.player1NameChange} />
                    </ModalBody>
                    <ModalBody>
                        Player 2 Name: <Input onChange={this.player2NameChange} />
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.submit}>Ok</Button>{' '}
                        <Link to='/'>
                            <Button color="primary">Cancel</Button>{' '}
                        </Link>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}