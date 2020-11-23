import React, { Component, Fragment } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Client from './Client';

export class TopTen extends Component {
    static displayName = TopTen.name;

    state = {
        players: [
           
        ]
    };

    componentDidMount() {
        Client.getTopPlayers(10, (players) => { this.setState({players: players})})
    }


    render() { 

        const players = this.state.players.map((player) => (
            <div className="row">
                <div className="col">
                    {player.name}
                </div>
                <div className="col  align-self-end text-right">
                    {player.winCount}
                </div>
                <div className="col  align-self-end text-right">
                    {player.loseCount}
                </div>
                <div className="col  align-self-end text-right">
                    {player.drawCount}
                </div>
            </div>

        ));
        return (

            <div>
                <Modal isOpen={this.props.isOpen} toggle={this.props.toggle}>
                    <ModalHeader toggle={this.props.toggle}>Top 10 Players</ModalHeader> 
                    <ModalBody>
                        <div className="row">
                            <div className="col">
                                <b>Name</b>
                            </div>
                            <div className="col  align-self-end text-right">
                                <b>WinCount</b>
                            </div>
                            <div className="col  align-self-end text-right">
                                <b>LoseCount</b>
                            </div>
                            <div className="col  align-self-end text-right">
                                <b>DrawCount</b>
                            </div>
                        </div>
                        {players}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.props.toggle}>Ok</Button>{' '}
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}