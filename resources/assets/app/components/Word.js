import React, { useCallback } from 'react'
import { } from 'antd'
import styled from 'styled-components'

const StyledWord = styled.div`
text-align: center;
`

const StyledSyllable = styled.span`
font-size: 24px;
display: inline-block;
padding: 1em;
cursor: pointer;
transition: background .2s;
border-bottom: 2px solid transparent;

${props => {
    let result = `
    &:hover {
      border-bottom-color: #e1e1e1;
    }`

    if (props.highlight) {
      result = `border-bottom-color: ${props.highlight === 'red' ? 'red' : '#1fe11fa1'}`
    }

    return result
  }};
`

const SpeechPart = styled.div`
font-style: italic;
`

const Definition = styled.dfn`
font-size: 10px;
display: block;
margin: 1em 0;
`

function Syllable ({ syllable, number, highlight, onClick }) {
  const clickHandler = useCallback(() => {
    onClick(number)
  }, [number])

  return (
    <StyledSyllable highlight={highlight} onClick={clickHandler}>{syllable}</StyledSyllable>
  )
}

export default function ({
  syllables,
  stressedSyllable,
  answeredSyllable,
  speechPart,
  definition,
  ipa,
  onClick
}) {
  return (
    <StyledWord>
      {syllables.map((syllable, index) => {
        const syllableNumber = index + 1
        let color

        if (answeredSyllable) {
          if (stressedSyllable === syllableNumber) {
            color = 'green'
          } else if (answeredSyllable === syllableNumber) {
            color = 'red'
          }
        }

        return (
          <Syllable
            key={syllableNumber}
            number={syllableNumber}
            onClick={onClick}
            syllable={syllable}
            highlight={color}
          />
        )
      })
      }
      <SpeechPart>{speechPart}</SpeechPart>
      <Definition>{definition}</Definition>
      <Definition>{ipa}</Definition>
    </StyledWord>
  )
}
