import api from 'services/api'
import { API, META } from 'constants/index'
import { diariesStore } from 'store/actions'
import { diarySchema } from 'schema'

/**
 * Get dashboard data
 */
const dashboardApi = api.injectEndpoints({
  endpoints: (build) => ({
    dashboard: build.query({
      invalidatesTags: ['Diaries'],
      onCacheEntryAdded: async (arg, { dispatch, cacheDataLoaded }) => {
        const value = await cacheDataLoaded

        if (value?.data) {
          // push diary ids to dairies store
          if (value.data?.diary_ids) {
            dispatch(diariesStore.setDiaryIds(value.data.diary_ids))
          }
          // push study name to store
          if (value.data?.study_name) {
            dispatch(diariesStore.setStudyName(value.data.study_name))
          }
        }
      },
      providesTags: [{ type: 'Dashboard', id: 'latest' }],
      queryFn: async (
        { end_date, start_date },
        api,
        extraOptions,
        baseQuery
      ) => {
        const state = api.getState()
        const api_token = state?.user?.api_token

        const response = await baseQuery({
          body: {
            api_token,
            end_date,
            start_date
          },
          method: 'POST',
          url: API.endpoints.dashboard,
          validateStatus: (response, result) => response.status === 200 && result.success
        }, api)
        if (response?.error) {
          return { error: response.error }
        }

        if (response?.data) {
          const {
            sections,
            study_name
          } = response?.data?.dashboard
// Getting normalize data form schema & then return
          return {
            data: {
              diary_ids: diarySchema.normalizeDiaryIds(sections),
              study_name
            }
          }
        }

        return {
          error: 'Sorry, there has been an error. Please try again.'
        }
      }
    })
  }),
  overrideExisting: META.env === 'uat'
})

const { useDashboardQuery } = dashboardApi

export default {
  useDashboardQuery
}
