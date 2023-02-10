import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'formik'

import { TextArea as NBTextArea } from 'native-base'

import ErrorMessage from '../ErrorMessage'
import InputLabel from '../InputLabel'

/**
 * Allows user to input text via text area input
 *
 * @param {Object} params
 * @param {FormikData} params.formik
 * @param {string} params.label - Input label
 * @param {string} params.name - Input name
 * @param {...JSX.ElementAttributesProperty} [params.props] - Additional component attributes
 *
 * @returns {JSX.Element}
 * @constructor
 */
const TextArea = ({
  formik: {
    errors,
    handleChange,
    values
  },
  label,
  name,
  ...props
}) => {
  return (
    <>
      { label &&
        <InputLabel>{ label }</InputLabel>
      }
      <NBTextArea
        isInvalid={ !!errors?.[name] }
        onChangeText={ handleChange(name) }
        value={ values[name] }
        { ...props }
      />
      { !!errors?.[name] &&
        <ErrorMessage>{ errors[name] }</ErrorMessage>
      }
    </>
  )
}

TextArea.propTypes = {
  formik: PropTypes.shape({
    errors: PropTypes.object.isRequired,
    handleChange: PropTypes.func.isRequired,
    values: PropTypes.object.isRequired
  }).isRequired,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  props: PropTypes.object
}

export default connect(TextArea)
