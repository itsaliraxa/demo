import React from 'react'
import PropTypes from 'prop-types'

import {
  Heading
} from 'native-base'

import { THEME } from 'constants/index'

/**
 * Input label component
 *
 * @param params
 * @param {*} params.children - Component children
 * @param {Object} [params.props] - Additional component attributes
 *
 * @returns {JSX.Element}
 * @constructor
 */
const InputLabel = ({
  children,
  props
}) => {
  return (
    <Heading
      fontWeight="semibold"
      mb={ THEME.spacing.sm }
      size="xs"
      { ...props }
    >
      { children }
    </Heading>
  )
}

InputLabel.propTypes = {
  children: PropTypes.any.isRequired,
  props: PropTypes.object
}

export default InputLabel
