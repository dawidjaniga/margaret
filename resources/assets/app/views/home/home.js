import React, { useReducer, useEffect } from 'react'
import axios from 'axios'
import { Layout, Spin, Button, Typography } from 'antd'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Line } from 'react-chartjs-2'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import HelloBackground from '../../assets/images/brooke-cagle-609873-unsplash.jpg'

const APP_URL = process.env.APP_URL

const { Title } = Typography

const Wrapper = styled.div`
  max-width: 300px;
  margin: auto;
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

const FullWidthContent = styled.div`
  background: #fff;
  display: flex;
  justify-content: center;
  padding: 6em;
`
const AnswersWrapper = styled.div`
  background: #001529;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  min-height: 300px;
`

const AnswerTitle = styled(Title)`
  && {
    color: #fff;
    margin-top: 2em;
  }
`

function createDataSet (data, labels) {
  return {
    labels,
    datasets: [
      {
        label: 'Answers sum',
        fill: 'start',
        lineTension: 0.1,
        backgroundColor: 'rgba(220,220,220,.7)',
        borderColor: 'rgba(220,220,220,0)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 0,
        pointHoverRadius: 0,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 0,
        pointRadius: 0,
        pointHitRadius: 0,
        borderWidth: 0,
        data
      }
    ]
  }
}

const chartOptions = {
  title: {
    display: false
  },
  legend: {
    display: false
  },
  layout: {
    padding: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    }
  },
  tooltips: {
    enabled: false
  },
  scales: {
    xAxes: [
      {
        ticks: {
          display: false
        }
      }
    ],
    yAxes: [
      {
        ticks: {
          display: false
        },
        gridLines: {
          tickMarkLength: 0
        }
      }
    ]
  }
}

function dataFetchReducer (state, action) {
  switch (action.type) {
    case 'FETCH_INIT':
      return {
        isLoading: true,
        isError: false
      }

    case 'FETCH_SUCCESS':
      const { answersSum, chartData } = action.payload
      return {
        isLoading: false,
        isError: false,
        answersSum,
        chartData
      }
    case 'FETCH_ERROR':
      return {
        isLoading: false,
        isError: true
      }
  }
}

function useDataApi () {
  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    chartData: {},
    answersSum: 0
  })

  useEffect(() => {
    async function fetchData () {
      dispatch({ type: 'FETCH_INIT' })

      try {
        const result = await axios.get(
          `${APP_URL}/answers?filter[statistics]=day`
        )
        const answersSumPerDay = []
        const labels = []
        let answersSum = 0

        result.data.forEach(item => {
          labels.push(item.date)
          answersSum += +item.answers_sum
          answersSumPerDay.push(answersSum)
        })

        dispatch({
          type: 'FETCH_SUCCESS',
          payload: {
            chartData: createDataSet(answersSumPerDay, labels),
            answersSum
          }
        })
      } catch (error) {
        dispatch({ type: 'FETCH_ERROR' })
      }
    }

    fetchData()
  }, [])

  return state
}

export default function Home () {
  const { isLoading, isError, answersSum, chartData } = useDataApi()

  return (
    <Layout>
      <Header />
      <Hello>
        <HelloContent>
          <HelloTitle level={1}>Learn English Word Stress</HelloTitle>
          <Wrapper>
            <Link to='/login'>
              <Button type='primary' size='large'>
                Get started
              </Button>
            </Link>
          </Wrapper>
        </HelloContent>
      </Hello>
      {isError && <h2>Error occurred</h2>}
      {isLoading ? (
        <FullWidthContent>
          <Spin />
        </FullWidthContent>
      ) : (
        <React.Fragment>
          <FullWidthContent>
            <Title level={2}>{2} users learn with us</Title>
          </FullWidthContent>
          <AnswersWrapper>
            <AnswerTitle level={2}>
              And they've practiced {answersSum} times
            </AnswerTitle>
            <Line data={chartData} options={chartOptions} />
          </AnswersWrapper>
        </React.Fragment>
      )}
      <Footer />
    </Layout>
  )
}
