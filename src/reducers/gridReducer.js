let init_grid = { "0,0": { state: "init", distance: Infinity, path: [] } };
export default (
  state = { numCol: 0, numRow: 0, grid: init_grid, start: null, end: null },
  action
) => {
  switch (action.type) {
    case "FETCH_GRID":
    case "RESET_GRID":
      return {
        numCol: action.payload.numCol,
        numRow: action.payload.numRow,
        grid: action.payload.grid,
        start: action.payload.start,
        end: action.payload.end,
      };
    case "ADD_WALL":
    case "DELETE_WALL":
      return {
        numCol: state.numCol,
        numRow: state.numRow,
        grid: action.payload.updatedGrid,
        start: state.start,
        end: state.end,
      };

    case "UPDATE_START":
      return {
        numCol: state.numCol,
        numRow: state.numRow,
        grid: action.payload.updatedGrid,
        start: action.payload.start,
        end: state.end,
      };
    case "UPDATE_END":
      return {
        numCol: state.numCol,
        numRow: state.numRow,
        grid: action.payload.updatedGrid,
        end: action.payload.end,
        start: state.start,
      };
    case "ADD_PATHTOGRID":
    case "ADD_VISITTOGRID":
    case "ADD_MAZEWALL":
      return {
        numCol: state.numCol,
        numRow: state.numRow,
        grid: action.payload.updatedGrid,
        start: state.start,
        end: state.end,
      };

    default:
      return state;
  }
};
