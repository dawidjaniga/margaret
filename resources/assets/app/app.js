import React, { Component } from 'react'
import { hot } from 'react-hot-loader/root'

import Title from './components/Title'

class App extends Component {
  render () {
    return <Title>Margaret</Title>
  }
}

export default hot(App)
