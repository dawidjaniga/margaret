import React, { Component } from 'react'
import { Layout, Typography, Spin, Button, List, Progress } from 'antd'
import styled from 'styled-components'
import axios from 'axios'
import Combokeys from 'combokeys'
import LayoutContent from '../../components/LayoutContent'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Word from '../../components/Word'

const { Title } = Typography

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: baseline;
`

const ChartWrapper = styled.div`
  margin: 5%;
`

const NextButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const CurrentWordWrapper = styled.div`
  width: 100%;
`

const CorrectAnswersRatioWrapper = styled.div`
  width: 100%;
  text-align: center;
  margin: 5%;
`

const WordListHeader = styled.h3`
  text-align: center;
`

const WordListWrapper = styled.div`
  width: 45%;
  margin: 0 2.5%;
`

const APP_URL = process.env.APP_URL

export default class PracticeView extends Component {
  constructor (props) {
    super(props)
    this.state = {
      chartData: [],
      correctAnswers: [],
      incorrectAnswers: []
    }
  }

  componentDidMount () {
    if (!this.state.wordsDownloaded) {
      this.loadWords()
    }
  }

  loadWords () {
    this.setState({
      showLoader: true
    })

    axios
      .get(`${APP_URL}/words?filter[level]=difficult`)
      .then(response => {
        setTimeout(() => {
          this.setState(
            {
              words: response.data,
              wordsDownloaded: true,
              showLoader: false
            },
            this.selectNextWord
          )
        }, 200)
      })
      .catch(err => {
        this.setState({
          showLoader: false
        })
        console.error(err)
      })
  }

  render () {
    const {
      correctAnswers,
      incorrectAnswers
    } = this.state

    return (
      <Layout className='layout'>
        <Header />
        <LayoutContent>
          <Title level={1}>Progress</Title>
          <ChartWrapper />
          <Wrapper>
            {this.state.showLoader && <Spin />}
            <CurrentWordWrapper />
            <WordListWrapper>
              <List
                header={
                  <WordListHeader>✅ {correctAnswers.length}</WordListHeader>
                }
                dataSource={correctAnswers}
                renderItem={item => <List.Item>{item}</List.Item>}
              />
            </WordListWrapper>
            <WordListWrapper>
              <List
                header={
                  <WordListHeader>❌ {incorrectAnswers.length}</WordListHeader>
                }
                dataSource={incorrectAnswers}
                renderItem={item => <List.Item>{item}</List.Item>}
              />
            </WordListWrapper>
          </Wrapper>
        </LayoutContent>
        <Footer />
      </Layout>
    )
  }
}
