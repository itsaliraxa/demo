import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { string } from 'yup'

import {
  Button,
  Center,
  Modal,
  Text,
  VStack
} from 'native-base'

import Wizard from 'features/Form/Wizard'
import { setLoading } from 'store/reducers/slices/status'
import { THEME } from 'constants/index'
import { userServices } from 'services'

const mapDispatch = {
  setLoading
}

const ForgotPassword = ({ setLoading }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [triggerForgotPassword] = userServices.useLazyForgotPasswordQuery()

  /**
   * Form wizard object for creating input to login
   */
  const formData = [
    {
      initialValues: {
        email: 'ss@email.com'
      },
      inputs: [
        {
          autoFocus: true,
          icon: 'email-outline',
          name: 'email',
          placeholder: 'Email Address',
          textType: 'email',
          type: 'text'
        }
      ],
      validation: {
        email: string().email('Must be a valid email address').required('Email address is required')
      }
    }
  ]

  const onSubmit = async data => {
    const response = await triggerForgotPassword(data)
    
    setLoading(false)
    // TODO: Needs to be completed
  }

  return (
    <>
      <Center w="100%" mt={ THEME.spacing.md }>
        <Button
          colorScheme="secondary"
          onPress={ () => setIsOpen(true) }
          size="md"
          variant="link"
        >
          Forgot Password?
        </Button>
      </Center>
      <Modal
        isOpen={ isOpen }
        onClose={ () => setIsOpen(false) }
        size="xl"
      >
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>Forgot Your Password?</Modal.Header>
          <Modal.Body>
            <VStack space={ THEME.spacing.md }>
              <Text>
                Enter the email associated with your account and we&apos;ll send an email with instructions on how to reset your password.
              </Text>
              <Wizard
                data={ formData }
                onSubmit={ onSubmit }
                submitButtonText="Send Email"
              />
            </VStack>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </>
  )
}

ForgotPassword.propTypes = {
  setLoading: PropTypes.func.isRequired
}

export default connect(
  null,
  mapDispatch)(ForgotPassword)
