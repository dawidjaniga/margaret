import React, { Component } from 'react'
import { Layout, Typography, Spin } from 'antd'
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
    if (!this.state.wordsDownloaded && !this.state.showLoader) {
      this.loadWords()
    }
  }

  loadWords () {
    this.setState({
      showLoader: true
    })

    axios.get('http://127.0.0.1:3333/words')
      .then(response => {
        setTimeout(() => {
          this.setState({
            words: response.data,
            currentWord: response.data[3],
            wordsDownloaded: true,
            showLoader: false
          })
        }, 2000)
      })
      .catch(err => {
        this.setState({
          showLoader: false
        })
        console.error(err)
      })
  }

  onClickWord = (answeredSyllable) => {
    this.setState({
      answeredSyllable
    })
  }

  render () {
    const { currentWord, answeredSyllable } = this.state
    const syllableToHighlight = answeredSyllable

    return (
      <Layout className='layout'>
        <Header />
        <LayoutContent>
          <Title level={1}>Practice</Title>
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
