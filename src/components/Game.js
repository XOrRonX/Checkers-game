import React, { Component } from "react";
import Row from "./Row";
import "./Game.css";

class Game extends Component {
  render() {
    let chosenRow = this.props.chosenBox ? this.props.chosenBox.row : null;
    let rows = this.props.game.board.map((row, i) => {
      return (
        <Row
          key={i}
          row={row}
          rowNumber={i}
          pawns={this.props.pawns}
          chosenBox={i === chosenRow ? this.props.chosenBox : null}
          chooseBox={this.props.chooseBox}
        />
      );
    });

    return <div className="board">{rows}</div>;
  }
}

export default Game;
