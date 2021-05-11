import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import editingReducer from './editing-reducer';
import formVisibleReducer from './form-visible-reducer';
import selectedKegReducer from './selected-keg-reducer';

const rootReducer = combineReducers({
  editing: editingReducer,
  formVisibleOnPage: formVisibleReducer,
  selectedKeg: selectedKegReducer,
  firestore: firestoreReducer
});

export default rootReducer;
