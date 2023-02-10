import dashboard from './dashboard'
import diary from './diary'
import email from './email'
import quiz from './quiz'
import user from 'services/user'

/**
 * Dashboard api services
 */
export const dashboardServices = {
  ...dashboard
}

/**
 * Diary api services
 */
export const diaryServices = {
  ...diary
}

/**
 * Email api services
 */
export const emailServices = {
  ...email
}

/**
 * Quiz api services
 */
export const quizServices = {
  ...quiz
}

/**
 * User api services
 */
export const userServices = {
  ...user
}
