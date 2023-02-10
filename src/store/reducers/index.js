import { combineReducers } from '@reduxjs/toolkit'

import api from 'services/api'
import diaries from './slices/diaries'
import status from './slices/status'
import user from './slices/user'

const reducer = combineReducers({
  [api.reducerPath]: api.reducer,
  diaries,
  status,
  user
})

export default reducer
