import { combineReducers } from 'redux';
import formVisibleReducer from './form-visible-reducer';
import kegListReducer from './keg-list-reducer';

const rootReducer = combineReducers({
  formVisibleOnPage: formVisibleReducer,
  mainKegList: kegListReducer
});

export default rootReducer;
