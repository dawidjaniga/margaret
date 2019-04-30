import React, { Component } from 'react'
import { Layout, Typography } from 'antd'
import styled from 'styled-components'
import LayoutContent from '../../components/LayoutContent'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

const { Title, Paragraph, Text } = Typography

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: baseline;
`

const Rules = styled.ol`
  counter-reset: digit-counter;
  list-style: none;
  padding: 0;
  margin: 0;
`

const Rule = styled.li`
  margin: 4rem 4rem 2rem;
  counter-increment: digit-counter;
  position: relative;
  padding-left: 2em;

  &::before {
    --size: 4rem;
    content: counter(digit-counter);
    color: #f0f0f0;
    font-size: var(--size);
    font-weight: bold;
    position: absolute;
    left: calc(-1 * var(--size) - (1rem * 0.5));
    line-height: calc(var(--size) - 12px);
    text-align: right;
    width: var(--size);
    height: var(--size);
  }
`

const Section = styled.section`
  margin-bottom: 2em;
`

export default class RulesView extends Component {
  render () {
    return (
      <Layout className='layout'>
        <Header />
        <LayoutContent>
          <Title level={1}>Rules</Title>
          <Wrapper>
            <Title level={2}>Before you start</Title>
            <Section>
              <ol>
                <li>
                  <Text strong>A word can only have one stress</Text>
                  <Paragraph>In a very long word you can have a secondary stress, but it is always a much smaller stress.</Paragraph>
                </li>
                <li>
                  <Text strong>Only vowels are stressed, not consonants</Text>
                  <Paragraph>The vowels in English are <Text strong>a</Text>, <Text strong>e</Text>, <Text strong>i</Text>, <Text strong>o</Text>, and <Text strong>u</Text>. The consonants are all the other letters.</Paragraph>
                </li>
                <li>
                  <Text strong>There are many exceptions to the rules</Text>
                  <Paragraph>The word stress rules in English are complicated. Remember that there are exceptions to every rule. Use a dictionary to check the word stress of new words. Soon, you will know English well enough to add word stress naturally.</Paragraph>
                </li>
              </ol>
              <Paragraph>It is important that you stress the right syllables, so people can hear and understand your words.</Paragraph>
            </Section>
            <Title level={2}>Rules</Title>
            <Rules>
              <Rule>
                <Title level={3}>Two-Syllable nouns and adjectives</Title>
                <Paragraph>In most two syllable nouns and adjectives, the first syllable takes on the stress.</Paragraph>
                <ul>
                  <li>SAMples</li>
                  <li>CARton</li>
                  <li>PURple</li>
                  <li>RAIny</li>
                  <li>CHIna</li>
                  <li>HAPpy</li>
                </ul>
              </Rule>
              <Rule>
                <Title level={3}>Two-Syllable verbs and prepositions</Title>
                <Section>
                  <Paragraph>In most two syllable verbs and prepositions, the stress is on the second syllable.</Paragraph>
                  <ul>
                    <li>reLAX</li>
                    <li>reCEIVE</li>
                    <li>diRECT</li>
                    <li>aMONG</li>
                    <li>aSIDE</li>
                    <li>beTWEEN</li>
                    <li>deCIDE</li>
                  </ul>
                </Section>
                <Section>
                  <Text strong>More about word stress on two-syllable words</Text>
                  <ul>
                    <li>About 80% of two-syllable words get their stress on the <Text underline>first syllable</Text>.</li>
                    <li>There are, of course, exceptions to this rule, but very few nouns and adjectives get stress on their second syllable.</li>
                    <li>Verbs and prepositions usually get stress placed on the second syllable, but there are exceptions to this too.</li>
                  </ul>
                </Section>
                <Text strong>Note</Text>
                <Paragraph>There are many two-syllable words in English that can be pronounced in two different ways. The stress change also changes the part of speech of the word.</Paragraph>
                <ul>
                  <li>PREsent = a gift (noun); non past or future (adjective)</li>
                  <li>preSENT = to give something to someone (verb)</li>
                  <li>OBject = something you can see and touch (noun)</li>
                  <li>obJECT = to disagree with something (verb)</li>
                </ul>
              </Rule>
              <Rule>
                <Title level={3}>Words ending in er, ly</Title>
                <Paragraph>For three-syllable words ending with the suffixes <Text strong>er</Text> or <Text strong>ly</Text>, the stress is placed on the first syllable.</Paragraph>
                <ul>
                  <li>ORderly</li>
                  <li>SIlently</li>
                  <li>LOvingly</li>
                  <li>MAnager</li>
                  <li>GARdener</li>
                  <li>EAsier</li>
                </ul>
              </Rule>
              <Rule>
                <Title level={3}>Words ending in consonants and in y</Title>
                <Paragraph>If there is a word that ends in a <Text strong>consonant</Text> or in a <Text strong>y</Text>, then the first syllable usually gets the stress.</Paragraph>
                <ul>
                  <li>RARity</li>
                  <li>OPtimal</li>
                  <li>GRAdient</li>
                  <li>GEnorous</li>
                </ul>
              </Rule>
              <Rule>
                <Title level={3}>Words with various endings</Title>
                <Paragraph>Take a good look at the list of suffixes below (suffixes are word endings).</Paragraph>
                <Paragraph>The stress is going to be on the syllable right before the suffix. This applies to words of all syllable lengths.</Paragraph>
                <ul>
                  <li><Text strong>able</Text>: ADDable, DURable, LAUGHable</li>
                  <li><Text strong>ial</Text>: differENTial, SOcial, fiNANcial</li>
                  <li><Text strong>cian</Text>: muSIcian, phySIcian, cliNIcian</li>
                  <li><Text strong>ery</Text>: BAkery, SCEnery</li>
                  <li><Text strong>ian</Text>: coMEdian, ciVILian, techNIcian</li>
                  <li><Text strong>ible</Text>: reSIstible, imPOSsible, TERRible</li>
                  <li><Text strong>ic</Text>: arCHAic, plaTOnic, characteRIStic</li>
                  <li><Text strong>ics</Text>: diaBEtics, paediAtrics, TOpics</li>
                  <li><Text strong>ion</Text>: classifiCAtion, repoSItion, vegeTAtion</li>
                  <li><Text strong>ia</Text>: MEdia, bacTERia, vicTORia</li>
                  <li><Text strong>ient</Text>: inGREdient, PAtient, ANcient</li>
                  <li><Text strong>ious</Text>: mySTERious, reLIgious, VARious</li>
                  <li><Text strong>ish</Text>: SELfish, ENglish, PUnish</li>
                  <li><Text strong>osis</Text>: hypNOsis, diagNOsis, osMOsis</li>
                </ul>
              </Rule>
              <Rule>
                <Title level={3}>Words ending in ade, ee, ese, que, ette, oon</Title>
                <Paragraph>Words that use the suffix <Text strong>ade</Text>, <Text strong>ee</Text>, <Text strong>ese</Text>, <Text strong>eer</Text>, <Text strong>que</Text>, <Text strong>ette</Text>, or <Text strong>oon</Text> have the primary stress actually placed on the suffix.</Paragraph>
                <Paragraph>This applies to words of all syllable lengths.</Paragraph>
                <ul>
                  <li><Text strong>ade</Text>: lemoNADE, cruSADE, arCADE</li>
                  <li><Text strong>ee</Text>: aGREE, jamborEE, guaranTEE</li>
                  <li><Text strong>eer</Text>: sightSEER, puppeTEER</li>
                  <li><Text strong>ese</Text>: SiamESE, JapanESE, chEESE</li>
                  <li><Text strong>ette</Text>: cassETTE, CorvETTE, towelETTE</li>
                  <li><Text strong>que</Text>: unIQUE, physIQUE</li>
                  <li><Text strong>oon</Text>: baLOON, afterNOON, carTOON</li>
                </ul>
              </Rule>
              <Rule>
                <Title level={3}>Stress on the second from the end syllable</Title>
                <Section>
                  <Paragraph>You put stress on the second syllable from the end of the word with words ending in <Text strong>ic</Text>, <Text strong>sion</Text>, and <Text strong>tion</Text>.</Paragraph>
                  <ul>
                    <li>iCONic</li>
                    <li>GRAPHic</li>
                    <li>hyperTENsion</li>
                    <li>teleVIsion</li>
                    <li>nuTRItion</li>
                    <li>reveLAtion</li>
                  </ul>
                </Section>
                <Text strong>Note</Text>
                <Paragraph>Native English speakers don't always agree on where to place the stress on a word. For example, some people pronounce television as "TELevision" while others say "teleVIsion."</Paragraph>
              </Rule>
              <Rule>
                <Title level={3}>Stress on the third from end syllable</Title>
                <Paragraph>You put stress on the third from end syllable with words that end in <Text strong>cy</Text>, <Text strong>ty</Text>, <Text strong>phy</Text>, <Text strong>gy</Text> and <Text strong>al</Text>.</Paragraph>
                <ul>
                  <li>deMOcracy</li>
                  <li>geOGraphy</li>
                  <li>ALlergy</li>
                  <li>NAUtical</li>
                  <li>CLArity</li>
                  <li>CRItical</li>
                </ul>
              </Rule>
              <Rule>
                <Title level={3}>Compound noun</Title>
                <Paragraph>A compound noun is a noun made out of two nouns that form one word. In a compound noun, the most stress is on the stressed syllable of the first word.</Paragraph>
                <ul>
                  <li>SEAfood (sea + food)</li>
                  <li>ICEland (ice + land)</li>
                  <li>TOOTHpaste (tooth + paste)</li>
                  <li>FOOTball (foot + ball)</li>
                  <li>BAsketball (basket + ball)</li>
                </ul>
              </Rule>
              <Rule>
                <Title level={3}>Compound adjectives</Title>
                <Paragraph>A compound adjective is an adjective made of at least two words.</Paragraph>
                <Paragraph>Often, hyphens are used in compound adjectives. In compound adjectives, the most stress is placed in the stressed syllable of the second word.</Paragraph>
                <ul>
                  <li>ten-MEter</li>
                  <li>rock-SOlid</li>
                  <li>fifteen-MInute</li>
                  <li>old-FAshioned</li>
                </ul>
              </Rule>
              <Rule>
                <Title level={3}>Compound verbs</Title>
                <Paragraph>A compound verb is when a subject has two or more verbs. The stress is on the second or on the last part.</Paragraph>
                <ul>
                  <li>Matilda loves bread but deTESTS butter.</li>
                  <li>Sarah baked cookies and ATE them up.</li>
                  <li>Dogs love to eat bones and love to DRINK water.</li>
                </ul>
              </Rule>
              <Rule>
                <Title level={3}>Noun + compound nouns</Title>
                <Paragraph>Noun + compound Nouns are two word compound nouns. In noun + compound noun, the stress is on the first word.</Paragraph>
                <ul>
                  <li>AIRplane mechanic</li>
                  <li>PROject manager</li>
                  <li>BOARD member</li>
                </ul>
              </Rule>
              <Rule>
                <Title level={3}>Proper nouns</Title>
                <Paragraph>Proper nouns are specific names of people, places or things. For example: Jeniffer, Spain, Google. </Paragraph>
                <Paragraph>The second word is always the one that takes the stress.</Paragraph>
                <ul>
                  <li>North DAKOTA</li>
                  <li>Mr. SMITH</li>
                  <li>Apple INCORPORATED</li>
                </ul>
              </Rule>
              <Rule>
                <Title level={3}>Reflexive pronouns</Title>
                <Paragraph>Reflexive pronouns show that the action affects the person who performs the action. For example: I hit <Text strong>myself</Text>.</Paragraph>
                <Paragraph>The second syllable usually takes the stress.</Paragraph>
                <ul>
                  <li>mySELF</li>
                  <li>themSELVES</li>
                  <li>ourSELVES</li>
                </ul>
              </Rule>
              <Rule>
                <Title level={3}>Numbers</Title>
                <Paragraph>If the number is a multiple of ten, the stress is placed on the first syllable.</Paragraph>
                <ul>
                  <li>TEN</li>
                  <li>FIFty</li>
                  <li>ONE-hundred</li>
                </ul>
              </Rule>
            </Rules>
          </Wrapper>
        </LayoutContent>
        <Footer />
      </Layout>
    )
  }
}
