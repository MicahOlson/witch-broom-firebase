import { createStore } from 'redux';
import editingReducer from '../../reducers/editing-reducer';
import formVisibleReducer from '../../reducers/form-visible-reducer';
import kegListReducer from '../../reducers/keg-list-reducer';
import rootReducer from '../../reducers/index';

let store = createStore(rootReducer);

describe("rootReducer", () => {
  test('Should return default state if no action type is recognized', () => {
    expect(rootReducer({}, { type: null })).toEqual({
      editing: false,
      formVisibleOnPage: false,
      mainKegList: {}
    });
  });

  test('Check that initial state of editing matches root reducer', () => {
    expect(store.getState().editing).toEqual(editingReducer(undefined, { type: null }));
  });

  test('Check that initial state of formVisibleReducer matches root reducer', () => {
    expect(store.getState().formVisibleOnPage).toEqual(formVisibleReducer(undefined, { type: null }));
  });

  test('Check that initial state of kegListReducer matches root reducer', () => {
    expect(store.getState().mainKegList).toEqual(kegListReducer(undefined, { type: null }));
  });
  
  test('Check that ADD_KEG action works for kegListReducer and root reducer', () => {
    const action = {
      type: 'ADD_KEG',
      name: 'Nectarine Premiere',
      brand: 'de Garde Brewing',
      price: '7',
      alcoholContent: '7.10',
      pintCount: 124,
      id: 1
    }
    store.dispatch(action);
    expect(store.getState().mainKegList).toEqual(kegListReducer(undefined, action));
  });

  test('Check that TOGGLE_FORM action works for formVisibleReducer and root reducer', () => {
    const action = {
      type: 'TOGGLE_FORM'
    }
    store.dispatch(action);
    expect(store.getState().formVisibleOnPage).toEqual(formVisibleReducer(undefined, action));
  });

  test('Check that TOGGLE_EDIT action works for editingReducer and root reducer', () => {
    const action = {
      type: 'TOGGLE_EDIT'
    }
    store.dispatch(action);
    expect(store.getState().editing).toEqual(editingReducer(undefined, action));
  });
});
