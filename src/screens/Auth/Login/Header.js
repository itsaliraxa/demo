import React from 'react'
import { Platform } from 'react-native'
import {
  Flex,
  Heading
} from 'native-base'

import { THEME } from 'constants/index'

/**
 * Heading with app name and image
 *
 * @returns {JSX.Element}
 * @constructor
 */
const Header = () => (
  <Flex
    safeAreaTop
    flexDirection="row"
    justifyContent="center"
    pt={ THEME.spacing.xl }
    px={ THEME.screen.px }
    w="100%"
  >
    <Heading
      fontWeight="light"
      size= {Platform.OS=='android' ?"2xl":"3xl" }
    >
      STUDY
    </Heading>
    <Heading
      size= {Platform.OS=='android' ?"2xl":"3xl" }
    >
      PAL
    </Heading>
  </Flex>
)

export default Header
