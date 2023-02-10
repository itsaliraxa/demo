import base64 from 'base-64'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { API } from 'constants/index'

/**
 * Mailjet email API
 */
const emailApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: API.baseURL.email,
    prepareHeaders: (headers, { getState }) => {
      const API_KEY = 'b1746eec610bc79ccdf7a5dd14ab4cad'
      const API_SECRET = 'c074ecfba7c1ce948443819e2f1d955d'
      const TOKEN = base64.encode(`${API_KEY}:${API_SECRET}`)

      

      headers.set('authorization', `Basic ${TOKEN}`)

      return headers
    }
  }),
  tagTypes: ['Email'],
  endpoints: (build) => ({
    send: build.mutation({
      invalidatesTags: ['Email'],
      queryFn: async (
        { email, message },
        api,
        extraOptions,
        baseQuery
      ) => {
        const state = api.getState()
        const { id, name } = state?.user
        const body = {
          Messages: [
            {
              From: {
                Email: 'jmiller@delvehealth.com',
                Name: 'Clinical Study Pal Contact Form'
              },
              // HTMLPart: '<h3>Dear passenger, welcome to Mailjet!</h3><br />May the delivery force be with you!',
              Subject: `New Message From ${name}`,
              TextPart: message,
              To: [
                {
                  Email: 'nabays@gmail.com',
                  Name: 'Clinical Study Pal'
                }
              ]
            }
          ]
        }

        const response = await baseQuery({
          body,
          method: 'POST',
          url: API.endpoints.email.send
        }, api)

        if (response?.data?.Messages?.[0]?.Status === 'success') {
          return response
        }

        if (response?.error) {
          return { error: response.error?.data }
        }

        return { error: 'Sorry, there has been an error. Please try again.' }
      }
    })
  }),
  reducerPath: 'api'
})

const {
  useSendMutation
} = emailApi

export default {
  useSendMutation
}
