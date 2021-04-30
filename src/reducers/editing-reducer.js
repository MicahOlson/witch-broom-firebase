export default (state=false, action) => {
  const { editing } = action;
  switch (action.type) {
  case 'SET_EDITING':
    return editing;
  default:
    return state;
  }
};
