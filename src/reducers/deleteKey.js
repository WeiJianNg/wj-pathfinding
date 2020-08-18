export default (state = false, action) => {
  switch (action.type) {
    case "DELETE_KEY_DOWN":
      return true;
    case "DELETE_KEY_UP":
      return false;
    default:
      return state;
  }
};
