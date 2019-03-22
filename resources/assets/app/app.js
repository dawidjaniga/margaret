import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import LoginView from './views/login/login'
import PracticeView from './views/practice/practice'
import { hot } from 'react-hot-loader/root'

class App extends Component {
  render () {
    return (
      <Router>
        <Route path='/login' exact component={LoginView} />
        <Route path='/practice' exact component={PracticeView} />
      </Router>
    )
  }
}

export default hot(App)
