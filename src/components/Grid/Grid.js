import React, { useEffect } from "react";
import { connect } from "react-redux";

import {
  getGrid,
  mousedown,
  mouseup,
  addPath,
  addVisit,
  deleteKeyDown,
  deleteKeyUp,
  toggleInteraction,
  toggleSolved,
  addMazeWall,
} from "../../actions";
import Row from "./Row";

const Grid = ({
  numCol,
  numRow,
  grid,
  shortestPath,
  visitTimeline,
  disableKey,
  getGrid,
  mousedown,
  mouseup,
  addPath,
  addVisit,
  deleteKeyDown,
  deleteKeyUp,
  toggleInteraction,
  toggleSolved,
  mazeTimeline,
  addMazeWall,
}) => {
  useEffect(() => {
    getGrid(window);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (shortestPath.length !== 0) {
      toggleInteraction();
      for (let i = 0; i < visitTimeline.length; i++) {
        setTimeout(() => {
          // Change DOM directly. This is required to address some performance issue
          document.getElementById(visitTimeline[i]).className =
            document.getElementById(visitTimeline[i]).className + " visited";

          if (i === visitTimeline.length - 1) {
            // Update State
            addVisit(grid, visitTimeline);
            showPath();
          }
        }, 10 * i);
      }

      // To be exectued at the end of path searching visualisation
      const showPath = () => {
        for (let i = 1; i < shortestPath.length; i++) {
          let key = ""; // This is to determine arrow direction
          if (i < shortestPath.length - 1) {
            let n1Row = shortestPath[i].split(",")[0];
            let n1Col = shortestPath[i].split(",")[1];
            let n2Row = shortestPath[i + 1].split(",")[0];
            let n2Col = shortestPath[i + 1].split(",")[1];

            if (n2Col > n1Col) {
              key = "arrow-right";
            } else if (n2Col < n1Col) {
              key = "arrow-left";
            }

            if (n2Row > n1Row) {
              key = "arrow-down";
            } else if (n2Row < n1Row) {
              key = "arrow-up";
            }
          }

          setTimeout(() => {
            addPath(grid, shortestPath[i], shortestPath[i - 1], key);
            if (i === shortestPath.length - 1) {
              toggleInteraction();
              toggleSolved();
            }
          }, 50 * i);
        }
      };
    }
    // eslint-disable-next-line
  }, [shortestPath]);

  useEffect(() => {
    if (mazeTimeline.length !== 0) {
      toggleInteraction();
      for (let i = 0; i < mazeTimeline.length; i++) {
        setTimeout(() => {
          document.getElementById(mazeTimeline[i]).className = "wall";
          if (i === mazeTimeline.length - 1) {
            addMazeWall(grid, mazeTimeline);
            toggleInteraction();
          }
        }, 5 * i);
      }
    }
    // eslint-disable-next-line
  }, [mazeTimeline]);

  return (
    <div
      className="d-flex align-items-center justify-content-center mt-3"
      tabIndex="1"
      onKeyDown={(event) => {
        if (event.key === "d") {
          deleteKeyDown(event.key);
        }
      }}
      onKeyUp={(event) => {
        deleteKeyUp();
      }}
    >
      <div
        className="container-fluid"
        onMouseDown={(event) => {
          // Activate MouseDown reducer
          if (!disableKey) {
            if (event.target.className === "start") {
              mousedown("start");
            } else if (event.target.className === "end") {
              mousedown("end");
            } else {
              mousedown();
            }
          }
        }}
        onMouseUp={(event) => {
          // Release MouseDown reducer
          mouseup();
        }}
      >
        {Array(numRow)
          .fill(null)
          .map((elm, rowIndex) => {
            return (
              <div
                className="row d-flex justify-content-center"
                key={"row" + rowIndex}
              >
                <Row numCol={numCol} numRow={numRow} rowIndex={rowIndex} />
              </div>
            );
          })}
      </div>
    </div>
  );
};

const mapPropsToState = (state) => {
  return {
    numCol: state.grid.numCol,
    numRow: state.grid.numRow,
    grid: state.grid.grid,
    shortestPath: state.shortestPath.path,
    visitTimeline: state.shortestPath.visitTimeline,
    disableKey: state.process.running,
    mazeTimeline: state.mazeTimeline,
  };
};

export default connect(mapPropsToState, {
  getGrid,
  mousedown,
  mouseup,
  addPath,
  deleteKeyDown,
  deleteKeyUp,
  addVisit,
  toggleInteraction,
  toggleSolved,
  addMazeWall,
})(Grid);
