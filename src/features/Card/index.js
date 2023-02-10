import React from 'react'
import PropTypes from 'prop-types'

import { Flex, Pressable } from 'native-base'

import { THEME } from 'constants/index'

import Contents from './Contents'

/**
 * Card component
 *
 * @param {Object} params
 * @param {JSX.Element|JSX.Element[]} [params._footer] - Footer children
 * @param {string} [params.accentColor='gray'] - Accent color
 * @param {string} [params.bgColor='white'] - Background color
 * @param {*} params.children - Component children
 * @param {string} [params.gradient] - Background gradient color
 * @param {Function} [params.onPress] - Function to execute on press
 * @param {string} [params.subtitle] - Header subtitle text
 * @param {string} [params.title] - Header title test
 * @param {...JSX.ElementAttributesProperty} [params.props] - Additional component attributes
 *
 * @returns {JSX.Element}
 * @constructor
 */
const Card = ({
  _footer,
  accentColor,
  bgColor,
  children,
  gradient,
  onPress,
  subtitle,
  title,
  ...props
}) => {
  const CARD_PADDING = THEME.spacing.sm

  if (onPress) {
    return (
      <Pressable onPress={ onPress }>
        { ({ isPressed }) => (
          <Flex
            style={{
              transform: [
                {
                  scale: isPressed ? 0.98 : 1
                }
              ]
            }}
          >
            <Contents
              _footer={ _footer }
              accentColor={ accentColor }
              bgColor={ bgColor }
              gradient={ gradient }
              onPress={ !!onPress }
              padding={ CARD_PADDING }
              subtitle={ subtitle }
              title={ title }
              { ...props }
            >
              { children }
            </Contents>
          </Flex>
        ) }
      </Pressable>
    )
  }

  return (
    <Contents
      _footer={ _footer }
      accentColor={ accentColor }
      bgColor={ bgColor }
      gradient={ gradient }
      onPress={ !!onPress }
      padding={ CARD_PADDING }
      subtitle={ subtitle }
      title={ title }
      { ...props }
    >
      { children }
    </Contents>
  )
}

Card.propTypes = {
  _footer: PropTypes.any,
  accentColor: PropTypes.string,
  bgColor: PropTypes.string,
  children: PropTypes.any.isRequired,
  gradient: PropTypes.string,
  onPress: PropTypes.func,
  subtitle: PropTypes.string,
  title: PropTypes.string,
  props: PropTypes.object
}

Card.defaultProps = {
  accentColor: 'gray',
  bgColor: 'white',
  gradient: null,
  onPress: null,
  subtitle: null,
  title: null
}

export default Card
