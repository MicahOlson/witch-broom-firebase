export default (state=false, action) => {
  const { editing } = action;
  switch (action.type) {
  case 'TOGGLE_EDIT':
    return !state;
  case 'SET_EDIT':
    return editing;
  default:
    return state;
  }
};
