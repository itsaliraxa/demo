import { DATA } from 'constants/index'
import { createEntityAdapter } from '@reduxjs/toolkit'
import { normalize, schema } from 'normalizr'
import {
  arrayOf,
  number,
  object,
  oneOf,
  oneOfType,
  shape,
  string,
  array
} from 'prop-types'

/**
 * diary id object
 *
 * @typedef {Object} DiaryIdData
 *
 * @property {(0|1)} adhoc - Is adhoc
 * @property {number} id - ID number
 * @property {string} name - Name
 */

/**
 * diary type object
 *
 * @typedef {Object} DiaryTypeData
 *
 * @property {number} id - ID number
 * @property {string} name - Type name
 */

/**
 * diary object
 *
 * @typedef {Object} DiaryData
 *
 * @property {(0|1)} adhoc - Is adhoc
 * @property {string} created_at - Date created
 * @property {number|DiaryIdData} diary_id - Type of diary
 * @property {string} diary_name - Name
 * @property {number} id - ID number
 * @property {string} title - Intro text
 * @property {number|DiaryTypeData} type
 */

/**
 * diary store object
 *
 * @typedef {Object} DiariesStore
 *
 * @property {number} count - Number of non-completed diaries
 * @property {Object} diary_ids - Normalized diary ids
 * @property {Array} diary_ids.ids
 * @property {Object.<string, DiaryIdData>} diary_ids.entities
 * @property {string} study_name
 */

const { types } = DATA

const diaryIdsAdapter = createEntityAdapter()

/**
 * Initial diary store state
 */
// getInitialState() returns an empty {ids: [], entities: {}} normalized state object
const initialState = {
  count: null,
  diary_ids: diaryIdsAdapter.getInitialState(),
  study_name: null
}

/**
 * Strategy for merging entities that have identical ids
 *
 * @param {Object} entityA
 * @param {Object} entityB
 *
 * @return {Object}
 */
const mergeStrategy = (entityA, entityB) => {

  const entityADiaries = entityA.diaries || []
  const entityBDiaries = entityB.diaries || []

  return {
    ...entityA,
    ...entityB,
    diaries: [
      ...entityADiaries,
      ...entityBDiaries
    ]
  }
}

/**
 * Diary id schema
 */
const diaryIdSchema = new schema.Entity(
  'diary_ids',
  {},
  {
    mergeStrategy,
    processStrategy: (value, parent, key) => {
      switch (key) {
        case 'diary_id':
          return { ...value, diaries: [parent.id] }
        default:
          return { ...value }
      }
    }
  }
)

/**
 * Diary type schema
 */
const typeSchema = new schema.Entity('types', {}, {
  mergeStrategy,
  processStrategy: (value, parent, key) => {

    switch (key) {
      case 'type':
        return { ...value, diaries: [parent.id] }
      default:
        return { ...value }
    }
  }
})

/**
 * Diary schema
 */
const diarySchema = new schema.Entity('diaries', {
  diary_id: diaryIdSchema,
  type: typeSchema
})

/**
 * Normalize diary data returned by diary api
 *
 * @param {Object[]} diaries
 * @param {Object.<string, DiaryIdData>} diary_ids
 *
 * @return {Object}
 */
export const normalizeDiaries = (diaries, diary_ids) => {

  const diaryArr = []

  for (const diary of diaries) {
    const {
      adhoc,
      created_at,
      diary_id,
      id,
      type
    } = diary

    const {
      diary_name,
      title
    } = diary?.diary
    // types are imported from our defined in Constans data
    diaryArr.push({
      adhoc,
      created_at,
      diary_id: {
        ...diary_ids[diary_id],
        diary_id: id
      },
      diary_name,
      id,
      title,
      type: {
        ...types[type],
        diary_id: id
      }
    })
  }


  // normalize dairy data by using normalizr liberary in the shape of {entities,reuslts}
  return normalize(diaryArr, [diarySchema])
}

/**
 * Normalize diary id data passed by dashboard api
 *
 * @param {Object} data
 *
 * @return {Object.<string, DiaryIdData>}
 */
export const normalizeDiaryIds = (data) => {
  const entities = {}

  // Here is key = seaction's name & section = data
  for (const [key, section] of Object.entries(data)) {

    if (section.diaries) {
      for (const diary of section.diaries) {
        const { diary_id, diary_name } = diary
        // Making new Data for Entity
        entities[diary_id] = {
          adhoc: key.includes('adhoc') ? 1 : 0,
          id: diary_id,
          name: diary_name
        }
      }
    }
  }

  return entities
}

/**
 * React diary ID prop types
 */
export const diaryIdProps = shape({
  adhoc: oneOf([0, 1]),
  id: number,
  name: string
})

/**
 * React diary type prop types
 */
export const diaryTypeProps = shape({
  id: number,
  name: string
})

/**
 * React diary prop types
 */
export const adhocDiaryProps = array

export const diaryProps = shape({
  adhoc: oneOf([0, 1]),
  created_at: string,
  diary_id: oneOfType([
    number,
    diaryIdProps
  ]),
  diary_name: string,
  id: number,
  title: string,
  type: oneOfType([
    number,
    diaryTypeProps
  ])
})

/**
 * React diaries store prop types
 */
export const diariesStoreProps = shape({
  count: number,
  diary_ids: shape({
    ids: arrayOf(number),
    entities: object
  }),
  study_name: string
})

export default {
  diariesStoreProps,
  diaryIdProps,
  diaryIdsAdapter,
  diaryProps,
  adhocDiaryProps,
  diaryTypeProps,
  initialState,
  normalizeDiaries,
  normalizeDiaryIds
}
