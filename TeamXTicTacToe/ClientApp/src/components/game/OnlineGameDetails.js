import React, { Fragment } from 'react';

export class OnlineGameDetails extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let buttonText = this.props.showLobby ? "Hide Lobby" : "Show Lobby";
        return (
            <Fragment>
                
                <div>
                    <button onClick={this.props.toggleLobby}>{buttonText}</button>
                </div>
                <div>
                    {this.props.showLobby ? this.buildLobby() : null}
                </div>
            </Fragment>
        );
    }

    buildLobby = () => {
        let LobbyContainer = []
        this.props.LobbyNames.forEach((val, idx) => {
            if (this.props.LobbyIDs[idx] != this.props.myID) {
                LobbyContainer.push(<div>{val}  with status
                   [ {this.props.LobbyStatuses[idx]} ] ---
                    <button onClick={() => this.props.inviteClicked(idx)} disabled={this.props.LobbyStatuses[idx] === "In-Game"}>Invite</button> </div>);
            }
        })

        return LobbyContainer;
    }
}