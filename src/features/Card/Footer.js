import React from 'react'
import PropTypes from 'prop-types'

import { ArrowForwardIcon, Box, Flex } from 'native-base'

/**
 * Card footer
 *
 * @param {Object} params
 * @param {string} params.accentColor - Card accent color
 * @param {*} [params.children] - Component children
 * @param {Boolean} [params.onPress=false] - Card has onPress functionality
 * @param {number} params.padding - Card padding
 *
 * @returns {JSX.Element}
 * @constructor
 */
const Footer = ({
  accentColor,
  children,
  onPress,
  padding
}) => (
  <Flex
    mt="auto"
    p={ padding }
    pt={ 0 }
  >
    { children }
    { onPress && (
      <Box
        alignItems="flex-end"
      >
        <ArrowForwardIcon color={ `${accentColor}.500` } size={ 6 } />
      </Box>
    ) }
  </Flex>
)

Footer.propTypes = {
  accentColor: PropTypes.string.isRequired,
  children: PropTypes.any,
  onPress: PropTypes.bool,
  padding: PropTypes.number.isRequired
}

Footer.defaultProps = {
  onPress: false
}

export default Footer
