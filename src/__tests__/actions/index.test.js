import * as actions from './../../actions';

describe('tap room actions', () => {
  it('deleteKeg should create DELETE_KEG action', () => {
    expect(actions.deleteKeg(1)).toEqual({
      type: 'DELETE_KEG',
      id: 1
    });
  });

  it('toggleForm should create TOGGLE_FORM action', () => {
    expect(actions.toggleForm()).toEqual({
      type: 'TOGGLE_FORM'
    });
  });

  it('addKeg should create ADD_KEG action', () => {
    expect(actions.addKeg({
      name: 'Nectarine Premiere',
      brand: 'de Garde Brewing',
      price: '7',
      alcoholContent: '7.10',
      pintCount: 124,
      id: 1
    })).toEqual({
      type: 'ADD_KEG',
      name: 'Nectarine Premiere',
      brand: 'de Garde Brewing',
      price: '7',
      alcoholContent: '7.10',
      pintCount: 124,
      id: 1
    });
  });

  it('setEditing should create SET_EDITING action', () => {
    expect(actions.setEditing(true)).toEqual({
      type: 'SET_EDITING',
      editing: true
    });
  });

  it('setSelected should create SET_SELECTED action', () => {
    expect(actions.setSelected({
      name: 'Nectarine Premiere',
      brand: 'de Garde Brewing',
      price: '7',
      alcoholContent: '7.10',
      pintCount: 124,
      id: 1
    })).toEqual({
      type: 'SET_SELECTED',
      name: 'Nectarine Premiere',
      brand: 'de Garde Brewing',
      price: '7',
      alcoholContent: '7.10',
      pintCount: 124,
      id: 1
    });
  });

  it('nullSelected should create NULL_SELECTED action', () => {
    expect(actions.nullSelected()).toEqual({
      type: 'NULL_SELECTED'
    });
  });
});
