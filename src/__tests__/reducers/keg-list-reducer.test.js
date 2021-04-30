import kegListReducer from '../../reducers/keg-list-reducer';

describe('kegListReducer', () => {
  let action;
  const kegData = {
    name: 'Nectarine Premiere',
    brand: 'e Garde Brewing',
    price: '7',
    alcoholContent: '7.10',
    pintCount: 124,
    id: 1
  };

  test('Should return default state if there is no action type passed into the reducer', () => {
    expect(kegListReducer({}, { type: null })).toEqual({});
  });

  test('Should successfully add new keg data to mainKegList', () => {
    const { name, brand, price, alcoholContent, pintCount, id } = kegData;
    action = {
      type: 'ADD_KEG',
      name: name,
      brand: brand,
      price: price,
      alcoholContent: alcoholContent,
      pintCount: pintCount,
      id: id
    };

    expect(kegListReducer({}, action)).toEqual({
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
