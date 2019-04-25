import React, { Component } from 'react'
import { Layout, Typography, Spin, Button, List, Progress } from 'antd'
import styled from 'styled-components'
import axios from 'axios'
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

const ProgressWrapper = styled.div`
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
      words: [],
      correctAnswers: [],
      incorrectAnswers: [],
      currentWord: undefined,
      wordsDownloaded: false,
      showLoader: true,
      answeredSyllable: 0,
      progress: 0,
      correctAnswersRatio: 0,
      disableNextButtonClick: true,
      disableWordClick: false
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

    axios.get(`${APP_URL}/words?filter[level]=difficult`)
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
    const { currentWord, answeredSyllable, correctAnswers, incorrectAnswers } = this.state

    axios.post(`${APP_URL}/answers`, {
      wordId: currentWord.id,
      answeredSyllable
    })
      .then(response => {
        let newCorrectAnswers = correctAnswers
        let newIncorrectAnswers = incorrectAnswers
        let answeredWords
        
        if (response.data.data.correct) {
          newCorrectAnswers = [currentWord.word, ...correctAnswers]
        } else {
          newIncorrectAnswers = [currentWord.word, ...incorrectAnswers]
        }

        answeredWords = newCorrectAnswers.length + newIncorrectAnswers.length

        this.setState({
          correctAnswersRatio: Math.round(newCorrectAnswers.length / (answeredWords) * 100),
          correctAnswers: newCorrectAnswers,
          incorrectAnswers: newIncorrectAnswers
        })
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

    this.setState({
      words,
      currentWord: nextWord,
      disableWordClick: false,
      disableNextButtonClick: true,
      progress: (100 - words.length)
    })
  }

  

  onClickWord = (answeredSyllable) => {
    this.setState(
      {
        answeredSyllable,
        disableWordClick: true,
        disableNextButtonClick: false,
      },
      this.saveAnswer
    )
  }

  render () {
    const {
      currentWord,
      words,
      answeredSyllable,
      disableWordClick,
      correctAnswers,
      incorrectAnswers,
      progress,
      correctAnswersRatio,
      disableNextButtonClick
    } = this.state
    const syllableToHighlight = answeredSyllable
    
    return (
      <Layout className='layout'>
        <Header />
        <LayoutContent>
          <Title level={1}>Practice</Title>
          <ProgressWrapper>
          <Progress
            type="line"
            strokeColor={{
              '0%': '#6ded4a',
              '100%': '#53c423',
            }}
            percent={progress}
            status="active"
            format={() => `${100 - words.length} / 100`}
          />
          </ProgressWrapper>
          <Wrapper>
            {this.state.showLoader && <Spin />}
            <CurrentWordWrapper>
            {currentWord &&
            <Word
              syllables={currentWord.syllables}
              stressedSyllable={currentWord.stressed_syllable}
              answeredSyllable={answeredSyllable}
              speechPart={currentWord.speech_part}
              definition={currentWord.definition}
              ipa={currentWord.ipa}
              onClick={this.onClickWord}
              disableClick={disableWordClick}
            />
            }
            </CurrentWordWrapper>
            <NextButtonWrapper>
              <Button type="primary" icon="double-right" onClick={this.onClickNext} disabled={disableNextButtonClick}>Next</Button>
            </NextButtonWrapper>
            <CorrectAnswersRatioWrapper>
            <Progress
              type="circle"
              width={100}
              percent={correctAnswersRatio}
              format={() => `${correctAnswersRatio}%`}
            />
            </CorrectAnswersRatioWrapper>
            <WordListWrapper>
            <List
              header={<WordListHeader>✅ {correctAnswers.length}</WordListHeader>}
              dataSource={correctAnswers}
              renderItem={item => (<List.Item>{item}</List.Item>)}
            />
            </WordListWrapper>
            <WordListWrapper>
            <List
              header={<WordListHeader>❌ {incorrectAnswers.length}</WordListHeader>}
              dataSource={incorrectAnswers}
              renderItem={item => (<List.Item>{item}</List.Item>)}
            />
            </WordListWrapper>
          </Wrapper>
        </LayoutContent>
        <Footer />
      </Layout>
    )
  }
}
