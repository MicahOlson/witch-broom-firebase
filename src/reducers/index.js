import { combineReducers } from 'redux';
import editingReducer from './editing-reducer';
import formVisibleReducer from './form-visible-reducer';
import kegListReducer from './keg-list-reducer';

const rootReducer = combineReducers({
  editing: editingReducer,
  formVisibleOnPage: formVisibleReducer,
  mainKegList: kegListReducer
});

export default rootReducer;
