import React from 'react'
import { Layout } from 'antd'
import styled from 'styled-components'
const { Content } = Layout

const StyledContent = styled(Content)`
&& {
  padding: 24px;
  background: #fff;
  min-height: 290px;
  width: 80%;
  max-width: 1000px;
  margin: 40px auto;
}
`
export default function ({ children }) {
  return (
    <StyledContent>{children}</StyledContent>
  )
}
