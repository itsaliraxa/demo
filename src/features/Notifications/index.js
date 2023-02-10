import * as Notifications from 'expo-notifications'
import { META } from 'constants/index'

/**
 * Request notification access
 *
 * @return {Promise<NotificationPermissionsStatus>}
 */
const requestPermissionsAsync = async () => {
  return await Notifications.requestPermissionsAsync()
}

/**
 * Determine if notifications have been granted
 *
 * @param {Object} settings
 *
 * @return {Boolean}
 */
const isGranted = settings => settings.granted ||
  settings.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL ||
  settings.ios?.status === Notifications.IosAuthorizationStatus.AUTHORIZED

/**
 * Check whether user has allowed notifications
 *
 * @return {Promise<Boolean>}
 */
const allowsNotificationsAsync = async () => {
  let isAllowed
  const settings = await Notifications.getPermissionsAsync()

  isAllowed = isGranted(settings)

  // request if not allowed and can be asked again
  if (!isAllowed && settings?.canAskAgain) {
    const permissionResponse = await requestPermissionsAsync()
    isAllowed = isGranted(permissionResponse)
  }

  return isAllowed
}

/**
 * Request notification access, if it hasn't been granted
 */
export const manageNotifications = async () => {
  const isAllowed = await allowsNotificationsAsync()

  if (isAllowed) {
    // set foreground notification handler
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: true
      })
    })

    // get scheduled notifications
    const scheduled = await Notifications.getAllScheduledNotificationsAsync()
    const dailyExists = scheduled.find(val => val.identifier === META.notifications.daily)

    // schedule daily notification
    if (!dailyExists) {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Time to take your Daily Questionnaire!'
        },
        identifier: META.notifications.daily,
        trigger: {
          hour: 12,
          minute: 0,
          repeats: true
        }
      })
    }
  }
}

/**
 * Clear all existing notifications
 *
 * @return {Promise<void>}
 */
export const clearAllNotifications = async () => await Notifications.cancelAllScheduledNotificationsAsync()
