import React from 'react'
import PropTypes from 'prop-types'

import {
  Box,
  Heading,
  HStack,
  Text,
  useContrastText
} from 'native-base'

import { THEME } from 'constants/index'

/**
 * Header Component that is generally used as the first element on screen
 *
 * @param {Object} params
 * @param {(JSX.Element|JSX.Element[])} [params._right] - Space to the right of component
 * @param {string} [params.bgColor] - Header background color
 * @param {*} [params.children] - Component children
 * @param {string} [params.color] - Title and subtitle text color
 * @param {string} [params.subtitle] - Subtitle text (goes above title)
 * @param {string} [params.title] - Title text
 * @param {...JSX.ElementAttributesProperty} [params.props] - Additional component attributes
 *
 * @returns {JSX.Element}
 * @constructor
 */
const Header = ({
  _right,
  bgColor,
  children,
  color,
  subtitle,
  title,
  ...props
}) => (
  <Box
    bgColor={ bgColor }
    mb={ THEME.spacing.md }
  >
    <HStack
      justifyContent="space-between"
      px={ THEME.screen.px }
      py={ THEME.spacing.lg }
      safeAreaTop
      w="100%"
      { ...props }
    >
      <Box>
        { subtitle &&
          <Text
            color={ color || useContrastText(bgColor) }
            fontSize="xs"
            fontWeight="semibold"
            opacity={ 0.75 }
          >
            { subtitle.toUpperCase() }
          </Text>
        }
        { title &&
          <Heading
            color={ color || useContrastText(bgColor) }
            size="xl"
          >
            { title }
          </Heading>
        }
        { children }
      </Box>
      { _right &&
        <Box>{ _right }</Box>
      }
    </HStack>
  </Box>
)

Header.propTypes = {
  _right: PropTypes.any,
  bgColor: PropTypes.string,
  children: PropTypes.any,
  color: PropTypes.string,
  subtitle: PropTypes.string,
  title: PropTypes.string,
  props: PropTypes.object
}

Header.defaultProps = {
  bgColor: 'white',
  children: null,
  color: null,
  subtitle: null,
  title: null
}

export default Header
