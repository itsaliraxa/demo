import React from 'react'
import PropTypes from 'prop-types'

import {
  Heading as NBHeading,
  useContrastText
} from 'native-base'

/**
 * Dashboard Heading Text
 *
 * @param {Object} params
 * @param {string} [params.bgColor='white'] - Background color used to determine contrasting text color
 * @param {*} params.children - Component children
 * @param {...JSX.ElementAttributesProperty} [params.props] - Additional component attributes
 *
 * @returns {JSX.Element}
 * @constructor
 */
const Heading = ({
  bgColor,
  children,
  ...props
}) => (
  <NBHeading
    color={ useContrastText(bgColor) }
    opacity={0.75}
    size="xs"
    textTransform="uppercase"
    { ...props }
  >
    { children }
  </NBHeading>
)

Heading.propTypes = {
  bgColor: PropTypes.string,
  children: PropTypes.any,
  props: PropTypes.object
}

Heading.defaultProps = {
  bgColor: 'white'
}

export default Heading
