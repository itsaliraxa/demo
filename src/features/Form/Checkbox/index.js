import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'formik'

import { Checkbox as NBCheckbox, VStack } from 'native-base'

import { THEME } from 'constants/index'
import { formikSchema } from 'schema'

import ErrorMessage from '../ErrorMessage'
import Input from './Input'
import InputLabel from '../InputLabel'

/**
 * Allows user to select value via checkbox input(s)
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
const Checkbox = ({
  answers,
  formik: {
    errors,
    setFieldValue,
    values
  },
  label,
  name
}) => (
  <>
    { label &&
      <InputLabel>{ label }</InputLabel>
    }
    <NBCheckbox.Group
      name={ name }
      onChange={ (val) => setFieldValue(name, val)}
      value={ values[name] }
    >
      <VStack space={ THEME.spacing.md } w="100%">
        { answers.map(answer =>
          <Input
            answer={ answer }
            key={ `${name}-${answer}-checkbox` }
            name={ name }
          />
        )}
      </VStack>
    </NBCheckbox.Group>
    { !!errors[name] &&
      <ErrorMessage>{ errors[name] }</ErrorMessage>
    }
  </>
)

Checkbox.propTypes = {
  answers: PropTypes.arrayOf(PropTypes.string).isRequired,
  formik: formikSchema.formikProps.isRequired,
  label: PropTypes.string,
  name: PropTypes.string.isRequired
}

Checkbox.defaultProps = {
  label: null
}

export default connect(Checkbox)
