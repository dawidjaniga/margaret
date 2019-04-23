import React from 'react'
import { Layout, Typography } from 'antd'
import styled from 'styled-components'
import LayoutContent from '../../components/LayoutContent'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

const { Title } = Typography
const Wrapper = styled.div`
  max-width: 300px;
  margin: auto
`

export default class HomeView extends React.Component {
  render () {
    return (
      <Layout className='layout'>
        <Header />
        <LayoutContent>
          <Title level={1}>Welcome to Maraget!</Title>
          <Wrapper>
          Learn English Wordstress
          </Wrapper>
        </LayoutContent>
        <Footer />
      </Layout>
    )
  }
}
