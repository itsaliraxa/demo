import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesome } from '@expo/vector-icons'

import {
  Box,
  Heading,
  HStack,
  Icon,
  PresenceTransition,
  useContrastText
} from 'native-base'

import { THEME } from 'constants/index'

import Card from 'features/Card'

/**
 * Render tasks completed message
 *
 * @param {Object} params
 * @param {string} params.bgColor - Card background color
 * @param {Boolean} params.visible - Message is visible
 *
 * @returns {JSX.Element}
 * @constructor
 */
const CompletedMessage = ({
  bgColor,
  visible
}) => (
  <PresenceTransition
    initial={{
      opacity: 0,
      translateX: 50
    }}
    animate={{
      opacity: 1,
      translateX: 0,
      transition: {
        duration: THEME.animation.slow
      }
    }}
    visible={ visible }
  >
    <Box
      my={ THEME.spacing.md }
      px={ THEME.screen.px }
    >
      <Card bgColor={ `${bgColor}.100` }>
        <HStack space={ THEME.spacing.md } alignItems="center">
          <Icon
            as={ FontAwesome }
            name="thumbs-o-up"
            color={ `${bgColor}.600` }
          />
          <Box>
            <Heading
              color={ useContrastText(`${bgColor}.100`) }
              size="md"
            >
              Nice Job!
            </Heading>
            <Heading
              color={ useContrastText(`${bgColor}.100`) }
              opacity={ 0.9 }
              size="xs"
            >
              All tasks are complete
            </Heading>
          </Box>
        </HStack>
      </Card>
    </Box>
  </PresenceTransition>
)

CompletedMessage.propTypes = {
  bgColor: PropTypes.string,
  visible: PropTypes.bool.isRequired
}

CompletedMessage.defaultProps = {
  bgColor: 'emerald'
}

export default CompletedMessage
