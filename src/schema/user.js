import { number, string } from 'prop-types'

/**
 * user store object
 *
 * @typedef {Object} UserStore
 *
 * @property {string} api_token - api token for making requests
 * @property {string} avatar - path to avatar
 * @property {string} email - email address
 * @property {number} id - user id
 * @property {string} mobile_profile_pic_path - url to mobile profile pics
 * @property {string} name - full name
 */

/**
 * Initial user store state
 *
 * @type {{mobile_profile_pic_path: null, api_token: null, name: null, avatar: null, id: null, email: null}}
 */
const initialState = {
  api_token: null,
  avatar: null,
  email: null,
  id: null,
  mobile_profile_pic_path: null,
  name: null
}

/**
 * Normalize response from user api
 *
 * @param {Object} data - User api response
 * @param {Object} data.user
 *
 * @returns {UserStore}
 */
const normalizeUser = (data) => {
  
  const {
    api_token,
    avatar,
    email,
    id,
    mobile_profile_pic_path,
    name
  } = data?.user

  return {
    api_token,
    avatar,
    email,
    id,
    mobile_profile_pic_path,
    name
  }
}

/**
 * React user prop types
 */
const userProps = {
  api_token: string.isRequired,
  avatar: string,
  email: string.isRequired,
  id: number.isRequired,
  mobile_profile_pic_path: string,
  name: string.isRequired
}

export default {
  initialState,
  normalizeUser,
  userProps
}
