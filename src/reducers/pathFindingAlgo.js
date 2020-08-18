export default (state = null, action) => {
  switch (action.type) {
    case "UPDATE_PATHFINDING_METHOD":
      return action.payload.method;
    default:
      return state;
  }
};
