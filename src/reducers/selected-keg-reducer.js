import * as c from './../actions/ActionTypes';

export default (state=null, action) => {
  const { name, brand, price, alcoholContent, pintCount, id } = action;
  switch (action.type) {
  case c.SET_SELECTED:
    return Object.assign({}, state, {
      name: name,
      brand: brand,
      price: price,
      alcoholContent: alcoholContent,
      pintCount: pintCount,
      id: id
    });
  case c.NULL_SELECTED:
    return null;
  default:
    return state;
  }
};
