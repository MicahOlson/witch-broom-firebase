import { createStore } from 'redux';
import * as c from '../../actions/ActionTypes';
import editingReducer from '../../reducers/editing-reducer';
import formVisibleReducer from '../../reducers/form-visible-reducer';
import kegListReducer from '../../reducers/keg-list-reducer';
import selectedKegReducer from '../../reducers/selected-keg-reducer';
import rootReducer from '../../reducers/index';

let store = createStore(rootReducer);

describe("rootReducer", () => {
  let action;

  const kegData = {
    name: 'Nectarine Premiere',
    brand: 'de Garde Brewing',
    price: '7',
    alcoholContent: '7.10',
    pintCount: 124,
    id: 1
  };

  test('Should return default state if no action type is recognized', () => {
    expect(rootReducer({}, { type: null })).toEqual({
      editing: false,
      formVisibleOnPage: false,
      mainKegList: {},
      selectedKeg: null
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
  
  test('Check that initial state of selectedKegReducer matches root reducer', () => {
    expect(store.getState().selectedKeg).toEqual(selectedKegReducer(undefined, { type: null }));
  });

  test('Check that ADD_KEG action works for kegListReducer and root reducer', () => {
    const { name, brand, price, alcoholContent, pintCount, id } = kegData;
    action = {
      type: c.ADD_KEG,
      name: name,
      brand: brand,
      price: price,
      alcoholContent: alcoholContent,
      pintCount: pintCount,
      id: id
    }
    store.dispatch(action);
    expect(store.getState().mainKegList).toEqual(kegListReducer(undefined, action));
  });

  test('Check that TOGGLE_FORM action works for formVisibleReducer and root reducer', () => {
    action = {
      type: c.TOGGLE_FORM
    }
    store.dispatch(action);
    expect(store.getState().formVisibleOnPage).toEqual(formVisibleReducer(undefined, action));
  });

  test('Check that SET_EDITING action works for editingReducer and root reducer', () => {
    action = {
      type: c.SET_EDITING,
      editing: true
    }
    store.dispatch(action);
    expect(store.getState().editing).toEqual(editingReducer(undefined, action));
  });

  test('Check that SET_SELECTED action works for selectedKegReducer and root reducer', () => {
    const { name, brand, price, alcoholContent, pintCount, id } = kegData;
    action = {
      type: c.SET_SELECTED,
      name: name,
      brand: brand,
      price: price,
      alcoholContent: alcoholContent,
      pintCount: pintCount,
      id: id
    };
    store.dispatch(action);
    expect(store.getState().selectedKeg).toEqual(selectedKegReducer(undefined, action));
  });
});
