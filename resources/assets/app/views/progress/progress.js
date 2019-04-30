import React, { Component } from 'react'
import { Layout, Typography, Spin, Button, List, Progress } from 'antd'
import styled from 'styled-components'
import axios from 'axios'
import Combokeys from 'combokeys'
import LayoutContent from '../../components/LayoutContent'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Word from '../../components/Word'

import { Line } from 'react-chartjs-2'

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      fill: 'start',
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [65, 59, 80, 81, 56, 55, 40]
    }
  ]
}

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
      statisticsData: undefined,
      easiestWords: [],
      mostDifficultWords: []
    }
  }

  componentDidMount () {
    if (!this.state.statisticsDownloaded) {
      this.loadStatistics()
      this.loadEasiestWords()
      this.loadMostDifficultWords()
    }
  }

  createDataset (options) {
    return {
      fill: 'start',
      lineTension: 0.1,
      backgroundColor: '#60ea60ab',
      borderColor: '#33c333ab',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: '#33c333ab',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: '#33c333ab',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      ...options
    }
  }

  loadStatistics () {
    this.setState({
      showLoader: true
    })

    axios
      .get(`${APP_URL}/answers?filter[statistics]=day`)
      .then(response => {
        const correctAnswersRatio = []
        const answersSum = []
        const labels = []
        response.data.forEach(item => {
          const correct = parseInt(item.correct_answers, 10)
          const incorrect = parseInt(item.incorrect_answers, 10)
          const sum = correct + incorrect
          const ratio = correct / sum * 100

          correctAnswersRatio.push(ratio)
          answersSum.push(sum)
          labels.push(item.date)
        })
        this.setState({
          statisticsData: {
            labels,
            datasets: [
              this.createDataset({
                label: 'Answers sum',
                data: answersSum,
                backgroundColor: '#4978ff47',
                borderColor: '#4978ff8c',
                pointBorderColor: '#4978ff8c',
                yAxisID: 'answers sum'
              }),
              this.createDataset({
                label: 'Correct ratio',
                data: correctAnswersRatio,
                backgroundColor: '#60ea60ab',
                borderColor: '#33c333ab',
                pointBorderColor: '#33c333ab',
                yAxisID: 'correct ratio'
              })
            ]
          },
          statisticsDownloaded: true,
          showLoader: false
        })
      })
      .catch(err => {
        this.setState({
          showLoader: false
        })
        console.error(err)
      })
  }

  loadEasiestWords () {
    this.setState({
      showLoader: true
    })

    axios
      .get(`${APP_URL}/words?filter[answer]=correct&limit=30`)
      .then(response => {
        this.setState({
          easiestWords: response.data.map(item => item.word)
        })
      })
      .catch(err => {
        this.setState({
          showLoader: false
        })
        console.error(err)
      })
  }

  loadMostDifficultWords () {
    this.setState({
      showLoader: true
    })

    axios
      .get(`${APP_URL}/words?filter[answer]=incorrect&limit=30`)
      .then(response => {
        this.setState({
          mostDifficultWords: response.data.map(item => item.word)
        })
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
      statisticsData,
      easiestWords,
      mostDifficultWords
    } = this.state

    const chartOptions = {
      scales: {
        yAxes: [
          {
            id: 'answers sum',
            type: 'linear',
            position: 'left'
          },
          {
            id: 'correct ratio',
            type: 'linear',
            position: 'right',
            ticks: {
              min: 0,
              max: 100
            }
          }
        ]
      }
    }

    return (
      <Layout className='layout'>
        <Header />
        <LayoutContent>
          <Title level={1}>Progress</Title>
          <ChartWrapper>
            {statisticsData && <Line data={statisticsData} options={chartOptions} />}
          </ChartWrapper>
          <Wrapper>
            {this.state.showLoader && <Spin />}
            <WordListWrapper>
              <List
                header={
                  <WordListHeader>❌ {mostDifficultWords.length}</WordListHeader>
                }
                dataSource={mostDifficultWords}
                renderItem={item => <List.Item>{item}</List.Item>}
              />
            </WordListWrapper>
            <WordListWrapper>
              <List
                header={
                  <WordListHeader>✅ {easiestWords.length}</WordListHeader>
                }
                dataSource={easiestWords}
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
