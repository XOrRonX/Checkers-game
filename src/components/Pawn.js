import React from "react";
import "./Pawn.css";

function Pawn(props) {
  let classname = "";
  if (props.type===1) 
    classname = " white";
  else if (props.type === 2) 
    classname = " black";
  return (
    <div className={"pawn" + classname}></div>
    );
}

export default Pawn;
