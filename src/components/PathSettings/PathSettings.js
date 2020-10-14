import React, { createRef } from "react";
import { connect } from "react-redux";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";

import {
  visualise,
  resetGrid,
  selectPathFindingAlgo,
  toggleSolved,
  updateStartEnd,
  updateMazeTimeLine,
  recursiveBackTrackInit,
  updateMazeTimeLine2,
  updateMazeTimeLinePrim,
} from "../../actions/index";

const PathSettings = ({
  grid,
  numCol,
  numRow,
  start,
  end,
  disableKey,
  solved,
  pathFindingAlgo,
  visualise,
  resetGrid,
  selectPathFindingAlgo,
  toggleSolved,
  updateMazeTimeLine,
  recursiveBackTrackInit,
  updateMazeTimeLine2,
  updateMazeTimeLinePrim,
}) => {
  let mazetitle = createRef();
  let updateMazeTitle = (title) => {
    mazetitle.current.firstChild.innerHTML = title;
  };

  return (
    <Navbar bg="dark" expand="lg" variant="dark">
      <Navbar.Brand bg="dark">PathFinding Visualiser</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <NavDropdown
          title={
            pathFindingAlgo === null
              ? "Select Pathfinding Algorithm"
              : pathFindingAlgo
          }
          id="basic-nav-dropdown"
        >
          <NavDropdown.Item
            onClick={() => {
              selectPathFindingAlgo("A* Search");
            }}
          >
            A* Search
          </NavDropdown.Item>
          <NavDropdown.Item
            onClick={() => {
              selectPathFindingAlgo("Dijkstra Algorithm");
            }}
          >
            Breadth First Search (Default)
          </NavDropdown.Item>
        </NavDropdown>
        <NavDropdown
          ref={mazetitle}
          title="Select Maze Generation Algorithm"
          id="basic-nav-dropdown"
        >
          <NavDropdown.Item
            onClick={() => {
              if (!disableKey) {
                resetGrid(numRow, numCol, "1,1", `${numRow - 2},${numCol - 2}`);
                toggleSolved(false);
                recursiveBackTrackInit(grid);
                updateMazeTimeLine2(numCol, numRow, "1,1");
                updateMazeTitle("Recursive Backtracking");
              }
            }}
          >
            Recursive Backtracking
          </NavDropdown.Item>
          <NavDropdown.Item
            onClick={() => {
              if (!disableKey) {
                resetGrid(numRow, numCol, "1,1", `${numRow - 2},${numCol - 2}`);
                toggleSolved(false);
                updateMazeTimeLine(numCol, numRow, start, end, null);
                updateMazeTitle("Recursive Divison");
              }
            }}
          >
            Recursive Divison
          </NavDropdown.Item>
          <NavDropdown.Item
            onClick={() => {
              if (!disableKey) {
                resetGrid(numRow, numCol, "1,1", `${numRow - 2},${numCol - 2}`);
                toggleSolved(false);
                updateMazeTimeLine(numCol, numRow, start, end, "vertical");
                updateMazeTitle("Recursive Division (Vertical Skew)");
              }
            }}
          >
            Recursive Division (Vertical Skew)
          </NavDropdown.Item>
          <NavDropdown.Item
            onClick={() => {
              if (!disableKey) {
                resetGrid(numRow, numCol, "1,1", `${numRow - 2},${numCol - 2}`);
                toggleSolved(false);
                updateMazeTimeLine(numCol, numRow, start, end, "horizontal");
                updateMazeTitle("Recursive Division (Horizontal Skew)");
              }
            }}
          >
            Recursive Division (Horizontal Skew)
          </NavDropdown.Item>
          <NavDropdown.Item
            onClick={() => {
              if (!disableKey) {
                resetGrid(numRow, numCol, "1,1", `${numRow - 2},${numCol - 2}`);
                toggleSolved(false);
                recursiveBackTrackInit(grid);
                updateMazeTimeLinePrim(numCol, numRow);
                updateMazeTitle("Prim's Algorithm");
              }
            }}
          >
            Prim's Algorithm
          </NavDropdown.Item>
        </NavDropdown>
        <Button
          disabled={disableKey}
          className="ml-2"
          variant="success"
          size="sm"
          onClick={() => {
            if (!solved) {
              visualise(pathFindingAlgo, grid, start, end, numCol, numRow);
            } else {
              window.alert("Shortest Path already found. Please Reset Board");
            }
          }}
        >
          Visualise!
        </Button>
        <Button
          disabled={disableKey}
          className="ml-2"
          variant="danger"
          size="sm"
          onClick={() => {
            resetGrid(numRow, numCol);
            toggleSolved(false);
          }}
        >
          Reset
        </Button>
      </Navbar.Collapse>
    </Navbar>
  );
};

const mapStateToProps = (state) => {
  return {
    grid: state.grid.grid,
    numCol: state.grid.numCol,
    numRow: state.grid.numRow,
    start: state.grid.start,
    end: state.grid.end,
    disableKey: state.process.running,
    solved: state.process.solved,
    pathFindingAlgo: state.pathFindingAlgo,
  };
};

export default connect(mapStateToProps, {
  visualise,
  resetGrid,
  selectPathFindingAlgo,
  toggleSolved,
  updateStartEnd,
  updateMazeTimeLine,
  recursiveBackTrackInit,
  updateMazeTimeLine2,
  updateMazeTimeLinePrim,
})(PathSettings);
