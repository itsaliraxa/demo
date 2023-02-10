import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query/react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist'
import api from 'services/api'
import middleware from './middleware'
import rootReducer from './reducers'

// automatically persists data to permanent storage when store is updated
const persistConfig = {
  blacklist: ['api', 'diaries', 'quiz'],
  key: 'root',
  storage: AsyncStorage,
  version: 1
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER
        ]
      }
    }).concat(
      api.middleware,
      // middleware.apiQueryErrorLogger,
      middleware.checkTokenMiddleware
    )
})

setupListeners(store.dispatch)

export default store
