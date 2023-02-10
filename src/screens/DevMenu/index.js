import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import PropTypes from 'prop-types'
import * as Notifications from 'expo-notifications'

import { connect } from 'react-redux'

import {
  Button,
  Divider,
  Heading,
  ScrollView,
  Stack
} from 'native-base'

import api from 'services/api'
import { THEME } from 'constants/index'
import { statusStore, userStore } from 'store/actions'

import Header from 'features/Header'

const { util } = api

const mapDispatch = {
  clearUser: userStore.clearUser,
  invalidateTags: util.invalidateTags,
  resetApiState: util.resetApiState,
  showToast: statusStore.showToast,
  setAuth: statusStore.setAuth
}

/**
 * Dev screen that should only be shown when in UAT mode
 *
 * @param {Object} params
 * @param {Function} params.clearUser
 * @param {Function} params.invalidateTags
 * @param {Function} params.resetApiState
 * @param {Function} params.setAuth
 * @param {Function} params.showToast
 *
 * @return {JSX.Element}
 * @constructor
 */
const DevMenuScreen = ({
  clearUser,
  invalidateTags,
  resetApiState,
  setAuth,
  showToast
}) => {
  const CacheOptions = () => (
    (
      <Stack
        direction="column"
        px={ THEME.screen.px }
        space={ THEME.spacing.lg }
      >
        <Heading
          color="gray.500"
          size="xs"
        >
          Cache Options
        </Heading>
        <Stack
          direction="row"
          space={ THEME.spacing.md }
        >
          <Button
            flexGrow="1"
            onPress={ () => {
              resetApiState()
              showToast({
                status: 'success',
                title: 'Local cache cleared'
              })
            } }
            variant="subtle"
          >
            Clear Local Cache
          </Button>
          <Button
            flexGrow="1"
            onPress={ () => {
              clearUser()
              // resetApiState()
              invalidateTags(['User'])
              setAuth(false)
              showToast({
                status: 'success',
                title: 'User data cleared'
              })
            } }
            variant="subtle"
          >
            Clear User Data
          </Button>
        </Stack>
        <Button
          onPress={ async () => {
            await AsyncStorage.clear()
            setAuth(false)
            showToast({
              status: 'success',
              title: 'Storage cleared',
              description: 'Requires app to be closed and restarted'
            })
          } }
          variant="subtle"
        >
          CLEAR STORAGE
        </Button>
      </Stack>
    )
  )

  const PushNotifications = () => (
    <Stack
      direction="column"
      px={ THEME.screen.px }
      space={ THEME.spacing.lg }
    >
      <Heading
        color="gray.500"
        size="xs"
      >
        Push Notifications
      </Heading>
      <Button
        onPress={ async () => Notifications.scheduleNotificationAsync({
          content: {
            body: 'Hello, I am a test notification',
            title: 'Test Notification'
          },
          trigger: {
            seconds: 1
          }
        }) }
        variant="subtle"
      >
        Create Push Notification (1s)
      </Button>
      <Button
        onPress={ async () => Notifications.cancelAllScheduledNotificationsAsync() }
        variant="subtle"
      >
        Clear All Notifications
      </Button>
    </Stack>
  )

  const ToastNotifications = () => (
    <Stack
      direction="column"
      px={ THEME.screen.px }
      space={ THEME.spacing.lg }
    >
      <Heading
        color="gray.500"
        size="xs"
      >
        Toast Notifications
      </Heading>
      <Button
        variant="subtle"
        onPress={ () => showToast({
          status: 'success',
          title: 'Test Toast',
          description: 'Hello, I am a test toast'
        }) }
      >
        Show Toast
      </Button>
    </Stack>
  )

  return (
    <>
      <ScrollView>
        <Header
          title="Dev Menu"
          subtitle="(UAT only)"
        />
        <CacheOptions />
        <Divider my={ THEME.spacing.lg } />
        <PushNotifications />
        <Divider my={ THEME.spacing.lg } />
        <ToastNotifications />
      </ScrollView>
    </>
  )
}

DevMenuScreen.propTypes = {
  clearUser: PropTypes.func.isRequired,
  invalidateTags: PropTypes.func.isRequired,
  resetApiState: PropTypes.func.isRequired,
  showToast: PropTypes.func.isRequired,
  setAuth: PropTypes.func.isRequired
}

export default connect(
  null,
  mapDispatch
)(DevMenuScreen)
