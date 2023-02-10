import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'formik'

import { Radio as NBRadio, VStack } from 'native-base'

import { THEME } from 'constants/index'
import { formikSchema } from 'schema'

import ErrorMessage from '../ErrorMessage'
import Input from './Input'
import InputLabel from '../InputLabel'

/**
 * Allows user to select value via radio inputs
 *
 * @param {Object} params
 * @param {string[]} params.answers - Radio answers
 * @param {FormikData} params.formik
 * @param {string} [params.label] - Input label
 * @param {string} params.name - Input name
 *
 * @returns {JSX.Element}
 * @constructor
 */
const Radio = ({
  answers,
  formik: {
    errors,
    handleChange,
    handleBlur,
    values,
    touched,
    setTouched
  },
  label,
  name
}) => (
  <>
    { label &&
      <InputLabel>{ label }</InputLabel>
    }
    <NBRadio.Group
      name={ name }
      onChange={ handleChange(name)}
      onBlur={()=>setTouched(name)}
      value={ values[name] }
    >
      <VStack
        space={ THEME.spacing.md }
        w="100%"
      >
        {
          answers.map((answer) => (
            <Input
              answer={ answer }
              key={ `${name}-${answer}-radio` }
              name={ name }
            />
          ))
        }
      </VStack>
    </NBRadio.Group>
    { (!!errors[name] ) &&
      <ErrorMessage>{ errors[name] }</ErrorMessage>
    }
  </>
)

Radio.propTypes = {
  answers: PropTypes.arrayOf(PropTypes.string),
  formik: formikSchema.formikProps.isRequired,
  label: PropTypes.string,
  name: PropTypes.string.isRequired
}

Radio.defaultProps = {
  label: null
}

export default connect(Radio)
