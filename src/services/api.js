import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { API, META } from 'constants/index'

/**
 * Clinical Study Pal API
 */
const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: API.baseURL[META.env]
  }),
  tagTypes: [
    'Dashboard',
    'Diaries',
    'Quiz',
    'User'
  ],
  endpoints: () => ({}), // end points are set in individual files
  reducerPath: 'api'
})

export default api
