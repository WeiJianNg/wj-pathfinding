export default (state = [], action) => {
  switch (action.type) {
    case "UPDATE_MAZE_TIMELINE":
      return action.payload.mazeTimeline;
    default:
      return state;
  }
};
