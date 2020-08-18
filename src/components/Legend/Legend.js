import React from "react";
import { connect } from "react-redux";

const Legend = ({ numCol, numRow }) => {
  let cellWidth = (95 / numCol).toString() + "vw";
  // To calculate width and height of grid to fit the window
  let style = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: cellWidth,
    height: cellWidth,
    border: "solid",
    borderColor: "#30323D",
    borderWidth: "0.5px 0.5px 0.5px 0.5px",
  };

  return (
    <div className="container mt-3">
      <div className="row d-flex justify-content-between">
        <div className="col-2">
          <div style={style} className="visited"></div>
          <p className="m-0 p-0"> Visited</p>
        </div>
        <div className="col-2">
          <div style={style} className="start"></div>
          <p className="m-0 p-0"> Start</p>
        </div>
        <div className="col-2">
          <div style={style} className="end"></div>
          <p className="m-0 p-0"> End</p>
        </div>
        <div className="col-2">
          <div style={style} className="wall"></div>
          <p className="m-0 p-0"> Wall</p>
        </div>
        <div className="col-2">
          <div style={style} className="path"></div>
          <p className="m-0 p-0"> Path</p>
        </div>
      </div>
    </div>
  );
};

const mapStateToProp = (state) => {
  return {
    numCol: state.grid.numCol,
    numRow: state.grid.numRow,
  };
};

export default connect(mapStateToProp)(Legend);
