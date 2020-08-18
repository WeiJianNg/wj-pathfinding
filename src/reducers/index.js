import { combineReducers } from "redux";

import Grid from "./gridReducer";
import Mouse from "./mouseReducer";
import ShortestPath from "./pathReducer";
import DeleteKey from "./deleteKey";
import interactionReducer from "./interactionReducer";
import pathFindingAlgo from "./pathFindingAlgo";
import MazeTimeline from "./mazeReducer";

export default combineReducers({
  grid: Grid,
  isMouseDown: Mouse,
  shortestPath: ShortestPath,
  deleteKey: DeleteKey,
  process: interactionReducer,
  pathFindingAlgo: pathFindingAlgo,
  mazeTimeline: MazeTimeline,
});
