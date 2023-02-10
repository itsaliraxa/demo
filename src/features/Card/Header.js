import React from 'react'
import PropTypes from 'prop-types'

import { Flex, Heading } from 'native-base'

/**
 * Card header
 *
 * @param {Object} params
 * @param {string} params.accentColor - Card accent color
 * @param {number} params.padding - Card padding
 * @param {string} [params.subtitle] - Card subtitle text
 * @param {string} [params.title] - Card title text
 *
 * @returns {JSX.Element}
 * @constructor
 */
const Header = ({
  accentColor,
  padding,
  subtitle,
  title
}) => (
  <Flex px={ padding } pt={ padding }>
    { subtitle && (
      <Heading
        color={ `${accentColor}.500` }
        size="xs"
      >
        { subtitle.toUpperCase() }
      </Heading>
    ) }
    { title && (
      <Heading size="md">
        { title }
      </Heading>
    ) }
  </Flex>
)

Header.propTypes = {
  accentColor: PropTypes.string.isRequired,
  padding: PropTypes.number.isRequired,
  subtitle: PropTypes.string,
  title: PropTypes.string
}

Header.defaultProps = {
  subtitle: null,
  title: null
}

export default Header
