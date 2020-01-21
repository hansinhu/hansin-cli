import React from 'react';
import ReactDOM from 'react-dom'
import { Router, Route, Switch } from 'react-router-dom'
import { createHashHistory } from 'history'
// 样式全部引入了
import './styles/index.less'

import PageHeader from './components/PageHeader'

import routes from './routes'

ReactDOM.render(
  <Router history={createHashHistory()}>
    <div>
      <PageHeader></PageHeader>
      <main className='main'>
        <div className='page-container'>
          <Switch>
            {
              routes.map(route => {
                return <Route
                  exact
                  path={route.pathname}
                  key={route.pathname}
                  component={route.component}
                />
              })
            }
          </Switch>
        </div>
      </main>
    </div>
  </Router>,
  document.querySelector('#root'),
  () => {console.log('init page')},
)
