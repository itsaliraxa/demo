import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'formik'

import {Box,Center, Image,Heading, } from 'native-base'
import chooseIllustration from 'images/choose-illustration.png'

import ErrorMessage from '../ErrorMessage'
import InputLabel from '../InputLabel'

/**
 * Allows user to input text via text area input
 *
 * @param {Object} params
 * @param {FormikData} params.formik
 * @param {string} params.question - Input label
 * @param {...JSX.ElementAttributesProperty} [params.props] - Additional component attributes
 *
 * @returns {JSX.Element}
 * @constructor
 */
const Title = ({
  label,
    name,
    question,
  ...props
}) => {
  return (
    <Box>
      <Center w="100%">
        <Image
          alt="Illustration of a person making a selection"
          mb={10}
          size="2xl"
          source={chooseIllustration}
        />
      </Center>
      <Box>
       { question && <Heading fontWeight={'light'} size="md" textAlign={'justify'} {...props}>{question}</Heading>}
      </Box>
    </Box>
  )
}

Title.propTypes = {
  label: PropTypes.string,
  question: PropTypes.string.isRequired,
  props: PropTypes.object
}

export default connect(Title)
