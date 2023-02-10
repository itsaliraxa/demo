import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'formik'

import { Button, VStack } from 'native-base'

import { THEME } from 'constants/index'
import { formikSchema, wizardSchema } from 'schema'

import Input from './Input'

/**
 * Load form inputs on a single page
 *
 * @param {Object} params
 * @param {WizardInputData[]} params.data - Input data object
 * @param {FormikData} params.formik - Submit form data
 * @param {string} params.submitButtonText - Submit button text
 *
 * @returns {JSX.Element}
 * @constructor
 */
const SinglePage = ({
  data,
  formik: {
    handleSubmit,
    isSubmitting
  },
  submitButtonText
}) => (
  
  <VStack
    space={ THEME.spacing.lg }
  >
    {
      data.map(input =>
        <Input
          data={ input }
          key={ `wizard-input-${input?.name}` }
        />
      )
    }
    <Button
      isLoading={ isSubmitting }
      mt={ THEME.spacing.sm }
      onPress={ handleSubmit }
      size="lg"
      w="100%"
    >
      { submitButtonText }
    </Button>
  </VStack>
)

SinglePage.propTypes = {
  data: PropTypes.arrayOf(wizardSchema.wizardInputProps).isRequired,
  formik: formikSchema.formikProps.isRequired,
  submitButtonText: PropTypes.string.isRequired
}

export default connect(SinglePage)
