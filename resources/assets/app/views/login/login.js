/* global screen, localStorage */
import React from 'react'
import { Layout, Typography } from 'antd'
import styled from 'styled-components'
import GoogleButton from 'react-google-button'
import LayoutContent from './../../components/LayoutContent'
import Header from './../../components/Header'
import Footer from './../../components/Footer'
import { connect } from 'react-redux'
import { setupAxios } from '../../actions'
import { LOGIN_SUCCESS_SET_BEARER } from './constants'

const { Title } = Typography
const Wrapper = styled.div`
  max-width: 300px;
  margin: auto
`

export default class LoginView extends React.Component {
  componentDidMount () {
    this.messageHandler = window.addEventListener('message', this.receiveMessage, false)
  }

  componentWillUnmount () {
    window.removeEventListener('message', this.messageHandler)
  }

  openGoogleSignIn = () => {
    const url = 'http://127.0.0.1:3333/login/google?redirectUrl=http://localhost:9000/login-success'
    const target = '_blank'
    const width = 350
    const height = 600
    const left = (screen.width - width) / 2
    const top = (screen.height - height) / 4
    const features = `width=${width}, height==${height}, top==${top}, left==${left}`
    return window.open(url, target, features)
  }

  receiveMessage = event => {
    const { type, payload } = event.data
    
    if (event.origin === window.origin && type === LOGIN_SUCCESS_SET_BEARER) {
      this.setApiBearer(payload.bearer)
      setupAxios()
    }
  }
  
  setApiBearer = bearer => {
    localStorage.setItem('bearer', bearer)
  }

  render () {
    return (
      <Layout className='layout'>
        <Header />
        <LayoutContent>
          <Title level={1}>Login</Title>
          <Wrapper>
            <GoogleButton onClick={this.openGoogleSignIn} />
          </Wrapper>
        </LayoutContent>
        <Footer />
      </Layout>
    )
  }
}