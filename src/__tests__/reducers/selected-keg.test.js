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

  test('Should successfully return selected keg from mainKegList', () => {
    const { name, brand, price, alcoholContent, pintCount, id } = kegData;
    action = {
      type: 'GET_KEG',
      name: name,
      brand: brand,
      price: price,
      alcoholContent: alcoholContent,
      pintCount: pintCount,
      id: id
    };

    expect(selectedKegReducer({}, action)).toEqual({
      [id]: {
        name: name,
        brand: brand,
        price: price,
        alcoholContent: alcoholContent,
        pintCount: pintCount,
        id: id
      }
    });
  });
});
