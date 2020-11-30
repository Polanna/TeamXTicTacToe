import React from 'react';

// import the pictures used as pieces on board
import blank from '../../img/blank.png';
import suggest from '../../img/suggestion.png';
import './Game.css';

export class Square extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let piece = <img className="blankPiece" src={blank} alt="empty" />

        if (this.props.isSuggestion) {
            piece = <img className="suggestionPiece" src={suggest} alt="suggestion" />
        }

        if (this.props.value) {
            piece = this.props.value === "X" ?
                <img className="player1" src={require('../../img/' + this.props.tokenX + '.png')} alt="X" />
                : <img className="player2" src={require('../../img/' + this.props.tokenO + '.png')} alt="O" />
        }

        return (
            <button className="squareInGame" data-pro={this.props.value} data-win={this.props.win} data-boardtheme={this.props.boardTheme} onClick={this.props.onClick}>
                {piece}
            </button>
        );
    }
}