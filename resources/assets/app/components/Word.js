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
transition: background .2s;
border-bottom: 2px solid transparent;
cursor: ${props => props.disableClick ? 'default' : 'pointer'};
${props => {
    let result

    if (!props.disableClick) {
      result = `&:hover {
        border-bottom-color: #e1e1e1;
      }`
    }

    if (props.highlight) {
      result = `border-bottom-color: ${props.highlight === 'red' ? 'red' : '#1fe11fa1'}`
    }

    return result
  }};
`

const SpeechPart = styled.div`
font-style: italic;
opacity: .6
`

const Definition = styled.dfn`
font-size: 10px;
display: block;
margin: 1em 0;
opacity: .2;
${({ hide }) => hide && `
  visibility: hidden;
`}

&:hover {
  opacity: .5;
}
`

function Syllable ({ syllable, number, highlight, onClick, disableClick }) {
  const clickHandler = useCallback(() => {
    onClick(number)
  }, [number])

  return (
    <StyledSyllable
      highlight={highlight}
      onClick={disableClick ? () => {} : clickHandler}
      disableClick={disableClick}
    >
      {syllable}
    </StyledSyllable>
  )
}

export default function ({
  syllables,
  stressedSyllable,
  answeredSyllable,
  speechPart,
  definition,
  ipa,
  onClick,
  disableClick
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
            disableClick={disableClick}
            syllable={syllable}
            highlight={color}
          />
        )
      })
      }
      <SpeechPart>{speechPart}</SpeechPart>
      <Definition>{definition}</Definition>
      <Definition hide={!answeredSyllable}>{ipa}</Definition>
    </StyledWord>
  )
}
