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

export default function PracticeView () {
  return (
    <Layout className='layout'>
      <Header />
      <LayoutContent>
        <Title level={1}>Practice</Title>
        <Wrapper>
          ...
        </Wrapper>
      </LayoutContent>
      <Footer />
    </Layout>
  )
}
