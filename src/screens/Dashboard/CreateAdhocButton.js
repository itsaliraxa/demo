import React from 'react'
import PropTypes from 'prop-types'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import { Fab, Icon } from 'native-base'

/**
 * FAB Component
 *
 * @param {Object} params
 * @param {...JSX.ElementAttributesProperty} [params.props] - Additional component attributes
 *
 * @returns {JSX.Element}
 * @constructor
 */
const CreateAdhocButton = ({ ...props }) => (
  <Fab
    colorScheme="primary"
    borderRadius="2xl"
    icon={
      <Icon
        as={ MaterialCommunityIcons }
        name="book-open-variant"
        size="sm"
      />
    }
    placement="bottom-right"
    shadow={2}
    { ...props }
  />
)

CreateAdhocButton.propTypes = {
  props: PropTypes.object
}

export default CreateAdhocButton
