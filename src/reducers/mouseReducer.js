export default (
  state = { mousedown: false, startMouseDown: false, endMouseDown: false },
  action
) => {
  switch (action.type) {
    case "SET_MOUSEDOWN":
      return {
        mousedown: true,
        startMouseDown: false,
        endMouseDown: false,
      };
    case "SET_STARTMOUSEDOWN":
      return {
        mousedown: false,
        startMouseDown: true,
        endMouseDown: false,
      };
    case "SET_ENDMOUSEDOWN":
      return {
        mousedown: false,
        startMouseDown: false,
        endMouseDown: true,
      };
    case "SET_MOUSEUP":
      return {
        mousedown: false,
        startMouseDown: false,
        endMouseDown: false,
      };
    default:
      return state;
  }
};
