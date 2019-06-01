import React from 'react'
import { Layout, Button, Typography } from 'antd'
import styled from 'styled-components'
import LayoutContent from '../../components/LayoutContent'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import HelloBackground from '../../assets/images/brooke-cagle-609873-unsplash.jpg'

const { Title } = Typography
const Wrapper = styled.div`
  max-width: 300px;
  margin: auto
`

const Hello = styled.div`
height: 100vh;
position: relative;
align-items: center;
justify-content: center;
display: flex;
text-align: center;

&::before {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  content: '';
  background: url(${HelloBackground}) top center / cover;
  filter: brightness(0.5);
}
`
const HelloContent = styled.div`
position: relative;
width: 50vw;
`

const HelloTitle = styled(Title)`
&& {
  color: #fff;
  margin-bottom: 1em;
}
`

export default class HomeView extends React.Component {
  render () {
    return (
      <Layout>
        <Header />
        <Hello>
          <HelloContent>
            <HelloTitle level={1}>Learn English Wordstress</HelloTitle>
            <Wrapper>
              <Button type='primary' size='large'>Get started</Button>
            </Wrapper>
          </HelloContent>
        </Hello>
        <Footer />
      </Layout>
    )
  }
}
