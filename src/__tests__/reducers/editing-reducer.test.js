import editingReducer from '../../reducers/editing-reducer';

describe("editingReducer", () => {
  test('Should return default state if no action type is recognized', () => {
    expect(editingReducer(false, { type: null })).toEqual(false);
  });

  test('Should toggle editing state to true', () => {
    expect(editingReducer(false, { type: 'TOGGLE_EDIT' })).toEqual(true);
  });

  test('Should successfully set state to true', () => {
    expect(editingReducer(false, { type: 'SET_EDIT', editing: true })).toEqual(true);
  });
});
