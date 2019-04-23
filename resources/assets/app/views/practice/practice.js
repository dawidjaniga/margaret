import React, { Component } from 'react'
import { Layout, Typography, Spin, Button } from 'antd'
import styled from 'styled-components'
import axios from 'axios'
import LayoutContent from '../../components/LayoutContent'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Word from '../../components/Word'

const { Title } = Typography

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const NextButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const APP_URL = process.env.APP_URL

export default class PracticeView extends Component {
  constructor (props) {
    super(props)
    this.state = {
      words: [],
      currentWord: undefined,
      wordsDownloaded: false,
      showLoader: true,
      answeredSyllable: 0,
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

    axios.get(`${APP_URL}/words`)
      .then(response => {
        setTimeout(() => {
          this.setState({
            words: response.data,
            wordsDownloaded: true,
            showLoader: false
          },
          this.selectNextWord)
        }, 200)
      })
      .catch(err => {
        this.setState({
          showLoader: false
        })
        console.error(err)
      })
  }

  saveAnswer () {
    // this.setState({
    //   showLoader: true
    // })
    const { currentWord, answeredSyllable } = this.state

    axios.post(`${APP_URL}/answers`, {
      wordId: currentWord.id,
      answeredSyllable
    })
      .then(response => {
        console.log('response:', response)
        // this.setState({
        // })
      })
      .catch(err => {
        console.error(err)
      })
    }
  
  onClickNext = () => {
    this.setState(
      {
        answeredSyllable: 0,
      },
      this.selectNextWord
      )
  }

  selectNextWord() {
    const words = this.state.words
    const nextWord = words.shift()
    console.log('words:', words)

    this.setState({
      words,
      currentWord: nextWord
    })
  }

  

  onClickWord = (answeredSyllable) => {
    this.setState(
      {
        answeredSyllable
      },
      this.saveAnswer
    )
  }

  render () {
    const { currentWord, answeredSyllable } = this.state
    const syllableToHighlight = answeredSyllable

    return (
      <Layout className='layout'>
        <Header />
        <LayoutContent>
          <Title level={1}>Practice</Title>
          <NextButtonWrapper>
            <Button type="primary" icon="double-right" onClick={this.onClickNext}>Next</Button>
          </NextButtonWrapper>
          <Wrapper>
            {this.state.showLoader && <Spin />}
            {currentWord &&
            <Word
              syllables={currentWord.syllables}
              stressedSyllable={currentWord.stressed_syllable}
              answeredSyllable={answeredSyllable}
              speechPart={currentWord.speech_part}
              definition={currentWord.definition}
              ipa={currentWord.ipa}
              onClick={this.onClickWord}
            />
            }
          </Wrapper>
        </LayoutContent>
        <Footer />
      </Layout>
    )
  }
}
