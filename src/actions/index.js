import { pathFinding, calculateDistance } from "../script/pathfinding";
import {
  recursiveDivision,
  recursiveBackTrack,
  primAlgorithm,
} from "../script/maze";
import _ from "lodash";

export const getGrid = (window) => {
  // Function to adjust grid sizes based on user mobile window width and height
  let windowWidth = window.innerWidth;
  let numCol = 70;
  let numRow = Math.floor(numCol / 2.2);

  // Set Column size and Row size
  if (windowWidth <= 1440 && windowWidth > 1024) {
    numCol = 60;
    numRow = Math.floor(numCol / 2);
  } else if (windowWidth <= 1024 && windowWidth > 800) {
    numCol = 40;
    numRow = Math.floor(numCol / 2);
  } else if (windowWidth <= 800) {
    numCol = 25;
    numRow = Math.floor(numCol * 1.5);
  }

  // Create empty grid for VisitTracker, Distance Tracker
  let mainGrid = {}; // Create Object to Track distance and check if nodes have been visited
  for (let i = 0; i < numRow; i++) {
    for (let j = 0; j < numCol; j++) {
      mainGrid[`${i},${j}`] = {
        state: "unvisited",
        distance: Infinity,
        path: [],
        weight: 0,
      };
    }
  }

  // Define starting point and end point of grid
  //
  let start = `${Math.round(numRow / 2) - 1},${Math.round(numCol / 4)}`;
  let end = `${Math.round(numRow / 2) - 1},${Math.round((3 * numCol) / 4)}`;
  // Set Grid state at Start and End Point
  mainGrid[start].state = "start";
  mainGrid[end].state = "end";

  return {
    type: "FETCH_GRID",
    payload: {
      numCol: numCol,
      numRow: numRow,
      grid: mainGrid,
      start: start,
      end: end,
    },
  };
};

export const resetGrid = (numRow, numCol, start = null, end = null) => {
  // Create empty grid for VisitTracker, Distance Tracker
  let mainGrid = {}; // Create Object to Track distance and check if nodes have been visited
  for (let i = 0; i < numRow; i++) {
    for (let j = 0; j < numCol; j++) {
      mainGrid[`${i},${j}`] = {
        state: "unvisited",
        distance: Infinity,
        path: [],
        weight: 0,
      };
    }
  }

  // Reseting starting point
  if (start === null) {
    start = `${Math.round(numRow / 2) - 1},${Math.round(numCol / 4)}`;
  }
  if (end === null) {
    end = `${Math.round(numRow / 2) - 1},${Math.round((3 * numCol) / 4)}`;
  }

  mainGrid[start].state = "start";
  mainGrid[end].state = "end";
  return {
    type: "RESET_GRID",
    payload: {
      numCol: numCol,
      numRow: numRow,
      grid: mainGrid,
      start: start,
      end: end,
    },
  };
};

export const updateStartEnd = (key, oldStart, oldEnd, coord, grid) => {
  let updatedGrid = { ...grid };
  if (key === "start") {
    updatedGrid[oldStart].state = "unvisited";
    updatedGrid[coord].state = key;
    return {
      type: "UPDATE_START",
      payload: {
        updatedGrid: updatedGrid,
        start: coord,
      },
    };
  }
  if (key === "end") {
    updatedGrid[oldEnd].state = "unvisited";
    updatedGrid[coord].state = key;
    return {
      type: "UPDATE_END",
      payload: {
        updatedGrid: updatedGrid,
        end: coord,
      },
    };
  }
};

export const addWall = (coord, grid) => {
  let updatedGrid = { ...grid };
  if (
    updatedGrid[coord].state !== "start" &&
    updatedGrid[coord].state !== "end" &&
    updatedGrid[coord].state === "unvisited"
  ) {
    updatedGrid[coord].state = "wall";
  }
  return {
    type: "ADD_WALL",
    payload: {
      updatedGrid: updatedGrid,
    },
  };
};

export const deleteWall = (coord, grid) => {
  let updatedGrid = { ...grid };
  if (
    updatedGrid[coord].state !== "start" &&
    updatedGrid[coord].state !== "end" &&
    updatedGrid[coord].state === "wall"
  ) {
    updatedGrid[coord].state = "unvisited";
  }
  return {
    type: "DELETE_WALL",
    payload: {
      updatedGrid: updatedGrid,
    },
  };
};

export const addPath = (grid, coord, prevCoord, key) => {
  let updatedGrid = { ...grid };
  grid[prevCoord].state = " path";
  grid[coord].state = grid[coord].state + " path " + key;
  return {
    type: "ADD_PATHTOGRID",
    payload: {
      updatedGrid: updatedGrid,
    },
  };
};

