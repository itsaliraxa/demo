import React, { useLayoutEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { useFormikContext } from 'formik'

import {
  CheckIcon,
  Radio,
  useTheme
} from 'native-base'

import { getInputStyle, styleProps } from 'theme/input'

/**
 * Radio input based on NativeBase component
 *
 * @param {Object} params
 * @param {string} params.answer - Radio input label and value
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
      selected: values?.[name] === answer,
      theme
    }))
  }, [errors?.[name], values?.[name]])

  return (
    <Radio
      { ...styleProps }
      icon={<CheckIcon />}
      value={ answer }
      wrapperRef={ wrapperRef }
      { ...props }
    >
      { answer }
    </Radio>
  )
}

Input.propTypes = {
  answer: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  props: PropTypes.object
}

export default Input
