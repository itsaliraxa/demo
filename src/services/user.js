import api from 'services/api'
import { API, META } from 'constants/index'
import { statusStore, userStore } from 'store/actions'
import { userSchema } from 'schema'

/**
 * Save user data to permanent storage
 *
 * @param arg
 * @param {Object} api - API utility object
 * @param {Function} api.dispatch - Dispatch to store action
 * @param {Function} api.cacheDataLoaded - Cache data status
 *
 * @returns {Promise<void>}
 * @private
 */
const _onUserCacheEntryAdded = async (arg, { dispatch, cacheDataLoaded }) => {
  const value = await cacheDataLoaded

  // set user store value and auth status
  if (value?.data) {
    
    dispatch(userStore.setUser(value.data))
    dispatch(statusStore.setAuth(true))
  }
}

/**
 * Transform user data returned from api
 *
 * @param {Object} response
 * @param {Object} response.user
 *
 * @returns {UserStore}
 * @private
 */
const _transformUserResponse = (response) => userSchema.normalizeUser(response)

/**
 * Authenticate user
 */
const userApi = api.injectEndpoints({
  endpoints: (build) => ({
    auth: build.query({
      onCacheEntryAdded: _onUserCacheEntryAdded,
      transformResponse: _transformUserResponse,
      providesTags: ['User'],
      query: (body) => ({
        body,
        method: 'POST',
        url: API.endpoints.user.auth,
        validateStatus: (response, result) => { 
         return response.status === 200 && result.success}
      })
    }),
    forgotPassword: build.query({
      query: (body) => ({
        body,
        method: 'POST',
        url: API.endpoints.user.forgot,
        validateStatus: (response, result) => response.status === 200 && result.success
      })
    }),
    // validateStatus will resolve the promise and return true or reject.
    updateUser: build.mutation({
      onCacheEntryAdded: _onUserCacheEntryAdded,
      transformResponse: _transformUserResponse,
      query: ({
        data,
        id
      }) => ({
        body: data,
        method: 'POST',
        url: API.endpoints.user.update(id),
        validateStatus: (response, result) => response.status === 200 && result.success
      })
    })
  }),
  overrideExisting: META.env === 'uat'
})

const {
  useLazyAuthQuery,
  useLazyForgotPasswordQuery,
  useUpdateUserMutation
} = userApi

export default {
  useLazyAuthQuery,
  useLazyForgotPasswordQuery,
  useUpdateUserMutation
}
