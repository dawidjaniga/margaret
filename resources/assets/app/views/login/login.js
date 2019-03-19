import React from 'react'
import { Layout, Typography } from 'antd'
import styled from 'styled-components'
import GoogleButton from 'react-google-button'
import LayoutContent from './../../components/LayoutContent'
import Header from './../../components/Header'
import Footer from './../../components/Footer'

const { Title } = Typography

const Wrapper = styled.div`
  max-width: 300px;
  margin: auto
`

export default function LoginView () {
  function redirectToGoogle () {
    window.location = 'http://127.0.0.1:3333/login/google'
  }

  return (
    <Layout className='layout'>
      <Header />
      <LayoutContent>
        <Title level={1}>Login</Title>
        <Wrapper>
          <GoogleButton onClick={redirectToGoogle} />
        </Wrapper>
      </LayoutContent>
      <Footer />
    </Layout>
  )
}
