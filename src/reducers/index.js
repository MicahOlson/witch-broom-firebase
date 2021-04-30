import { combineReducers } from 'redux';
import editingReducer from './editing-reducer';
import formVisibleReducer from './form-visible-reducer';
import kegListReducer from './keg-list-reducer';
import selectedKegReducer from './selected-keg-reducer';

const rootReducer = combineReducers({
  editing: editingReducer,
  formVisibleOnPage: formVisibleReducer,
  mainKegList: kegListReducer,
  selectedKeg: selectedKegReducer
});

export default rootReducer;
