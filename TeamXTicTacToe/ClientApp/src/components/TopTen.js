import React, { Component, Fragment } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export class TopTen extends Component {
    static displayName = TopTen.name;

    render() {
        return (

            <div>
                <Modal isOpen={this.props.isOpen} toggle={this.props.toggle}>
                    <ModalHeader toggle={this.props.toggle}>Top 10 Players</ModalHeader>
                    <ModalBody>
                        Top 10 component goes here
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.props.toggle}>Ok</Button>{' '}
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}