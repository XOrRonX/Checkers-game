import React, { Component } from "react";
import "./Box.css";
import Pawn from "./Pawn";

class Box extends Component {
  render() {
    let color = (this.props.row + this.props.column) % 2 === 0 ? "grey" : "red";
    let chose = this.props.chosen ? " chose" : "";
    let classname = "box " + color + chose;

    return (
      <div
        className={classname}
        onClick={() => {
          this.props.chooseBox(this.props.row, this.props.column)
        }}
      >
        {this.props.value != null && <Pawn type={this.props.value} />}
      </div>
    );
  }
}

export default Box;
