import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/workflowy.css';
import {HashRouter as Router, Route, Link, Switch, Redirect, HashRouter} from 'react-router-dom';
import {createHashHistory} from 'history';
import DashBoard from './components/Login/Login';
import MainTasks from './components/tasks/MainTasks';
import TaskDetails from './components/tasks/TaskDetails'
import { createBrowserHistory } from 'history';

import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';

const history = createBrowserHistory()
const client = new ApolloClient({
  uri : "http://localhost:3000/graphql",
  cache : new InMemoryCache()
})

ReactDOM.render(
  <React.Fragment>
    <ApolloProvider client={client}>
      <HashRouter history={history} basename='/'>
        <Switch>
          <Route path='/login' component={DashBoard}></Route>
          <Route path="/main" component={MainTasks}></Route>
          <Route path='/subTask/:id' component={TaskDetails}></Route>
          <Redirect to="/login"></Redirect>
        </Switch>
      </HashRouter>
    </ApolloProvider>
  </React.Fragment>,
  document.getElementById('root')
);
