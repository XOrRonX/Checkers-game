import React, { Component } from 'react';
import Box from "./Box"
import "./Row.css"

class Row extends Component {

    render() {
        let chosenCol = this.props.chosenBox ? this.props.chosenBox.col : null;
        let boxs = this.props.row.map((box, i) => {
            return <Box key={i}
                           row={this.props.rowNumber}
                           column={i}
                           value={box != null ? box : null}
                           chosen={i === chosenCol}
                           chooseBox={this.props.chooseBox}
                            />
        });
        
        return (
            <div className="row">
                {boxs}
            </div>
        );
    }
}

export default Row;