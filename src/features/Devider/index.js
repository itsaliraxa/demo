import React, { Children } from 'react'
import { View, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

import Heading from './hedaing'

import { Box, Flex } from 'native-base'

const CustomDevider = ({ value }) => (
  <Box alignItems="center" w="160" alignSelf='center' >
    <Flex direction="row" p="4" alignItems={'center'}>
      <View style={[styles.divider, { marginRight: 5 }]} />
      <Heading>
        {value}
      </Heading>
      <View style={[styles.divider, { marginLeft: 5 }]} />
    </Flex>
  </Box>
)
CustomDevider.propTypes = {
  value: PropTypes.string,
}

CustomDevider.defaultProps = {
  value: 'Between Text',
}
export default CustomDevider

const styles = StyleSheet.create({
  divider: { borderStyle: 'dashed', borderWidth: 1, borderColor: 'muted.400', width: '100%' }
})