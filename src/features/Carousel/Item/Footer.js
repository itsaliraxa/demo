import React from 'react'
import PropTypes from 'prop-types'

import { Button, Flex } from 'native-base'

import { THEME } from 'constants/index'

/**
 * Carousel item footer component
 *
 * @param {Object} params
 * @param {Function} [params.next] - Go to next item
 * @param {Function} [params.onSubmit] - Submit form data
 * @param {Function} [params.previous] - Go to previous item
 *
 * @returns {JSX.Element}
 * @constructor
 */
const Footer = ({
  next,
  onSubmit,
  previous
}) => (
  <Flex
    flexDirection="row"
    mt={ THEME.spacing.md }
    w="100%"
  >
    { previous &&
      <Button
        minW="45%"
        onPress={ previous }
        size="lg"
        variant="subtle"
      >
        Previous
      </Button>
    }
    { next &&
      <Button
        minW="45%"
        ml="auto"
        onPress={ next }
        size="lg"
      >
        Next
      </Button>
    }
    { onSubmit &&
      <Button
        colorScheme="success"
        minW="45%"
        ml="auto"
        onPress={ onSubmit }
        size="lg"
      >
        Submit
      </Button>
    }
  </Flex>
)

Footer.propTypes = {
  next: PropTypes.func,
  onSubmit: PropTypes.func,
  previous: PropTypes.func
}

export default Footer
