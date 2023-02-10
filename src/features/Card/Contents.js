import React from 'react'
import PropTypes from 'prop-types'

import { Flex } from 'native-base'

import { THEME } from 'constants/index'

import Footer from './Footer'
import Header from './Header'

/**
 * Card contents
 *
 * @param {Object} params
 * @param {*} [params._footer] - Card footer children
 * @param {string} params.accentColor - Card accent color
 * @param {string} [params.bgColor] - Card background color
 * @param {*} params.children - Component children
 * @param {string} [params.gradient] - Card background gradient color
 * @param {Boolean} [params.onPress=false] - Card has onPress functionality
 * @param {number} params.padding - Card padding
 * @param {string} [params.subtitle] - Card header subtitle text
 * @param {string} [params.title] - Card header title test
 * @param {...JSX.ElementAttributesProperty} [params.props] - Additional component attributes
 *
 * @returns {JSX.Element}
 * @constructor
 */
const Contents = ({
  _footer,
  accentColor,
  bgColor,
  children,
  gradient,
  onPress,
  padding,
  subtitle,
  title,
  ...props
}) => (
  <Flex
    bg={ gradient
      ? {
          linearGradient: {
            colors: [`${gradient}.300`, `${gradient}.400`],
            start: [-0.25, 0.25],
            end: [0.75, 0]
          }
        }
      : null }
    bgColor={ gradient ? null : bgColor }
    borderRadius={ THEME.borderRadius.md }
    w="100%"
    { ...props }
  >
    { (subtitle || title) &&
      <Header
        accentColor={ accentColor }
        padding={ padding }
        subtitle={ subtitle }
        title={ title }
      />
    }

    <Flex p={ padding }>
      { children }
    </Flex>

    { (_footer || onPress) &&
      <Footer
        accentColor={ accentColor }
        onPress={ !!onPress }
        padding={ padding }
      >
        { _footer && _footer }
      </Footer>
    }
  </Flex>
)

Contents.propTypes = {
  _footer: PropTypes.any,
  accentColor: PropTypes.string.isRequired,
  bgColor: PropTypes.string,
  children: PropTypes.any,
  gradient: PropTypes.string,
  onPress: PropTypes.bool,
  padding: PropTypes.number.isRequired,
  subtitle: PropTypes.string,
  title: PropTypes.string,
  props: PropTypes.object
}

Contents.defaultProps = {
  bgColor: null,
  gradient: null,
  onPress: false,
  subtitle: null,
  title: null
}

export default Contents
