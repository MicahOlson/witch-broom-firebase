import selectedKegReducer from '../../reducers/selected-keg-reducer';

describe('selectedKegReducer', () => {
  let action;

  const kegData = {
    name: 'Nectarine Premiere',
    brand: 'de Garde Brewing',
    price: '7',
    alcoholContent: '7.10',
    pintCount: 124,
    id: 1
  };

  test('Should return default state if there is no action type passed into the reducer', () => {
    expect(selectedKegReducer(undefined, { type: null })).toEqual(null);
  });

  test('Should successfully set selected keg', () => {
    const { name, brand, price, alcoholContent, pintCount, id } = kegData;
    action = {
      type: 'SET_SELECTED',
      name: name,
      brand: brand,
      price: price,
      alcoholContent: alcoholContent,
      pintCount: pintCount,
      id: id
    };

    expect(selectedKegReducer({}, action)).toEqual({
      name: name,
      brand: brand,
      price: price,
      alcoholContent: alcoholContent,
      pintCount: pintCount,
      id: id
    });
  });

  test('Should successfully reset selected keg to null', () => {
    action = {
      type: 'NULL_SELECTED',
    };

    expect(selectedKegReducer({}, action)).toEqual(null);
  });
});
