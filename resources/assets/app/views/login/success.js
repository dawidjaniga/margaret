/* global location */
import React from 'react'
import { LOGIN_SUCCESS_SET_BEARER } from './constants'

export default class Log extends React.Component {
  componentDidMount () {
    const parsed = location.search.match(/^\?token=(.*)/)
    window.opener.postMessage({
      type: LOGIN_SUCCESS_SET_BEARER,
      payload: {
        bearer: parsed[1]
      }
    })
    window.close()
  }

  render () {
    return null
  }
}
