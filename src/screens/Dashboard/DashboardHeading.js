import React from 'react'
import PropTypes from 'prop-types'

import {
  Heading,
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
const DashboardHeading = ({
  bgColor,
  children,
  ...props
}) => (
  <Heading
    color={ useContrastText(bgColor) }
    opacity={0.75}
    size="xs"
    textTransform="uppercase"
    { ...props }
  >
    { children }
  </Heading>
)

DashboardHeading.propTypes = {
  bgColor: PropTypes.string,
  children: PropTypes.any,
  props: PropTypes.object
}

DashboardHeading.defaultProps = {
  bgColor: 'white'
}

export default DashboardHeading
