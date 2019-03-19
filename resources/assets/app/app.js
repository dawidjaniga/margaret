import React, { Component } from 'react'
import LoginView from './views/login/login'
import { hot } from 'react-hot-loader/root'

class App extends Component {
  render () {
    return <LoginView />
  }
}

export default hot(App)
