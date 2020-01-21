import React from 'react'
import { Base } from '../../src/index'

const base = new Base()

class Debug extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      currentPage: 'start',
    }
  }

  componentDidMount () {
    console.log(base)
  }

  render () {
    return <div>
      <Button onClick={() => {}}>TEST CLICK EVENT</Button>
    </div>
  }
}
export default Debug
