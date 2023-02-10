import React, { useCallback, useState,useEffect } from 'react'
import PropTypes from 'prop-types'

import { Box } from 'native-base'

import { THEME } from 'constants/index'

import CarouselItem from './Item'
import ProgressBar from 'features/ProgressBar'
import SlideScaleFade from 'features/Animation/SlideScaleFade'



/**
 * Carousel component
 *
 * @param {Object} params
 * @param {JSX.Element} [params.IntroPage] - Intro page to be used as first page
 * @param {Object[]} params.data - Page data
 * @param {JSX.Element} params.element - Page element
 * @param {Function} onSubmit - Submit function
 * @param {Function} [validate] - Validate data between screens
 *
 * @returns {JSX.Element}
 * @constructor
 */
const Carousel = ({
  IntroPage,
  data,
  element,
  onSubmit,
  validate
}) => {
 
  const [animDir, setAnimDir] = useState('in')
  const [isVisible, setIsVisible] = useState(true)
  const [progressWidth, setProgressWidth] = useState(200)
  const [renderedItem, setRenderedItem] = useState(0)
  const [renderQueue, setRenderQueue] = useState(0)
  const numOfItems = IntroPage ? data.length : (data.length - 1)

  const CarouselElement = element

  /**
   * Check if a next carousel item exists
   *
   * @returns {boolean}
   * @private
   */
  const _hasNextItem = () => numOfItems >= (renderedItem + 1)

  /**
   * Check if a previous carousel item exists
   *
   * @returns {boolean}
   * @private
   */
  const _hasPreviousItem = () => (renderedItem - 1) >= 0

  /**
   * Display next item, if it exists
   *
   * @private
   */
  const _goToNextItem = async () => {
    const nextIndex = renderedItem + 1
    let isValid = true

    if (validate) {
      if (!IntroPage || (IntroPage && renderedItem !== 0)) {
        isValid = await validate(IntroPage ? renderedItem - 1 : renderedItem)
      }
    }

    if (isValid) {
      if (animDir !== 'in') {
        setAnimDir('in')
      }

      setRenderQueue(nextIndex)
      setIsVisible(false)
    }
  }

  /**
   * Display previous item, if it exists
   *
   * @private
   */
  const _goToPreviousItem = () => {
    if (animDir !== 'out') {
      setAnimDir('out')
    }

    setRenderQueue(renderedItem - 1)
    setIsVisible(false)
  }

  /**
   * Update rendered carousel item
   *
   * @returns {JSX.Element}
   * @private
   */
  const _getRenderedItem = () => {
    // Get intro screen if rendered item is zero
    if (renderedItem === 0 && IntroPage) {
      return (
        <CarouselItem next={ _hasNextItem() ? _goToNextItem : null }>
          { IntroPage }
        </CarouselItem>
      )
    }

    return (
      <CarouselItem
        next={ _hasNextItem() ? _goToNextItem : null }
        onSubmit={ renderedItem === numOfItems ? onSubmit : null }
        previous={ _hasPreviousItem() ? _goToPreviousItem : null }
      >
        <CarouselElement data={ data[renderedItem - 1] } />
      </CarouselItem>
    )
  }

  /**
   * Show new item when current item has completed animating
   *
   * @param {string} type - transition complete type
   * @private
   */
  const _onTransitionComplete = (type) => {
      setRenderedItem(renderQueue)
      setIsVisible(true)
    // if (type === 'exited' && renderedItem !== renderQueue) {
    //   setRenderedItem(renderQueue)
    //   setIsVisible(true)
    // }
  }

  const VisibleItem = useCallback(() => _getRenderedItem(), [renderedItem])

  return (
    <Box
      onLayout={event => setProgressWidth((event.nativeEvent.layout.width) * 0.9)}
      w="100%"
    >
      <ProgressBar
        height={ 15 }
        mb={ THEME.spacing.lg }
        progress={ renderedItem / numOfItems }
        width={ progressWidth }
      />
      <SlideScaleFade
        direction={ animDir }
        onTransitionComplete={ _onTransitionComplete }
        visible={ isVisible }
      >
        <VisibleItem />
      </SlideScaleFade>
    </Box>
  )
}

Carousel.propTypes = {
  IntroPage: PropTypes.element,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  element: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object
  ]).isRequired,
  onSubmit: PropTypes.func.isRequired,
  validate: PropTypes.func
}

Carousel.defaultProps = {
  IntroPage: null,
  validate: null
}

export default Carousel
