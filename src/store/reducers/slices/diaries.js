import { createSlice } from '@reduxjs/toolkit'
import { diarySchema } from 'schema'

export const STORE_NAME = 'diaries'

const { diaryIdsAdapter, initialState } = diarySchema

const diariesSlice = createSlice({
  name: STORE_NAME,
  initialState,
  reducers: {
    /**
     * @param [state]
     * @param payload
     */
    setCount: (state, { payload }) => {
      if (payload) {
        return {
          ...state,
          count: payload
        }
      }
    },
    /**
     * @param [state]
     * @param payload
     */
    setDiaryIds: (state, { payload }) => {
      
      if (payload) {
        // diaryIdsAdapter will separate the diary id and make it key and save the diary data in entity
        diaryIdsAdapter.setAll(state.diary_ids, payload)
      }
    },
    /**
     * @param [state]
     * @param payload
     */
    setStudyName: (state, { payload }) => {
      if (payload) {
        return {
          ...state,
          study_name: payload
        }
      }
    }
  }
})

export const selectors = {
  
  diary_id: diaryIdsAdapter.getSelectors()
}

const { actions, reducer } = diariesSlice

export const { setCount, setDiaryIds, setStudyName } = actions

export default reducer
