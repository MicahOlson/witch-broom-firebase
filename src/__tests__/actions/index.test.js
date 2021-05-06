import * as actions from './../../actions';
import * as c from '../../actions/ActionTypes';

describe('tap room actions', () => {
  it('deleteKeg should create DELETE_KEG action', () => {
    expect(actions.deleteKeg(1)).toEqual({
      type: c.DELETE_KEG,
      id: 1
    });
  });

  it('toggleForm should create TOGGLE_FORM action', () => {
    expect(actions.toggleForm()).toEqual({
      type: c.TOGGLE_FORM
    });
  });

  it('setEditing should create SET_EDITING action', () => {
    expect(actions.setEditing(true)).toEqual({
      type: c.SET_EDITING,
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
      type: c.SET_SELECTED,
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
      type: c.NULL_SELECTED
    });
  });
});
