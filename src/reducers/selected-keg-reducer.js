export default (state=null, action) => {
  const { name, brand, price, alcoholContent, pintCount, id } = action;
  switch (action.type) {
  case 'SET_SELECTED':
    return Object.assign({}, state, {
      name: name,
      brand: brand,
      price: price,
      alcoholContent: alcoholContent,
      pintCount: pintCount,
      id: id
    });
  case 'NULL_SELECTED':
    return null;
  default:
    return state;
  }
};
