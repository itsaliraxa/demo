import React from 'react'
import PropTypes from 'prop-types'

import { wizardSchema } from 'schema'

import Checkbox from '../Checkbox'
import Radio from '../Radio'
import TextArea from '../TextArea'
import TextInput from '../TextInput'
import Date from '../Date'
import Title from '../Title'
import FilePicker from '../FilePicker'
import Number from '../Number'

/**
 * Create input component based on data
 *
 * @param {Object} params
 * @param {WizardInputData} params.data - Input data object
 * @param {...JSX.ElementAttributesProperty} [params.props] - Additional component attributes
 *
 * @returns {JSX.Element}
 * @constructor
 */
const Input = ({
  data,
  ...props
}) => {
  const {
    answers,
    type,
    name,
    question
  } = data
  if (type === 'checkbox') {
    return (
      <Checkbox
        { ...data }
        answers={ answers }
        name={ name }
        { ...props }
      />
    )
  } else if (type === 'radio') {
    return (
      <Radio
        { ...data }
        answers={ answers }
        name={ name }
        { ...props }
      />
    )
  } else if (type === 'text' || type === 'integer' ) {
    return (
      <TextInput
        { ...data }
        name={ name }
        type={ data?.textType || type }
        { ...props }
      />
    )
  } else if (type === 'textarea') {
    return (
      <TextArea
        { ...data }
        name={ name }
        { ...props }
      />
    )
  } else if (type === 'date' || type === 'datetime' || type === 'time') {
    return (
      <Date
        { ...data }
        name={ name }
        type={ type }
        { ...props }
      />
    )
  }
  else if (type === 'title'  ) {
    return (
      <Title
        { ...data }
        name={ name }
        { ...props }
      />
    )
  }
  else if (type === 'file'  ) {
    return (
      <FilePicker
        { ...data }
        name={ name }
        { ...props }
      />
    )
  }
  else if (type === 'decimal' ) {
    return (
      <Number
        { ...data }
        name={ name }
        { ...props }
      />
    )
  }
}

Input.propTypes = {
  data: wizardSchema.wizardInputProps.isRequired,
  props: PropTypes.object
}

export default Input
