import React from 'react'
import PropTypes from 'prop-types'
import { Modal } from 'react-native'

import {
  Center,
  Spinner
} from 'native-base'

import { THEME } from 'constants/index'

/**
 * Loading spinner component
 *
 * @param {Object} params
 * @param {Boolean} params.visible - Spinner is visible
 *
 * @returns {JSX.Element}
 * @constructor
 */
const Loading = ({ visible }) => (
  <Modal
    animationType="slide"
    transparent={ true }
    visible={ visible }
  >
    <Center
      position="absolute"
      top={0}
      left={0}
      width="100%"
      height="100%"
      zIndex={99}
    >
      <Center
        bgColor="white"
        shadow={9}
        p={ THEME.spacing.md }
        borderRadius={ THEME.borderRadius.md }
      >
        <Spinner />
      </Center>
    </Center>
  </Modal>
)

Loading.propTypes = {
  visible: PropTypes.bool.isRequired
}

export default Loading
