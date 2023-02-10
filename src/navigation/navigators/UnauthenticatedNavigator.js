import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useToken } from 'native-base'

import screens from 'screens'
import Login from 'screens/Auth/Login'

const Stack = createNativeStackNavigator()

/**
 * Screens for unauthenticated users
 *
 * @todo - Move theme values to theme directory
 *
 * @returns {JSX.Element}
 * @constructor
 */
const UnauthenticatedNavigator = () => {
  const BG_COLOR = useToken('colors', 'coolGray.100')

  return (
    <Stack.Navigator
      initialRouteName={ screens.unauth.login }
      screenOptions={{
        cardStyle: { backgroundColor: BG_COLOR },
        headerShown: false
      }}
    >
      <Stack.Screen
        component={ Login }
        name={ screens.unauth.login }
      />
    </Stack.Navigator>
  )
}

export default UnauthenticatedNavigator
