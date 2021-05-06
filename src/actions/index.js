export const deleteKeg = id => ({
  type: 'DELETE_KEG',
  id
});

export const toggleForm = () => ({
  type: 'TOGGLE_FORM'
});

export const setEditing = setTo => ({
    type: 'SET_EDITING',
    editing: setTo
});

export const setSelected = (keg) => {
  const { name, brand, price, alcoholContent, pintCount, id } = keg;
  return {
    type: 'SET_SELECTED',
    name: name,
    brand: brand,
    price: price,
    alcoholContent: alcoholContent,
    pintCount: pintCount,
    id: id
  }
};

export const nullSelected = () => ({
  type: 'NULL_SELECTED'
});
