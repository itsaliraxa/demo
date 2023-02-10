import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'formik'

import { Heading, VStack, } from 'native-base'
import CustomDevider from 'features/Devider'

import { THEME } from 'constants/index'
import { formikSchema, wizardSchema } from 'schema'

import Input from './Input'

/**
 * Renders question and associated inputs
 *
 * @param {Object} params
 * @param {Object} params.data - Input data
 * @param {WizardInputData[]} params.data.inputs
 * @param {FormikData} params.formik
 *
 * @returns {JSX.Element|JSX.Element[]}
 * @constructor
 */
const Question = ({
  data,
  formik: {
    values,
    errors,
    setFieldValue,
    setErrors
  }
}) => {
  const { inputs } = data
  useEffect(() => {
    for (const [key, val] of Object.entries(values)) {
      if (val.length !== 0) {
        setErrors({})
        delete errors[key]
      }
    }
  }, [values])

  useEffect(() => {
    removeFormikValue()

  }, [values, errors])

  const removeFormikValue = () => {
    for (let question of inputs) {
      const { dependsOn, displayValue } = question;
      let parentValue = values[dependsOn]
      let childValue = !!values[question.name].length > 0
      if (dependsOn && displayValue && !!parentValue && childValue) {
        if (parentValue !== displayValue) {
          if (question.type == 'checkbox') {
            setFieldValue(question.name, [])
          } else {
            setFieldValue(question.name, '')
          }
        }
      }
    }
  }  
  return (
    <VStack space={THEME.spacing.lg} w="100%">
      {
        inputs.map((inputData, index) => {
          let hide = !inputData.type.includes('title');
          const { dependsOn, displayValue } = inputData
          let showDevider, condition = true
          // TODO: add animation to specification input
          // hide specification input
          if (dependsOn && displayValue && values?.[dependsOn] !== displayValue) {
            condition = false
            return null;
          }
          showDevider = (!!index == 1 || !!inputs[0]?.specifications>1)
          return (
            <VStack key={`wizard-question-${inputData.name}`}>
              {(showDevider) && <CustomDevider value='Specification' />}
              <VStack
                key={`wizard-question-${inputData.name}`}
                space={THEME.spacing.lg}
                w="100%"
              >
                {(inputData?.question && hide) &&
                  <Heading
                    fontWeight={'light'}
                  >
                    {inputData.question}
                  </Heading>
                }
                <Input data={inputData} />

              </VStack>

            </VStack>
          )
        })
      }
    </VStack>
  )
}

Question.propTypes = {
  data: PropTypes.shape({
    inputs: PropTypes.arrayOf(wizardSchema.wizardInputProps).isRequired
  }).isRequired,
  formik: formikSchema.formikProps.isRequired
}

export default React.memo(connect(Question), (prevProps, nextProps) => {
  return prevProps.values === nextProps.values
})
