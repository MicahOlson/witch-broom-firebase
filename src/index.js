import React from 'react';
import ReactDOM from 'react-dom';
import firebase from './firebase';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { createFirestoreInstance } from 'redux-firestore';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import './index.css';
import App from './components/App';
import rootReducer from './reducers/index';

const store = createStore(rootReducer);

const rrfProps = {
  firebase,
  config: {
    userProfile: "users"
  },
  dispatch: store.dispatch,
  createFirestoreInstance
}

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <App />
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById('root')
);
