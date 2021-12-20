import React from 'react'
import PropTypes from 'prop-types'
import { hot } from 'react-hot-loader'
import { inject, observer } from 'mobx-react'

import * as styles from './App.vw.less'
import Sentry from '@/service/sentry'

@hot(module)
@inject('homeStore')
@observer
class App extends React.Component {
  static propTypes = {
    homeStore: PropTypes.object.isRequired,
    children: PropTypes.any,
  }

  constructor () {
    super()
    this.state = {
    }
  }

  render () {
    return (
      <div className={styles.home}>
        {this.props.homeStore.hello}
      </div>
    )
  }
}

export default App
