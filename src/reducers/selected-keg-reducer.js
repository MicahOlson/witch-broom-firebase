export default (state=null, action) => {
  const { name, brand, price, alcoholContent, pintCount, id } = action;
  switch (action.type) {
  case 'GET_KEG':
    return Object.assign({}, state, {
      [id]: {
        name: name,
        brand: brand,
        price: price,
        alcoholContent: alcoholContent,
        pintCount: pintCount,
        id: id
      }
    });
  default:
    return state;
  }  
};
