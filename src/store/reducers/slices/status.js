import { createSlice } from '@reduxjs/toolkit'
import { statusSchema } from 'schema'

export const STORE_NAME = 'status'

const { initialState } = statusSchema

const statusSlice = createSlice({
  name: STORE_NAME,
  initialState,
  reducers: {
    /**
     * @param [state]
     */
    clearToast: (state) => {
      return {
        ...state,
        toast: null
      }
    },
    /**
     * @param [state]
     * @param {Object} action
     * @param {Boolean} payload
     */
    setAuth: (state, { payload }) => {
      return {
        ...state,
        isAuth: payload
      }
    },
    /**
     * @param [state]
     * @param {Object} action
     * @param {number} payload
     */
    setLastAdhocDate: (state, { payload }) => {
      return {
        ...state,
        last_adhoc_date: payload
      }
    },
    /**
     * @param [state]
     * @param {Object} action
     * @param {Boolean} payload
     */
    setLoading: (state, { payload }) => {
      return {
        ...state,
        isLoading: payload
      }
    },
    /**
     * @param [state]
     * @param {Object} action
     * @param {Boolean} payload
     */
    setShowAdhocAlert: (state, { payload }) => {
      return {
        ...state,
        show_adhoc_alert: payload
      }
    },
    /**
     * @param [state]
     * @param {Object} action
     * @param {Object} action.payload
     */
    showToast: (state, { payload }) => {
      return {
        ...state,
        toast: payload
      }
    }
  }
})

const { actions, reducer } = statusSlice

export const {
  clearToast,
  setAuth,
  setLastAdhocDate,
  setLoading,
  setShowAdhocAlert,
  showToast
} = actions

export default reducer
