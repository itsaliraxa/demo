import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { string } from 'yup'

import {
  KeyboardAvoidingView,
  Text,
  ScrollView,
  VStack
} from 'native-base'

import { THEME } from 'constants/index'

import Header from 'features/Header'
import Wizard from 'features/Form/Wizard'
import { Platform } from 'react-native'
import { emailServices } from 'services'

const mapState = state => ({ user: state.user })

/**
 * Contact form screen
 *
 * @param {UserStore} user
 *
 * @return {JSX.Element}
 * @constructor
 */
const ContactScreen = ({
  user
}) => {
  const [sendEmail] = emailServices.useSendMutation()

  /**
   * Form wizard object for creating inputs to update user
   */
  const formData = [
    {
      initialValues: {
        email: user.email,
        message: ''
      },
      inputs: [
        {
          label: 'Contact Email',
          name: 'email',
          placeholder: 'Email',
          textType: 'email',
          type: 'text'
        },
        {
          label: 'Your Message',
          name: 'message',
          placeholder: 'Message',
          type: 'textarea'
        }
      ],
      validation: {
        email: string().email('Must be a valid email address').required('Email address is required'),
        message: string().required('Message is required')
      }
    }
  ]

  const _onSubmit = (data, formikBag) => {
    sendEmail(data)
      .unwrap()
      .then((data) => {
        
      })
      .catch(error => 

    formikBag.setSubmitting(false)
  }

  return (
    <>
      <ScrollView>
        <Header subtitle="Get in touch" title="Contact Us" />
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} px={ THEME.screen.px }>
          <VStack space={ THEME.spacing.lg }>
            <Text fontSize="md" px={ THEME.screen.px }>
              Fill out the form and our team will get back to you within 24 hours.
            </Text>
            <Wizard
              data={ formData }
              onSubmit={ _onSubmit }
              submitButtonText="Submit Your Question"
            />
          </VStack>
        </KeyboardAvoidingView>
      </ScrollView>
    </>
  )
}

ContactScreen.propTypes = {
  user: PropTypes.object.isRequired
}

export default connect(mapState)(ContactScreen)
