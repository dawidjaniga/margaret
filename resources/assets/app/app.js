import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import HomeView from './views/home/home'
import LoginView from './views/login/login'
import LoginSuccessView from './views/login/success'
import RulesView from './views/rules/rules'
import PracticeView from './views/practice/practice'
import ProgressView from './views/progress/progress'
import { Provider, connect } from 'react-redux'
import { createStore, combineReducers } from 'redux'
import { createReducer } from 'redux-create-reducer'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { PersistGate } from 'redux-persist/integration/react'
import { setupAxios } from './actions'
import { hot } from 'react-hot-loader/root'

const initialState = {
  bearer: ''
}
const ActionTypes = {
  SET_BEARER: 'SET_BEARER',
  SET_UI: 'SET_UI'
}

const app = createReducer(initialState, {
  [ActionTypes.SET_BEARER] (state, action) {
    const { bearer } = action
    return {
      ...state,
      bearer
    }
  }
})

const ui = createReducer({ ui: '' }, {
  [ActionTypes.SET_UI] (state, action) {
    const { ui } = action
    return {
      ...state,
      ui
    }
  }
})

const persistConfig = {
  key: 'root',
  debug: true,
  storage
}

const persistedReducer = persistReducer(persistConfig, app)

const reducers = combineReducers({
  persist: persistedReducer,
  ui
})

const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

let persistor = persistStore(store)

class App extends Component {
  componentWillMount () {
    setupAxios()
  }

  render () {
    return (

      <Router>
        <Route path='/' exact component={HomeView} />
        <Route path='/login' exact component={LoginView} />
        <Route path='/login-success' exact component={LoginSuccessView} />
        <Route path='/rules' exact component={RulesView} />
        <Route path='/practice' exact component={PracticeView} />
        <Route path='/progress' exact component={ProgressView} />
      </Router>

    )
  }
}
const ConnectedApp = connect(state => {
  return {
    bearer: state.persist.bearer
  }
})(App)

const ReduxProvider = function ({ children }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ConnectedApp />
      </PersistGate>
    </Provider>
  )
}

export default hot(ReduxProvider)
