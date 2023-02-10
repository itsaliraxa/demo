import React from 'react'
import { connect } from 'react-redux'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useTheme } from 'native-base'

import TabBar from 'features/TabBar'
import screens from 'screens'
import { diarySchema } from 'schema'

// import Contact from 'screens/Contact'
import Dashboard from 'screens/Dashboard'
// import DevMenu from 'screens/DevMenu'
import Profile from 'screens/Profile'

const Tab = createBottomTabNavigator()

const mapState = state => ({ diaries: state.diaries })

/**
 * Tab Navigator instance
 *
 * @param {Object} params
 * @param {DiariesStore} params.diaries - Diaries store object
 * @returns {JSX.Element}
 * @constructor
 */
const TabNavigator = ({
  diaries: {
    count
  }
}) => {
  const { colors } = useTheme()

  return (
    <Tab.Navigator
      initialRouteName={ screens.auth.dashboard }
      screenOptions={{
        headerShown: false,
        
      }}
      sceneContainerStyle={{
        backgroundColor: colors.coolGray['100']
      }}
      tabBar={ props => <TabBar { ...props } /> }
    >
      <Tab.Screen
        component={ Dashboard }
        name={ screens.auth.dashboard }
        options={{
          headerTitle: () => null,
          // tabBarBadge: count || null,
          tabBarIcon: () => ({
            base: 'home-variant-outline',
            focused: 'home-variant'
          }),
          title: 'Home'
        }}
      />
      <Tab.Screen
        component={ Profile }
        name={ screens.auth.profile }
        options={{
          headerTitle: () => null,
          tabBarIcon: () => ({
            base: 'account-outline',
            focused: 'account'
          }),
          title: 'Profile'
        }}
      />
      {/* <Tab.Screen
        component={ Contact }
        name={ screens.auth.contact }
        options={{
          headerTitle: () => null,
          tabBarIcon: () => ({
            base: 'tooltip-text-outline',
            focused: 'tooltip-text'
          }),
          title: 'Contact'
        }}
      /> */}
      {/* <Tab.Screen
        component={ DevMenu }
        name={ screens.dev }
        options={{
          headerTitle: () => null,
          tabBarIcon: () => ({
            base: 'bandage',
            focused: 'bandage'
          }),
          title: 'Dev'
        }}
      /> */}
    </Tab.Navigator>
  )
}
TabNavigator.propTypes = {
  diaries: diarySchema.diariesStoreProps.isRequired
}

export default connect(mapState)(TabNavigator)
