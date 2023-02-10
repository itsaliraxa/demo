import React from 'react'
import { Flex } from 'native-base'
import { string } from 'yup'

import { userServices } from 'services'
import { THEME } from 'constants/index'

import Footer from './Footer'
import ForgotPassword from './ForgotPassword'
import Header from './Header'
import Wizard from 'features/Form/Wizard'

/**
 * User login screen
 *
 * @returns {JSX.Element}
 * @constructor
 */
const LoginScreen = () => {
  const [triggerAuth] = userServices.useLazyAuthQuery()

  /**
   * Submit login data
   *
   * @param {Object} data - Form values
   * @returns {Promise<void>}
   */
  const onSubmit = async data =>{ 
  return await triggerAuth(data)}

  /**
   * Form wizard object for creating input to login
   */
  const formData = [
    {
      initialValues: {
        email: 'shaider@delvehealth.com',
        password: 'welcome'
      },
      inputs: [
        {
          autoFocus: true,
          icon: 'email-outline',
          name: 'email',
          placeholder: 'Email',
          textType: 'email',
          type: 'text'
        },
        {
          icon: 'key-outline',
          name: 'password',
          placeholder: 'Password',
          textType: 'password',
          type: 'text'
        }
      ],
      validation: {
        email: string().email('Must be a valid email address').required('Email address is required'),
        password: string().required('Password is required')
      }
    }
  ]

  return (
    <Flex
      flex={ 1 }
      flexDirection="column"
      justifyContent="space-between"
    >
      <Header />
      <Flex px={ THEME.screen.px }>
        <Wizard
          data={ formData }
          onSubmit={ onSubmit }
          submitButtonText="Login"
        />
        <ForgotPassword />
      </Flex>
      <Footer />
    </Flex>
  )
}

export default LoginScreen
