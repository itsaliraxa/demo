import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { Animated } from 'react-native'

/**
 * Collapse animation
 *
 * @param {Object} params
 * @param {*} params.children - Component children
 * @param {number} params.height - Content height
 * @param {bool} params.visible - Contents are visible
 *
 * @returns {JSX.Element}
 * @constructor
 */
const Collapse = ({
  children,
  height,
  visible
}) => {
  const collapseAnim = useRef(new Animated.Value(0)).current

  /**
   * Collapse open animation
   */
  const collapseOpen = () => {
    Animated.timing(collapseAnim, {
      duration: 250,
      toValue: height,
      useNativeDriver: false
    }).start()
  }

  /**
   * Collapse close animation
   */
  const collapseClose = () => {
    Animated.timing(collapseAnim, {
      duration: 250,
      toValue: 0,
      useNativeDriver: false
    }).start()
  }

  useEffect(() => {
    if (visible) {
      collapseOpen()
    } else {
      collapseClose()
    }
  }, [visible])

  return (
    <Animated.View
      style={{
        height: collapseAnim,
        overflow: 'hidden'
      }}
    >
      { children }
    </Animated.View>
  )
}

Collapse.propTypes = {
  children: PropTypes.any.isRequired,
  height: PropTypes.number.isRequired,
  visible: PropTypes.bool.isRequired
}

export default Collapse
