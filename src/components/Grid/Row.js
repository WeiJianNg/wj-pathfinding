import React from "react";
import { connect } from "react-redux";

import { addWall, deleteWall, updateStartEnd } from "../../actions/index";

const Row = ({
  numCol,
  numRow,
  grid,
  isMouseDown,
  isStartMouseDown,
  isEndMouseDown,
  start,
  end,
  rowIndex,
  deleteKey,
  disableKey,
  solved,
  addWall,
  deleteWall,
  updateStartEnd,
}) => {
  return (
    <React.Fragment>
      {Array(numCol)
        .fill(null)
        .map((elm, colIndex) => {
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
            borderWidth: "0.5px 0.5px 0px 0px",
          };

          // Adding border accordingly
          if (colIndex === 0 && rowIndex === numRow - 1) {
            style.borderWidth = "0.5px 0.5px 0.5px 0.5px";
          } else if (rowIndex === numRow - 1) {
            style.borderWidth = "0.5px 0.5px 0.5px 0px";
          } else if (colIndex === 0) {
            style.borderWidth = "0.5px 0.5px 0px 0.5px";
          }

          // grid-class
          let gridClass = grid[`${rowIndex},${colIndex}`].state
            ? grid[`${rowIndex},${colIndex}`].state
            : "";

          return (
            <div
              className={gridClass}
              id={rowIndex + "," + colIndex}
              style={style}
              key={"col" + colIndex + "row" + rowIndex}
              onMouseDown={(event) => {
                if (!disableKey && !solved) {
                  let coord = event.target.id;
                  addWall(coord, grid);
                  if (deleteKey || event.target.className === "wall") {
                    deleteWall(coord, grid);
                  } else if (isMouseDown) {
                    addWall(coord, grid);
                  }
                }
              }}
              onMouseEnter={(event) => {
                let coord = event.target.id;
                if (!disableKey && !solved) {
                  if (deleteKey && isMouseDown) {
                    deleteWall(coord, grid);
                  } else if (isMouseDown) {
                    addWall(coord, grid);
                  } else if (isStartMouseDown) {
                    if (event.target.className !== "end") {
                      updateStartEnd("start", start, end, coord, grid);
                    }
                  } else if (isEndMouseDown) {
                    if (event.target.className !== "start") {
                      updateStartEnd("end", start, end, coord, grid);
                    }
                  }
                }
              }}
            ></div>
          );
        })}
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    grid: state.grid.grid,
    isMouseDown: state.isMouseDown.mousedown,
    isStartMouseDown: state.isMouseDown.startMouseDown,
    isEndMouseDown: state.isMouseDown.endMouseDown,
    start: state.grid.start,
    end: state.grid.end,
    deleteKey: state.deleteKey,
    disableKey: state.process.running,
    solved: state.process.solved,
  };
};

export default connect(mapStateToProps, {
  addWall,
  updateStartEnd,
  deleteWall,
})(Row);
