import * as c from '../../actions/ActionTypes';
import kegListReducer from '../../reducers/keg-list-reducer';

describe('kegListReducer', () => {
  let action;

  const kegData = {
    name: 'Nectarine Premiere',
    brand: 'de Garde Brewing',
    price: '7',
    alcoholContent: '7.10',
    pintCount: 124,
    id: 1
  };

  const currentState = {
    1: {
      name: 'Nectarine Premiere',
      brand: 'de Garde Brewing',
      price: '7',
      alcoholContent: '7.10',
      pintCount: 124,
      id: 1
    },
    2: {
      name: 'The Abyss',
      brand: 'Deschutes Brewery',
      price: '9',
      alcoholContent: '11.40',
      pintCount: 124,
      id: 2
    }
  };

  test('Should return default state if there is no action type passed into the reducer', () => {
    expect(kegListReducer({}, { type: null })).toEqual({});
  });

  test('Should successfully delete a keg', () => {
    action = {
      type: c.DELETE_KEG,
      id: 1
    };
    
    expect(kegListReducer(currentState, action)).toEqual({
      2: {
        name: 'The Abyss',
        brand: 'Deschutes Brewery',
        price: '9',
        alcoholContent: '11.40',
        pintCount: 124,
        id: 2
      }
    });
  });
});
