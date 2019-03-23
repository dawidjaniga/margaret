/* global location */
import React from 'react'

export default class Log extends React.Component {
  componentDidMount () {
    const parsed = location.search.match(/^\?token=(.*)/)
    window.opener.postMessage(parsed[1])
    window.close()
  }

  render () {
    return null
  }
}
