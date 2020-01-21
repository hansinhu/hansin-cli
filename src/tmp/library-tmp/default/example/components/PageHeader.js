import React from 'react'
import PropTypes from 'prop-types'

class PageHeader extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      currentPage: 1,
    }
  }
  render () {
    return <header className='header'>
      <div className='header-logo'>cf-front-utils</div>
      <div className='header-menu'>
        <span className='link_item' onClick={() => { window.scrollTo(0, 1000) }}>API</span>
        <a className='link_item' target='_blanck' href='https://bitbucket.org/clubfactory/cf-front-utils/src'>Bitbucket</a>
      </div>
    </header>
  }
}

export default PageHeader
