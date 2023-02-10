import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native'
import { useReduxDevToolsExtension } from '@react-navigation/devtools'
import { useToast } from 'native-base'
import { BlurView } from 'expo-blur'

import screens from 'screens'
import { statusStore } from 'store/actions'
import { clearAllNotifications, manageNotifications } from 'features/Notifications'

import Loading from 'features/Loading'
import Quiz from 'screens/Quiz'
import AdhocDiariesList from 'screens/AdhocDiariesList'
import TabNavigator from './navigators/TabNavigator'
import ToastNotification from 'features/ToastNotification'
import UnauthenticatedNavigator from './navigators/UnauthenticatedNavigator'

const mapState = state => ({ status: state.status })

const mapDispatch = {
  clearToast: statusStore.clearToast,
  setLoading: statusStore.setLoading
}

const Stack = createNativeStackNavigator()

/**
 * React Navigation container
 *
 * @param {Object} params
 * @param {Function} params.clearToast
 * @param {StatusStore} params.status
 *
 * @returns {JSX.Element}
 */
const navigationContainer = ({
  setLoading,
  clearToast,
  status: {
    isAuth,
    isLoading,
    toast
  }
}) => {
  const navigationRef = useNavigationContainerRef()
  const globalToast = useToast()

  useReduxDevToolsExtension(navigationRef)
  useEffect(() => {
    if (isLoading) {
      setLoading(false)
      // let timeOut = setTimeout(() => {
      //   setLoading(false)
      // }, 1000)
      // return (() => {
      //   clearTimeout(timeOut);
      // });
    }
  }, [isAuth])
  // add clear notifications
  if (isAuth) {
    useEffect(() => manageNotifications, [])
  } else {
    useEffect(() => clearAllNotifications, [])
  }

  useEffect(() => {
    if (toast) {
      const toastId = 'global-toast'

      globalToast.show({
        id: toastId,
        onCloseComplete: () => clearToast(),
        placement: 'top',
        render: () => {
          return <ToastNotification close={() => globalToast.close(toastId)} {...toast} />
        }
      })
    }
  }, [toast])
  return (
    <NavigationContainer ref={navigationRef}>
      <Loading visible={isLoading} />
      <Stack.Navigator>
        {isAuth && (
          <>
            <Stack.Screen
              name={screens.auth.tabs}
              options={{
                headerTitle: () => null,
                headerStatusBarHeight: 0,
                headerShadowVisible: false,
                headerTransparent: true,
                headerBackground: () => (
                  <BlurView
                    style={{
                      width: '100%',
                      height: '100%',
                      position: 'absolute'
                    }}
                  />
                )
              }}
            >
              {(props) => (
                <TabNavigator {...props} />
              )}
            </Stack.Screen>
            <Stack.Screen
              component={Quiz}
              name={screens.auth.quiz}
              options={{
                headerShown: false,
                presentation: 'modal'
              }}
            />
            <Stack.Screen
              component={AdhocDiariesList}
              name={screens.auth.adhocDiariesList}
              options={{
                headerTitle: 'Adhoc Diaries',
                headerBackTitleVisible: false,
                // headerShown: false,
                // presentation: 'modal'
              }}
            />
          </>
        )}
        {!isAuth && (
          <Stack.Screen
            component={UnauthenticatedNavigator}
            name={screens.unauth.root}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

navigationContainer.propTypes = {
  clearToast: PropTypes.func.isRequired,
  status: PropTypes.object.isRequired
}

export default connect(
  mapState,
  mapDispatch
)(navigationContainer)
