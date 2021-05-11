import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './Header';
import KegControl from './KegControl';
import Signin from './Signin';

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path='/signin'>
          <Signin />
        </Route>
        <Route path='/'>
          <KegControl />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
