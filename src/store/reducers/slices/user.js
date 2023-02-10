import { createSlice } from '@reduxjs/toolkit'
import { userSchema } from 'schema'

export const STORE_NAME = 'user'

const { initialState } = userSchema

const userSlice = createSlice({
  name: STORE_NAME,
  initialState,
  reducers: {
    /**
     * @param [state]
     * @param action
     * @param {UserStore} action.payload
     */
    setUser: (state, { payload }) => {
      return {
        ...state,
        ...payload
      }
    },
    clearUser: () => {
      return initialState
    }
  }
})

const { actions, reducer } = userSlice

export const { setUser, clearUser } = actions

export default reducer
