import {
  bool,
  func,
  object,
  shape
} from 'prop-types'

/**
 * Formik data object
 *
 * @typedef {Object} FormikData
 *
 * @property {Object.<string, string>} errors - Form input error messages
 * @property {Function} handleChange - Handle input change event
 * @property {Function} handleSubmit - Handle form submit event
 * @property {Boolean} isSubmitting - Form is submitting
 * @property {Function} setFieldValue - Update form input value
 * @property {Object.<string, *>} values - Form input values
 */

/**
 * React formik prop types
 */
const formikProps = shape({
  errors: object.isRequired,
  handleChange: func.isRequired,
  handleSubmit: func.isRequired,
  isSubmitting: bool.isRequired,
  setFieldValue: func.isRequired,
  values: object.isRequired
})

export default {
  formikProps
}
