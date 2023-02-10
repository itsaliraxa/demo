import api from 'services/api'
import { API, META } from 'constants/index'
import { diarySchema } from 'schema'
import { diarySelectors } from 'store/selectors'
import { diariesStore } from 'store/actions'

/**
 * Diary api endpoints
 */

const diariesApi = api.injectEndpoints({
  endpoints: (build) => ({
    createAdhocDiary: build.mutation({
      invalidatesTags: ['Diaries', 'Quiz'],
      queryFn: async (
        diary_id,
        api,
        extraOptions,
        baseQuery
      ) => {
        const state = api.getState()
        const { api_token, id } = state?.user

        const response = await baseQuery({
          body: {
            api_token,
            diary_id
          },
          method: 'POST',
          url: API.endpoints.createAdhocDiary(id),
          validateStatus: (response, result) => response.status === 200 && result.success
        }, api)
        if (response?.error) {
          throw response
        }

        if (response?.data) {
          return {
            data: response.data?.schedule?.id
          }
        }

        return { error: 'Sorry, there has been an error. Please try again.' }
      }
    }),
    // onCacheEntryAdded will cache the data after api respose
    getAllDiariesById: build.query({
      onCacheEntryAdded: async (arg, { dispatch, cacheDataLoaded }) => {
        const value = await cacheDataLoaded

        // get non completed diary count
        if (value?.data) {
          const notCompletedTypes = Object.values(value.data?.entities?.types)
            ?.filter(type => {
              return type?.name !== 'completed'
            })
            ?.map(type => type?.id)

          // Getting the current diaries
          const diaries = Object.values(value.data?.entities?.diaries)
            ?.filter(diary => notCompletedTypes.includes(diary?.type))

          dispatch(diariesStore.setCount(diaries?.length || 0))
        }
      },
      providesTags: ['Diaries'],
      queryFn: async (
        { end_date, start_date, dashboard },
        api,
        extraOptions,
        baseQuery
      ) => {
        const state = api.getState()
        const api_token = state?.user?.api_token
        // Passing ids and entities as state in the default RTK Selectors
        const diary_ids = dashboard?.diary_ids
        let diaries = []
        let simpleComplete = false

        if (Object.keys(diary_ids).length > 0 && api_token) {

          for (const key of Object.keys(diary_ids)) {
            const diary_id = diary_ids[key]

            // skip getting simple diaries more than once
            // if (simpleComplete) {
            //   
            //   continue
            // }
           
            const response = await baseQuery({
              body: {
                adhoc: diary_id.adhoc,
                api_token,
                diary_id: diary_id.id,
                end_date,
                start_date
              },
              method: 'POST',
              url: API.endpoints.diary,
              validateStatus: (response, result) => response.status === 200 && result.success
            }, api)
            if (response?.error) {
              throw response
            }

            if (response?.data) {
              if (diary_id.adhoc === 0) {
                simpleComplete = true
              }

              // Array for single daiery data
              diaries = [
                ...diaries,
                ...response.data.dashboard
              ]
            }
          }
        }



        if (diaries.length > 0) {
          return { data: diarySchema.normalizeDiaries(diaries, diary_ids) }
        }

        return { data: null }
      }
    })
  }),
  overrideExisting: META.env === 'uat'
})

const { useCreateAdhocDiaryMutation, useGetAllDiariesByIdQuery } = diariesApi

export default {
  useCreateAdhocDiaryMutation,
  useGetAllDiariesByIdQuery
}
