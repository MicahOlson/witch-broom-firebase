import editingReducer from '../../reducers/editing-reducer';

describe("editingReducer", () => {
  test('Should return default state if no action type is recognized', () => {
    expect(editingReducer(false, { type: null })).toEqual(false);
  });
});
