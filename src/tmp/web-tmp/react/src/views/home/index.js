import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, Switch, Redirect } from 'react-router-dom'
import { Provider } from 'mobx-react'
import createBrowserHistory from 'history/createBrowserHistory'

import App from './App'

import stores from './store'

require('@/service/sentry')

const history = createBrowserHistory()

ReactDOM.render(
  <Provider {...stores}>
    <Router history={history}>
      <Switch>
        <Route path="/home" exact component={App}/>
      </Switch>
    </Router>
  </Provider>,
  document.querySelector('#app'))
