import React from 'react'
import PropTypes from 'prop-types'

import { PresenceTransition } from 'native-base'

import { THEME } from 'constants/index'

/**
 * Slide scale and fade animation
 *
 * @param {Object} params
 * @param {*} params.children - Component children
 * @param {('in'|'out')} [params.direction='in'] - Animation direction
 * @param {number} [params.speed=100] - Animation speed in milliseconds
 * @param {Boolean} params.visible - Contents are visible
 * @param {...JSX.ElementAttributesProperty} [params.props] - Additional component attributes
 *
 * @returns {JSX.Element}
 * @constructor
 */
const SlideScaleFade = ({
  children,
  direction,
  speed,
  visible,
  ...props
}) => (
  <PresenceTransition
    animate={{
      opacity: 1,
      scale: 1,
      translateX: 0,
      transition: {
        duration: speed,
        type: 'spring'
      }
    }}
    exit={{
      opacity: 0,
      scale: 0.98,
      translateX: direction === 'in' ? -50 : 50,
      transition: {
        duration: speed
      }
    }}
    initial={{
      opacity: 0,
      scale: 0.98,
      translateX: direction === 'in' ? 50 : -50
    }}
    visible={ visible }
    { ...props }
  >
    { children }
  </PresenceTransition>
)

SlideScaleFade.propTypes = {
  children: PropTypes.any.isRequired,
  direction: PropTypes.oneOf(['in', 'out']),
  speed: PropTypes.number,
  visible: PropTypes.bool.isRequired,
  props: PropTypes.object
}

SlideScaleFade.defaultProps = {
  direction: 'in',
  speed: THEME.animation.fast
}

export default SlideScaleFade
