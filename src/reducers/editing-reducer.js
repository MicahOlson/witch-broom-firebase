import * as c from './../actions/ActionTypes';

export default (state=false, action) => {
  const { editing } = action;
  switch (action.type) {
  case c.SET_EDITING:
    return editing;
  default:
    return state;
  }
};
