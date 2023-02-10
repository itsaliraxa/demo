import {
  arrayOf,
  object, objectOf,
  oneOf,
  shape,
  string
} from 'prop-types'

/**
 * input property object
 *
 * @typedef {Object} WizardInputData
 *
 * @property {string[]} [answers] - Answers for checkbox or radio input
 * @property {string} [dependsOn] - Name of parent input
 * @property {string} [displayValue] - Value parent needs to have to display input
 * @property {string} name - Input name
 * @property {('checkbox'|'date'|'datetime'|'radio'|'text'|'textarea'|'time')} type - Input type
 */

/**
 * wizard inputs object
 *
 * @typedef {Object[]} WizardData
 *
 * @property {Object} page - A page that displays inputs
 * @property {Object.<string, (string|number)>} [initialValues] - Input default values (name: value)
 * @property {WizardInputData[]} inputs - Inputs to display on page
 * @property {Object} [validation] - Input validation (name: yup validation)
 */

/**
 * Helper to convert normalized quiz object to wizard format
 *
 * @param {Object.<string, Object>} data - Normalized quiz data
 * @todo - replace data param with quiz type, when available
 *
 * @returns {WizardData}
 */
export const convertToWizardFormat = (data) => {
  const { specifications, questions } = data.entities
  const formData = []

  if (!questions) {
    return null
  }

  for (const id of Object.keys(questions)) {
    
    const question = questions[id]
    const page = { inputs: [] }

    page.inputs.push(question)

    if (question?.specifications?.length > 0) {
      for (const specId of question?.specifications) {
        const specQuestion = specifications?.[specId]

        if (specQuestion) {
          page.inputs.push(specQuestion)
        }
      }
    }

    formData.push(page)
  }

  return formData
}

/**
 * Wizard input prop types
 */
const wizardInputProps = shape({
  answers: arrayOf(string),
  name: string.isRequired,
  type: oneOf([
    'checkbox',
    'date',
    'datetime',
    'radio',
    'text',
    'textarea',
    'time',
    'title',
    'integer',
    'decimal',
    'file'
  ]).isRequired
})

/**
 * Wizard component prop types
 */
const wizardProps = arrayOf(shape({
  initialValues: objectOf(string),
  inputs: arrayOf(wizardInputProps).isRequired,
  validation: object
}))

export default {
  convertToWizardFormat,
  wizardInputProps,
  wizardProps
}
