import React from 'react'
import PropTypes from 'prop-types'
import {
  Alert,
  Heading,
  Square,
  Stack,
  
} from 'native-base'

import { THEME } from 'constants/index'

/**
 * Number of adhoc diaries completed for the day
 *
 * @param {Object} params
 * @param {number} params.count
 * @param {func} params._onPress
 * @return {JSX.Element}
 * @constructor
 */
const AdhocCompleted = ({ count,_onPress }) => (
  <Alert
    bgColor="info.500"
    borderRadius={THEME.borderRadius.md}
    alignItems="flex-start"
    mx={THEME.screen.px}
    my={THEME.spacing.md}
    p={0}
  >
    <Stack
      alignItems="center"
      direction="row"
      space={THEME.spacing.md}
    >
      <Square
        bgColor="white"
        borderRadius={THEME.borderRadius.md}
        m={THEME.spacing.xs}
        mr={0}
        size="xs"
      >
        <Heading
          color={'info.500'}
          size="sm"
        >
          {count}
        </Heading>
      </Square>
      <Stack
        alignItems="center"
        direction="row"
        space={THEME.spacing.md}
      >
        <Heading color="white" fontWeight="semibold" size="sm">
          Total Adhoc Diaries
        </Heading>
        <Heading color="white" fontWeight="semibold" size="sm" onPress={_onPress}>
         Click to View
        </Heading>

      </Stack>

    </Stack>
  </Alert>
)

AdhocCompleted.propTypes = {
  count: PropTypes.number.isRequired,
  _onPress: PropTypes.func.isRequired
}

export default AdhocCompleted
