import { bool, object, shape } from 'prop-types'

/**
 * Status store object
 *
 * @typedef {Object} StatusStore
 *
 * @property {Boolean} isAuth - User is authenticated
 * @property {Boolean} isLoading - App is loading
 * @property {string} last_adhoc_date
 * @property {Boolean} show_adhoc_alert
 * @property {(Object|null)} toast - Show a toast message
 */

/**
 * Initial status store state
 *
 * @type {{isLoading: boolean, toast: null, isAuth: boolean, last_adhoc_date: number, show_adhoc_alert: boolean}}
 */
const initialState = {
  isAuth: false,
  isLoading: false,
  last_adhoc_date: null,
  show_adhoc_alert: false,
  toast: null
}

/**
 * React status prop types
 */
const statusProps = shape({
  isAuth: bool.isRequired,
  isLoading: bool.isRequired,
  toast: object
})

export default {
  initialState,
  statusProps
}
