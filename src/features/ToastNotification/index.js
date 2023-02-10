import React from 'react'
import PropTypes from 'prop-types'

import {
  CheckIcon,
  Circle,
  CloseIcon,
  Heading,
  IconButton,
  InfoIcon,
  Stack,
  Text,
  WarningTwoIcon
} from 'native-base'

import { THEME } from 'constants/index'

/**
 * Global Toast Notification
 *
 * @param {Object} params
 * @param {function} params.close
 * @param {string} [params.description]
 * @param {('error'|'info'|success'|'warning')} [params.status='info']
 * @param {string} [params.title]
 *
 * @return {JSX.Element}
 * @constructor
 */
const ToastNotification = ({
  close,
  description,
  status,
  title
}) => {
  let Icon

  switch (status) {
    case 'error':
      Icon = WarningTwoIcon
      break
    case 'success':
      Icon = CheckIcon
      break
    case 'warning':
      Icon = WarningTwoIcon
      break
    default:
      Icon = InfoIcon
      break
  }

  return (
    <Stack
      alignItems="center"
      bgColor="white"
      borderRadius="full"
      direction="row"
      p={ THEME.spacing.xs }
      shadow={3}
      space="sm"
    >
      <Circle
        bgColor={ `${status}.100` }
        p={ THEME.spacing.md }
      >
        <Icon color={ `${status}.500` } size={6} />
      </Circle>
      <Stack
        direction="column"
        flexShrink={1}
      >
        { title && (
          <Heading
            color={ `${status}.500` }
            size="xs"
          >
            { title }
          </Heading>
        ) }
        { description && (
          <Text>
            { description }
          </Text>
        ) }
      </Stack>
      <IconButton
        borderRadius="full"
        colorScheme="gray"
        icon={ <CloseIcon color="gray.500" size={3} /> }
        ml="auto"
        onPress={ close }
        p={ THEME.spacing.md }
      />
    </Stack>
  )
}

ToastNotification.propTypes = {
  close: PropTypes.func.isRequired,
  description: PropTypes.string,
  status: PropTypes.oneOf([
    'error',
    'info',
    'success',
    'warning'
  ]),
  title: PropTypes.string
}

ToastNotification.defaultProps = {
  description: null,
  status: 'info',
  title: null
}

export default ToastNotification
