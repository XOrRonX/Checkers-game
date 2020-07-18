import React, { Component } from "react";
import "./App.css";
import "./components/Board";
import Board from "./components/Board";
import Game from "./components/Game";

const BOARD_SIZE = 8,
  BLACK = 2,
  WHITE = 1;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      board: new Board(BOARD_SIZE),
      chosenBox: null,
      turn: BLACK
    };
  }

  nextTurn() {
    this.setState({ turn: this.state.turn === WHITE ? BLACK : WHITE });
  }

  chooseBox = (row, col) => {
    let currentBox = this.state.chosenBox,
      nextBox = { row: row, col: col },
      board = this.state.board;

    if (this.canChooseBox(nextBox)) {
      this.setState({ chosenBox: nextBox });
    } else if (currentBox) {
      if (board.checkIfCanJump(currentBox, nextBox)) {
        board.movePawn(currentBox, nextBox);
        this.setState({ chosenBox: nextBox });
      } else if (board.checkIfMoveIsValid(currentBox, nextBox)) {
        board.movePawn(currentBox, nextBox);
        this.setState({ chosenBox: null });
        this.nextTurn();
      }
      else {
        this.setState({ chosenBox: null });
        this.nextTurn();
      }
    }
  };

  canChooseBox = newBox => {
    let player = this.state.board.board[newBox.row][newBox.col];

    if (!player) return false;

    return player === this.state.turn ? true : false;
  };

  render() {
    return (
      <div className="App">
        <h2>React Checkers Game</h2>
        <Game
          game={this.state.board}
          pawns={this.state.board.pawns}
          chosenBox={this.state.chosenBox}
          chooseBox={this.chooseBox.bind(this)}
        />
      </div>
    );
  }
}

export default App;
