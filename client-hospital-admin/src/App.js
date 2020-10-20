import React from 'react';
import { Provider } from 'react-redux'
import store from './store/index'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Home, Login, Welcome } from './pages'
import ProtectedRoute from '../src/components/ProtectedRoute'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <ProtectedRoute exact path="/" component={Welcome}/>
          <Route path="/login" component={Login}/>
          <Route path="/:hospitalId" component={Home}/>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
