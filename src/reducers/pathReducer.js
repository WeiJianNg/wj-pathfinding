export default (state = { path: [], visitTimeline: [] }, action) => {
  switch (action.type) {
    case "FIND_PATH":
      return {
        path: action.payload.path,
        visitTimeline: action.payload.visitTimeline,
      };
    default:
      return state;
  }
};
