import React, { useLayoutEffect, useRef } from 'react'
import PropTypes from 'prop-types'

import { useFormikContext } from 'formik'

import { Checkbox, useTheme } from 'native-base'

import { getInputStyle, styleProps } from 'theme/input'

/**
 * Checkbox input based on NativeBase component
 *
 * @param {Object} params
 * @param {string} params.answer - Checkbox input label and value
 * @param {string} params.name - Input name
 * @param {...JSX.ElementAttributesProperty} [params.props] - Additional component attributes
 *
 * @returns {JSX.Element}
 * @constructor
 */
const Input = ({
  answer,
  name,
  ...props
}) => {
  const { values, errors } = useFormikContext()
  const theme = useTheme()

  const wrapperRef = useRef(null)

  useLayoutEffect(() => {
    wrapperRef?.current?.setNativeProps(getInputStyle({
      error: errors?.[name],
      selected: values?.[name]?.includes(answer),
      theme
    }))
  }, [errors?.[name], values?.[name]])

  return (
    <Checkbox
      { ...styleProps }
      value={ answer }
      wrapperRef={ wrapperRef }
      { ...props }
    >
      { answer }
    </Checkbox>
  )
}

Input.propTypes = {
  answer: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  props: PropTypes.object
}

export default Input
