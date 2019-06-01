import React from 'react'
import { Layout, Button, Typography } from 'antd'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Line } from 'react-chartjs-2'
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
`

const AnswerTitle = styled(Title)`
&& {
  color: #fff;
  margin-top: 2em;
}
`

const data = {
  datasets: [
    {
      label: 'My First dataset',
      fill: 'start',
      lineTension: 0.1,
      backgroundColor: 'rgba(220,220,220,1)',
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
      data: [100, 300, 400, 700, 1600, 2800, 3200]
    }
  ]
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
    xAxes: [{
      ticks: {
        display: false
      }
    }],
    yAxes: [{
      ticks: {
        display: false
      },
      gridLines: {
        tickMarkLength: 0
      }
    }]
  }
}

export default class HomeView extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      users: 2,
      answers: 5423
    }
  }
  render () {
    const { users, answers } = this.state
    return (
      <Layout>
        <Header />
        <Hello>
          <HelloContent>
            <HelloTitle level={1}>Learn English Wordstress</HelloTitle>
            <Wrapper>
              <Link to='/login'><Button type='primary' size='large'>Get started</Button></Link>
            </Wrapper>
          </HelloContent>
        </Hello>
        <FullWidthContent>
          <Title level={2}>{users} users learn with us</Title>
        </FullWidthContent>
        <AnswersWrapper>
          <AnswerTitle level={2}>And they've practiced {answers} times</AnswerTitle>
          <Line data={data} options={chartOptions} />}
        </AnswersWrapper>
        <Footer />
      </Layout>
    )
  }
}
