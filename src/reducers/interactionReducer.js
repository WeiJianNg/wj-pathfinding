export default (state = { solved: false, running: false }, action) => {
  switch (action.type) {
    case "TOGGLE_INTERACTION":
      return { solved: state.solved, running: !state.running };
    case "TOGGLE_SOLVED":
      return { solved: action.payload, running: state.running };
    default:
      return state;
  }
};
