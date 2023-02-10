import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'formik'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Icon, Input } from 'native-base'

import ErrorMessage from '../ErrorMessage'
import InputLabel from '../InputLabel'
import { formikSchema } from 'schema'

/**
 * Allows user to input text via keyboard
 *
 * @param {Object} params
 * @param {Boolean} [params.autoFocus=false] - Focus on input by default
 * @param {FormikData} params.formik - Input errors
 * @param {string} [params.icon] - Material community icon name
 * @param {string} [params.label] - Input label
 * @param {string} params.name - Input name
 * @param {string} [params.placeholder] - Text displayed before input has been entered
 * @param {('done'|'go'|'next'|'search'|'send')} [params.returnKeyType] - Determines how the return key should look
 * @param {('email'|'password'|'text')} [params.type='text'] - Specifies autocomplete hints for the system
 * @param {...JSX.ElementAttributesProperty} [params.props] - Additional component attributes
 *
 * @returns {JSX.Element}
 * @constructor
 */
const TextInput = ({
  autoFocus,
  formik: {
    errors,
    handleChange,
    values,
    touched,
    handleBlur
  },
  icon,
  label,
  name,
  placeholder,
  returnKeyType,
  type,
  ...props
}) => {
  let autoCompleteType = null
  let keyboardType = 'default'
  let textContentType = null

  switch (type) {
    case 'email':
      autoCompleteType = 'email'
      keyboardType = 'email-address'
      textContentType = 'emailAddress'
      break
    case 'password':
      autoCompleteType = 'password'
      textContentType = 'password'
      break
    case 'integer':
      autoCompleteType = 'off'
      textContentType =='number'
      keyboardType = 'numeric'
      break
  }

  return (
    <>
      { label &&
        <InputLabel>{ label }</InputLabel>
      }
      <Input
        autoCompleteType={ autoCompleteType }
        // autoFocus={ autoFocus }
        InputLeftElement={ icon
          ? <Icon as={ MaterialCommunityIcons } name={ icon } size="sm" ml={6} />
          : null }
        isFullWidth
        isInvalid={ !!errors?.[name] }
        keyboardType={ keyboardType }
        onChangeText={ handleChange(name) }
        placeholder={ placeholder }
        returnKeyType={ returnKeyType }
        secureTextEntry={ type === 'password' }
        textContentType={ textContentType }
        value={ values[name] }
        { ...props }
      />
      { (!!errors?.[name]) &&
        <ErrorMessage>{ errors[name] }</ErrorMessage>
      }
    </>
  )
}

TextInput.propTypes = {
  autoFocus: PropTypes.bool,
  formik: formikSchema.formikProps.isRequired,
  icon: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  returnKeyType: PropTypes.oneOf([
    'done',
    'go',
    'next',
    'search',
    'send'
  ]),
  type: PropTypes.oneOf([
    'email',
    'password',
    'text',
    `integer`
  ]),
  props: PropTypes.object
}

TextInput.defaultProps = {
  autoFocus: false,
  icon: null,
  label: null,
  placeholder: '',
  returnKeyType: null,
  type: 'text'
}

export default connect(TextInput)
