import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { hot } from 'react-hot-loader/root'

import 'antd/dist/antd.css'
import LoginView from './views/login/login'

const domContainer = document.getElementById('app')

class App extends Component {
  render () {
    return <LoginView />
  }
}

ReactDOM.render(hot(<App />), domContainer)
