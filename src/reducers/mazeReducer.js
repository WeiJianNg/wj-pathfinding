export default (
  state = { recursiveDivision: [], recursiveBackTrack: [] },
  action
) => {
  switch (action.type) {
    case "UPDATE_MAZE_TIMELINE_DIV":
      return {
        recursiveDivision: action.payload.mazeTimeline,
        recursiveBackTrack: state.recursiveBackTrack,
      };
    case "UPDATE_MAZE_TIMELINE_BACK":
      return {
        recursiveDivision: state.recursiveDivision,
        recursiveBackTrack: action.payload.unVisitTimeline,
      };
    default:
      return state;
  }
};
