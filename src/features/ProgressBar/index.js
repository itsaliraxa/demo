import React from 'react'
import PropTypes from 'prop-types'
import * as Progress from 'react-native-progress'

import { Box, useToken } from 'native-base'

/**
 * Progress bar component
 *
 * @param {Object} params
 * @param {string} [params.filledColor='primary.500'] - Progress bar filled color
 * @param {number} [params.height=8] - Progress bar height
 * @param {number} params.progress - Progress bar amount filled in (decimal between 0-1)
 * @param {string} [params.unfilledColor='blueGray.200'] - Progress bar unfilled color
 * @param {number} [params.width=100] - Progress bar width
 * @param {...JSX.ElementAttributesProperty} [params.props] - Additional react component properties
 *
 * @returns {JSX.Element}
 * @constructor
 */
const ProgressBar = ({
  filledColor,
  height,
  progress,
  unfilledColor,
  width,
  ...props
}) => {
  const [
    filled,
    unfilled
  ] = useToken('colors', [
    filledColor,
    unfilledColor
  ])

  return (
    <Box
      alignItems="center"
      { ...props }
    >
      <Progress.Bar
        borderRadius={ 999 }
        borderWidth={0}
        color={ filled }
        height={ height }
        progress={ progress }
        unfilledColor={ unfilled }
        width={ width }
      />
    </Box>
  )
}

ProgressBar.propTypes = {
  filledColor: PropTypes.string,
  height: PropTypes.number,
  progress: PropTypes.number.isRequired,
  unfilledColor: PropTypes.string,
  width: PropTypes.number
}

ProgressBar.defaultProps = {
  filledColor: 'primary.500',
  height: 8,
  unfilledColor: 'blueGray.200',
  width: 100
}

export default ProgressBar
