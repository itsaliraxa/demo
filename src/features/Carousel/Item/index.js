import React from 'react'
import PropTypes from 'prop-types'

import Card from 'features/Card'
import Footer from './Footer'

/**
 * Carousel item component
 *
 * @param {Object} params
 * @param {*} [params.children] - Component children
 * @param {Function} [params.next] - Go to next item
 * @param {Function} [params.onSubmit] - Submit form data
 * @param {Function} [params.previous] - Go to previous item
 * @param {...JSX.ElementAttributesProperty} [params.props] - Additional component attributes
 *
 * @returns {JSX.Element}
 * @constructor
 */
const CarouselItem = ({
  children,
  next,
  onSubmit,
  previous,
  ...props
}) => {
  return (
    <Card
      _footer={
        <Footer
          next={ next }
          onSubmit={ onSubmit }
          previous={ previous }
        />
      }
      {...props}
    >
      { children }
    </Card>
  )
}

CarouselItem.propTypes = {
  children: PropTypes.any,
  next: PropTypes.func,
  onSubmit: PropTypes.func,
  previous: PropTypes.func,
  props: PropTypes.object
}

CarouselItem.defaultProps = {
  next: null,
  onSubmit: null,
  previous: null
}

export default CarouselItem
