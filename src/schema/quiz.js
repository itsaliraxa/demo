import { normalize, schema } from 'normalizr'
import { DATA } from 'constants/index'

/**
 * question object
 *
 * @typedef {Object} question
 *
 * @property {Object.<(string|number), string>[]} answers - Input values
 * @property {string} [dependsOn] - Id specification question depends on
 * @property {string} [displayValue] - Value parent value must be to show question
 * @property {string} id
 * @property {string} name - Generated input name
 * @property {Object[]} [specifications] - Question specifications (nested)
 * @property {string} question - Question
 * @property {string} type - Input type
 */

const specificationSchema = new schema.Entity('specifications', {}, {
  idAttribute: 'name'
})
const specificationQuestionSchema = new schema.Entity('specificQuestions', {}, {
  idAttribute: 'name'
})

const questionSchema = new schema.Entity('questions', {}, {
  idAttribute: 'name'
})

questionSchema.define({
  specifications: [specificationSchema]
})
specificationSchema.define({
  specifications: [specificationQuestionSchema]
})

/**
 * Normalize question data returned by quiz API
 *
 * @param {Object[]} questions - Questions object returned from API
 * @private
 */
const normalizeQuestions = (questions) => {
  
  const questionArr = questions.map((item, index) => {
    const {
      answer_type,
      answers,
      id,
      question: questionText,
      specifications
    } = item
    const name = `${index}-${id.toString()}`
    const type = DATA.answer_types[parseInt(answer_type)]?.name

    if (!type) {
      return null
    }

    const question = {
      answers,
      id,
      name,
      specifications: [],
      question: questionText,
      type
    }

    if (specifications?.length > 0) {
      // question.specifications = specifications.map(spec => {
    let questionSpecifications = specifications.map(spec => {
       
        const {
          id: specId,
          name: displayValue,
          specification_questions,
          question_id
        } = spec

        // skip invalid spec inputs (parent doesn't have answers that would show spec)
        if (!answers.includes(displayValue)) {
          return null
        }

        try {
          const parsedSpec = JSON.parse(specification_questions)
          const { specification_question } = parsedSpec      
          const vals = Object.keys(specification_question).map(key => specification_question[key]);
          let newArry = vals.map(({name:specName,specification_answer_type,specification_answers},i)=>{
            let specType
            if (!specType) {
              specType = DATA.answer_types[parseInt(specification_answer_type)]?.name

              if (!specType) {
                return null
              }
            }
            return({
              answers: specification_answers,
              dependsOn: name,
              displayValue:displayValue,
              id: specId,
              name: `${index}-${question_id.toString()}-${specId.toString()}-${i}`,
              question: specName,
              type: specType
            })
          })
          return newArry?.filter(item => item);
        } catch (err) {
          console.log('ERROR:', err)
          return null
        }
      })

      question.specifications = questionSpecifications.flat();
    }
    return question
  })?.filter(item => item)

  return normalize(questionArr, [questionSchema])
}

export default {
  normalizeQuestions
}
