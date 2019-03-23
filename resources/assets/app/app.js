/* global localStorage */
import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import LoginView from './views/login/login'
import LoginSuccessView from './views/login/success'
import PracticeView from './views/practice/practice'
import axios from 'axios'

import { hot } from 'react-hot-loader/root'
const bearer = localStorage.getItem('bearer')
axios.defaults.headers.common = {
  'Authorization': `bearer ${bearer}`
}

class App extends Component {
  render () {
    return (
      <Router>
        <Route path='/login' exact component={LoginView} />
        <Route path='/login-success' exact component={LoginSuccessView} />
        <Route path='/practice' exact component={PracticeView} />
      </Router>
    )
  }
}

export default hot(App)
