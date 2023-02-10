import api from 'services/api'
import { API, META } from 'constants/index'
import { quizSchema } from 'schema'

/**
 * Quiz api endpoints
 */
const quizApi = api.injectEndpoints({
  endpoints: (build) => ({
    getQuizById: build.query({
      providesTags: (result, error, diary_id) => [{ id: diary_id, type: 'Quiz' }, { id: 'LIST', type: 'Quiz' }],
      queryFn: async (
        diary_id,
        api,
        extraOptions,
        baseQuery
      ) => {
        const state = api.getState()
        const { api_token, id: user_id } = state?.user
        const url = API.endpoints.quiz.get(api_token, diary_id, user_id)

        if (api_token && diary_id && user_id) {
          const response = await baseQuery({
            method: 'GET',
            url
          }, api)

          if (response?.error) {
            throw response
          }

          if (response?.data) {
            const {
              diary_languages: languages,
              questions,
              schedule: {
                frequency
              }
            } = response.data

            return {
              data: {
                frequency,
                languages,
                questions: quizSchema.normalizeQuestions(questions)
              }
            }
          }
        }

        return {
          error: 'Sorry, there has been an error. Please try again.'
        }
      }
    }),
    submitQuiz: build.mutation({
      invalidatesTags: ['Diaries'],
      query: ({
        data,
        user_id
      }) => ({
        body: data,
        method: 'POST',
        url: API.endpoints.quiz.post(user_id),
        validateStatus: (response, result) => {
          return response.status === 200 && result.success}
      })
    })
  }),
  overrideExisting: META.env === 'uat'
})

const { useGetQuizByIdQuery, useSubmitQuizMutation } = quizApi

export default {
  useGetQuizByIdQuery,
  useSubmitQuizMutation
}
