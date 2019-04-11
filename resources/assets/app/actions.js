/* global localStorage */
import axios from 'axios'

export function setupAxios () {
  const bearer = localStorage.getItem('bearer') || ''
  axios.defaults.headers.common = {
    'Authorization': `bearer ${bearer}`
  }
}
