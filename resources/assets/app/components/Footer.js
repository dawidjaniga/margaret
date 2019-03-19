import React from 'react'
import { Layout } from 'antd'
import styled from 'styled-components'

const { Footer } = Layout

const StyledFooter = styled(Footer)`
text-align: center;
`

export default function () {
  return (
    <StyledFooter>
      Margaret ©2018 Created by <a href='https://dawidjaniga.pl'>Dawid Janiga</a>
    </StyledFooter>
  )
}
