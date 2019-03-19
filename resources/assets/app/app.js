import React, { Component } from 'react'
import { hot } from 'react-hot-loader/root'

import 'antd/dist/antd.css'
import LoginView from './views/login/login'

class App extends Component {
  render () {
    return <LoginView />
  }
}

export default hot(App)
