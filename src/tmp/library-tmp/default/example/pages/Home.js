import React from 'react'
import { withRouter } from 'react-router-dom';
import { initHighlightingOnLoad } from 'highlight.js'
import 'highlight.js/styles/vs2015.css';
import './Home.less'

@withRouter
class Home extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      currentPage: 'start',
    }
  }

  menuItemClick = (pathname) => {
    this.setState({
      currentPage: this.state.currentPage === pathname ? false : pathname,
    })
  }

  componentDidMount () {
    initHighlightingOnLoad()
  }

  render () {
    return <div className='home-main'>
      <div className='home-left'>
        haha
      </div>
      <div className='home-right'>
      </div>
    </div>
  }
}
export default Home