export const addVisit = (grid, visitArray) => {
  let updatedGrid = { ...grid };
  for (let i = 0; i < visitArray.length; i++) {
    grid[visitArray[i]].state = grid[visitArray[i]].state + " visited";
  }

  return {
    type: "ADD_VISITTOGRID",
    payload: {
      updatedGrid: updatedGrid,
    },
  };
};

export const addUnvisited = (grid, visitArray) => {
  let updatedGrid = { ...grid };
  for (let i = 0; i < visitArray.length; i++) {
    if (
      grid[visitArray[i]].state !== "start" &&
      grid[visitArray[i]].state !== "end"
    ) {
      grid[visitArray[i]].state = "unvisited";
    }
  }

  return {
    type: "ADD_UNVISITTOGRID",
    payload: {
      updatedGrid: updatedGrid,
    },
  };
};

export const addMazeWall = (grid, mazeTimeline) => {
  let updatedGrid = { ...grid };
  for (let i = 0; i < mazeTimeline.length; i++) {
    updatedGrid[mazeTimeline[i]].state = "wall";
  }
  return {
    type: "ADD_MAZEWALL",
    payload: {
      updatedGrid: updatedGrid,
    },
  };
};

export const updateMazeTimeLine = (
  numCol,
  numRow,
  startCoord,
  endCoord,
  method
) => {
  let wallArray = recursiveDivision(
    numCol,
    numRow,
    startCoord,
    endCoord,
    method
  );
  return {
    type: "UPDATE_MAZE_TIMELINE_DIV",
    payload: {
      mazeTimeline: wallArray,
    },
  };
};

export const updateMazeTimeLine2 = (numCol, numRow, startCoord) => {
  let unVisitArray = recursiveBackTrack(numCol, numRow, startCoord);
  return {
    type: "UPDATE_MAZE_TIMELINE_BACK",
    payload: {
      unVisitTimeline: unVisitArray,
    },
  };
};

export const updateMazeTimeLinePrim = (numCol, numRow) => {
  let unVisitArray = primAlgorithm(numCol, numRow);
  return {
    type: "UPDATE_MAZE_TIMELINE_BACK",
    payload: {
      unVisitTimeline: unVisitArray,
    },
  };
};

export const recursiveBackTrackInit = (grid) => {
  let updatedGrid = { ...grid };
  Object.keys(updatedGrid).forEach((coord) => {
    updatedGrid[coord].state = "wall";
  });
  return {
    type: "UPDATE_GRID",
    payload: { updatedGrid: updatedGrid },
  };
};

export const recursiveBackTrackStartEnd = (unVisitArray, grid) => {
  unVisitArray.sort((a, b) => {
    return calculateDistance("1,1", a) - calculateDistance("1,1", b);
  });
  let startCoord = unVisitArray[0];
  let endCoord = unVisitArray[unVisitArray.length - 1];
  let updatedGrid = { ...grid };
  for (let i = 0; i < unVisitArray.length; i++) {
    updatedGrid[unVisitArray[i]].state = "unvisited";
  }
  updatedGrid[startCoord].state = "start";
  updatedGrid[endCoord].state = "end";

  return {
    type: "UPDATE_STARTEND",
    payload: {
      updatedGrid: updatedGrid,
      start: startCoord,
      end: endCoord,
    },
  };
};

export const mousedown = (key = null) => {
  if (key === null) {
    return {
      type: "SET_MOUSEDOWN",
    };
  } else if (key === "start") {
    return {
      type: "SET_STARTMOUSEDOWN",
    };
  } else if (key === "end") {
    return {
      type: "SET_ENDMOUSEDOWN",
    };
  }
};

export const mouseup = () => {
  return {
    type: "SET_MOUSEUP",
  };
};

export const mouseCoord = (coord) => {
  return {
    type: "UPDATE_CURRENTCOORD",
    payload: { coord: coord },
  };
};

export const selectPathFindingAlgo = (method) => {
  return {
    type: "UPDATE_PATHFINDING_METHOD",
    payload: {
      method: method,
    },
  };
};

export const visualise = (
  method,
  board,
  startCoord,
  endCoord,
  numCol,
  numRow
) => {
  let grid = _.cloneDeep(board);
  const shortestPath = pathFinding(
    method,
    grid,
    startCoord,
    endCoord,
    numCol,
    numRow
  );
  return {
    type: "FIND_PATH",
    payload: {
      path: shortestPath[0],
      visitTimeline: shortestPath[1],
    },
  };
};

export const deleteKeyDown = (key) => {
  if (key === "d") {
    return {
      type: "DELETE_KEY_DOWN",
    };
  }
};

export const deleteKeyUp = () => {
  return {
    type: "DELETE_KEY_UP",
  };
};

export const toggleInteraction = () => {
  return {
    type: "TOGGLE_INTERACTION",
  };
};

export const toggleSolved = (isSolved = true) => {
  return {
    type: "TOGGLE_SOLVED",
    payload: isSolved,
  };
};
