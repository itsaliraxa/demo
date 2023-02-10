import { isRejectedWithValue } from '@reduxjs/toolkit'
import { statusStore, userStore } from 'store/actions'

/**
 * Log an error and show a toast
 */
const apiQueryErrorLogger = (api) => (next) => (action) => {
  // console.log (isRejectedWithValue(action),'isRejectedWithValue(action)')
  if (isRejectedWithValue(action)) {
    // console.warn('There has been an error:', action, api)
    const { originalStatus, status } = action.payload
    const { dispatch } = api

    // Log user out if receives a non json response (assume it's a 401)
    if ((status && status === 'PARSING_ERROR') || (originalStatus && originalStatus === 401)) {
      // dispatch(statusStore.setLoading(true))
      dispatch(userStore.clearUser())
      dispatch(statusStore.setAuth(false))
      dispatch(statusStore.showToast({
        status: 'warning',
        title: 'Login Session Expired',
        description: 'Please log back into your account',
        variant: 'subtle'
      }))

      return next(action)
    }

    dispatch(statusStore.showToast({
      description: action?.payload?.data?.error,
      status: 'error',
      title: 'Something went wrong'
    }))
  }

  return next(action)
}

export default apiQueryErrorLogger
