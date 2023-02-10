/**
 * API constant values
 */
export default {
  baseURL: {
    email: 'https://api.mailjet.com/v3.1/',
    prod: 'https://app.clinicalstudypal.com/api/',
    uat: 'https://dev3.delvehealth.com/api/'
    // uat: 'https://demo.delvehealth.com/api/'
    // uat: 'http://192.168.1.11:8000/api/'
  },
  endpoints: {
    createAdhocDiary: (user_id) => `user/${user_id}/adhoc/diary/create`,
    dashboard: 'user/dashboard',
    diary: 'user/diaries',
    email: {
      send: 'send'
    },
    quiz: {
      get: (api_token, diary_id, user_id) =>
        `user/${user_id}/schedule/${diary_id}/questions?&api_token=${api_token}`,
      post: (user_id) => `user/${user_id}/questions/answers`
    },
    user: {
      auth: 'login',
      forgot: 'forgot-password',
      update: (user_id) => `user/${user_id}/profile/update`
    }
  },
  timeout: 5000
}
