import React from 'react'
import PropTypes from 'prop-types'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'

import { ScrollView } from 'native-base'

import { THEME } from 'constants/index'

/**
 * Scroll container component that accounts for tab spacing at bottom
 *
 * @param {Object} params
 * @param {*} params.children - Component children
 * @param {...JSX.ElementAttributesProperty} [params.props] - Additional component attributes
 *
 * @return {JSX.Element}
 * @constructor
 */
const ScrollContainer = ({
  children,
  ...props
}) => {
  const tabBarHeight = useBottomTabBarHeight()

  return (
    <ScrollView
      _contentContainerStyle={{
        paddingBottom: (tabBarHeight + THEME.spacing['2xl'])
      }}
      { ...props }
    >
      { children }
    </ScrollView>
  )
}

ScrollContainer.propTypes = {
  children: PropTypes.any.isRequired,
  props: PropTypes.object
}

export default ScrollContainer
