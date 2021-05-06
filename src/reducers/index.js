import { combineReducers } from 'redux';
import editingReducer from './editing-reducer';
import formVisibleReducer from './form-visible-reducer';
import kegListReducer from './keg-list-reducer';
import selectedKegReducer from './selected-keg-reducer';
import { firestoreReducer } from 'redux-firestore';

const rootReducer = combineReducers({
  editing: editingReducer,
  formVisibleOnPage: formVisibleReducer,
  mainKegList: kegListReducer,
  selectedKeg: selectedKegReducer,
  firestore: firestoreReducer
});
console.log(firestoreReducer);
export default rootReducer;
