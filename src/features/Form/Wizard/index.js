import React,{useRef,useState,useEffect} from 'react'
import PropTypes from 'prop-types'
import { DateTime } from 'luxon'
import { Formik } from 'formik'
import { array, object, string } from 'yup'

import { DATA } from 'constants/index'
import { wizardSchema } from 'schema'

import Carousel from '../../Carousel'
import Question from './Question'
import SinglePage from './SinglePage'

const { date_format } = DATA

/**
 * Form creation wizard
 *
 * @param {Object} params
 * @param {WizardData} params.data - Form data object
 * @param {JSX.Element} [params.IntroPage] - Component that should be shown as intro of multi-page
 * @param {Boolean} [params.multiPage=false] - Display inputs in carousel
 * @param {Function} params.onSubmit - Form submit action
 * @param {Boolean} [params.requireAll=false] - Make all inputs required
 * @param {string} [params.submitButtonText='Submit'] - Submit button text
 *
 * @returns {JSX.Element}
 * @constructor
 */
const Wizard = ({
  data,
  IntroPage,
  multiPage,
  onSubmit,
  requireAll,
  submitButtonText
}) => {
 
  const formikmRef = useRef(null);

  /**
   * Combine initial values and validation objects
   *
   * @return {{initialValues: {}, validationSchema: ({}|null)}}
   * @private
   */
  const _getFormProps = () => {
    let initialValues = {}
    let validationSchema = {}
    
    for (const screen of data) {
      // get inputs
      const inputs = screen?.inputs?.map((input) => {
        return {
          name: input?.name,
          type: input?.type,
          dependsOn: input?.dependsOn,
          displayValue: input?.displayValue
        }
      })
      // add initial values
      if (screen?.initialValues) {
        initialValues = {
          ...initialValues,
          ...screen.initialValues
        }
      }

      // add validation schema
      if (screen?.validation) {
        validationSchema = {
          ...validationSchema,
          ...screen.validation
        }
      }
      const initValKeys = Object.keys(initialValues)
      const validSchemaKeys = Object.keys(validationSchema)

      // loop through names and create initial values / validation
      for (const input of inputs) {
        const { name, type,dependsOn,displayValue } = input
        if (!initValKeys.includes(name)) {
          switch (type) {
            case 'title':
              initialValues[name] = ''
              break
            case 'checkbox':
              initialValues[name] = []
              break
            case 'datetime':
              initialValues[name] = DateTime.now().toFormat(date_format[type])
              break
            case 'date':
              initialValues[name] = DateTime.now().toFormat(date_format[type])
              break
            case 'time':
              initialValues[name] = DateTime.now().toFormat(date_format[type])
              break
            default:
              initialValues[name] = ''
          }
        }

        if (requireAll && !validSchemaKeys.includes(name)) {
          switch (type) {
            case 'checkbox':
              if (dependsOn && displayValue) {
              validationSchema[name] = array().of(string()).when(dependsOn, {
                is: displayValue, 
                then: array().of(string()).min(1, 'You must select at least one option'),
                otherwise: array().of(string()),
              })}
              else{
                validationSchema[name] = array().of(string()).min(1, 'You must select at least one option')
              }
              break
            case 'title':
              validationSchema[name] = string()
              break
            default:
              if (dependsOn && displayValue) {
                validationSchema[name] = string().when(dependsOn, {
                  is: displayValue, 
                  then: string().required('This field is required'),
                  otherwise: string().notRequired(),
                })
              } else {
                validationSchema[name] = string().required('This field is required')
              }
          }
        }
      }
    }


    return {
      initialValues,
      validationSchema: Object.keys(validationSchema).length > 0 ? object().shape(validationSchema) : null
    }
  }

  /**
   * Validate only visible inputs
   *
   * @param {Function} validateForm - Validate all form inputs
   * @param {Function} setErrors - Set error values
   * @param {number} index - Index of currently shown screen
   *
   * @return {Promise<boolean>}
   * @private
   */
  const _validateVisibleInputs = async (validateForm, setErrors, index) => {
    
    const { inputs } = data?.[index]
    if (inputs) {
      const validation = await validateForm()
      // check if error exists for each field
      for (const input of inputs) {
        if (Object.keys(validation)?.includes(input?.name)) {
          return false
        }
      }

      // Reset form errors
      setErrors({})
    }

    return true
  }

  return (
    <Formik
      initialStatus={{
        visibleSpec: [] // holds name of any spec inputs that are visible
      }}
      onSubmit={ onSubmit }
      enableReinitialize={true}
      validateOnBlur={ true }
      validateOnChange={false}
      { ..._getFormProps() }
    >
      { ({ handleSubmit, setErrors, validateForm,touched,validateField,errors }) => {
        
        if (multiPage) {
          return (
            <Carousel
              data={ data }
              element={ Question }
              IntroPage={ IntroPage }
              onSubmit={ handleSubmit }
              validate={ _validateVisibleInputs.bind(null, validateForm, setErrors) }
            />
          )
        }

        return (
          <SinglePage
            data={ data[0].inputs }
            submitButtonText={ submitButtonText }
          />
        )
      } }
    </Formik>
  )
}

Wizard.propTypes = {
  data: wizardSchema.wizardProps.isRequired,
  IntroPage: PropTypes.element,
  multiPage: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired,
  requireAll: PropTypes.bool,
  submitButtonText: PropTypes.string
}

Wizard.defaultProps = {
  IntroPage: null,
  multiPage: false,
  requireAll: false,
  submitButtonText: 'Submit'
}

export default React.memo(Wizard, (prevProps, nextProps) => {
  return prevProps?.data === nextProps?.data
})