import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { hot } from 'react-hot-loader/root'

import Title from './components/Title'

const domContainer = document.getElementById('app')

class App extends Component {
  render () {
    return <Title>Margaret</Title>
  }
}

ReactDOM.render(hot(<App />), domContainer)
