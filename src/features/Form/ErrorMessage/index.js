import React from 'react'
import PropTypes from 'prop-types'

import {
  HStack,
  Text,
  WarningOutlineIcon
} from 'native-base'

import { THEME } from 'constants/index'

/**
 * Error message shown when input is invalid
 *
 * @param {Object} params
 * @param {*} params.children - Component children
 * @param {...JSX.ElementAttributesProperty} [params.props] - Additional component attributes
 *
 * @returns {JSX.Element}
 * @constructor
 */
const ErrorMessage = ({ children, props }) => (
  <HStack
    alignItems="center"
    pt={ THEME.spacing.xs }
    space={ THEME.spacing.xs }
    { ...props }
  >
    <WarningOutlineIcon color="error.600" size="sm" />
    <Text color="error.600" fontSize="sm">{ children }</Text>
  </HStack>
)

ErrorMessage.propTypes = {
  children: PropTypes.any.isRequired,
  props: PropTypes.object
}

export default ErrorMessage
