import React from 'react'
import PropTypes from 'prop-types'

import { Box, Center, Heading, Image, Text } from 'native-base'

import chooseIllustration from 'images/choose-illustration.png'

/**
 * Quiz intro card
 *
 * @param {Object} params
 * @param {string} [params.diary_name] - Diary name
 * @param {string} [params.introText] - Diary intro text
 *
 * @return {JSX.Element}
 * @constructor
 */
const IntroCard = ({ diary_name, introText }) => (
  <Box>
    <Center w="100%">
      <Image
        alt="Illustration of a person making a selection"
        mb={10}
        size="2xl"
        source={ chooseIllustration }
      />
    </Center>
    <Box>
      { diary_name && <Heading mb={4}>{ diary_name }</Heading> }
      { introText && <Text>{ introText }</Text> }
    </Box>
  </Box>
)

IntroCard.propTypes = {
  diary_name: PropTypes.string,
  introText: PropTypes.string
}

export default IntroCard
