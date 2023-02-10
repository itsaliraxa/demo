import React from 'react'
import PropTypes from 'prop-types'
import {
  Alert,
  ArrowForwardIcon,
  Button,
  Heading,
  Stack
} from 'native-base'

import SlideScaleFade from 'features/Animation/SlideScaleFade'
import { THEME } from 'constants/index'

const AdhocAlert = ({
  onPress
}) => (
  <SlideScaleFade direction="out" visible={ true }>
    <Alert
      alignItems="flex-start"
      bgColor="darkBlue.800"
      borderLeftRadius={0}
      borderRightRadius="3xl"
      mb={ THEME.spacing.md }
      mr={ THEME.screen.px }
      px={ THEME.spacing.lg }
    >
      <Stack
        direction="column"
        space={ THEME.spacing.md }
        w="100%"
      >
        <Heading
          color="white"
          fontWeight="extrabold"
          size="md"
        >
          We noticed you haven&apos;t
          {'\n'}
          submitted a diary for today
        </Heading>
      </Stack>
    </Alert>
  </SlideScaleFade>
)

AdhocAlert.propTypes = {
  // onPress: PropTypes.func.isRequired
}

export default AdhocAlert
