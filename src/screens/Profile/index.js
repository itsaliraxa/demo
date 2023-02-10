import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Platform } from 'react-native'
import { string } from 'yup'

import { KeyboardAvoidingView, ScrollView, Pressable } from 'native-base'

import { THEME } from 'constants/index'
import { userServices } from 'services'

import Header from './Header'
// import Header from 'features/Header'
import Wizard from 'features/Form/Wizard'

import api from 'services/api'
import { statusStore, userStore } from 'store/actions'
import { Feather } from '@expo/vector-icons'

const { util } = api
const mapState = state => ({ user: state.user })
const mapDispatch = {
  clearUser: userStore.clearUser,
  invalidateTags: util.invalidateTags,
  showToast: statusStore.showToast,
  setAuth: statusStore.setAuth,
  resetApiState: util.resetApiState,
}

/**
 * Profile screen used for updating user profile information
 *
 * @param {Object} params
 * @param {UserStore} params.user
 * @param {Function} params.clearUser
 * @param {Function} params.invalidateTags
 * @param {Function} params.resetApiState
* @param {Function} params.setAuth
 * @param {Function} params.showToast
 * @return {JSX.Element}
 * @constructor
 */
const ProfileScreen = ({ user, clearUser, invalidateTags, setAuth, showToast,resetApiState }) => {
  const [updateUser] = userServices.useUpdateUserMutation()

  /**
   * Form wizard object for creating inputs to update user
   */
  const formData = [
    {
      initialValues: {
        email: user.email || '',
        name: user.name || '',
        password: '',
        passwordConfirmation: ''
      },
      inputs: [
        {
          autoFocus: true,
          label: 'Email',
          name: 'email',
          placeholder: 'Email',
          textType: 'email',
          type: 'text'
        },
        {
          label: 'Full Name',
          name: 'name',
          placeholder: 'Full Name',
          type: 'text'
        },
        {
          label: 'Password',
          name: 'password',
          placeholder: 'Password',
          textType: 'password',
          type: 'text'
        },
        {
          label: 'Confirm Password',
          name: 'passwordConfirmation',
          placeholder: 'Confirm Password',
          textType: 'password',
          type: 'text'
        }
      ],
      validation: {
        email: string().email('Must be a valid email address').required('Email address is required'),
        name: string().required('Name is required'),
        password: string().required('Password is required'),
        passwordConfirmation: string()
          .when('password', (password, schema) =>
            password ? schema.oneOf([password], 'Password confirmation does not match password') : schema
          )
          .required('Password confirmation is required')
      }
    }
  ]

  /**
   * Submit user update form
   *
   * @param {Object} data
   * @param {Object} formikBag
   *
   * @private
   */
  const _onSubmit = (data, formikBag) => {
    updateUser({
      data: {
        ...data,
        api_token: user.api_token
      },
      id: user.id
    })
      .unwrap()
      .then(() => formikBag.setSubmitting(false))
  }
  const handleLogout = () => {
    clearUser()
    resetApiState()
    invalidateTags(['User'])
    setAuth(false)
    showToast({
      status: 'success',
      title: 'User logout'
    })
  }
  const logoutIcon = () => {
    return <Pressable
      mt={THEME.spacing.lg}
      onPress={handleLogout}
      alignSelf={'flex-end'}
    >
      <Feather name="log-out" size={24} color='primary' />
    </Pressable>
  }
  return (
    <ScrollView>
      <Header title="Profile" subtitle="Edit Your" _right={true} >
        {logoutIcon()}
      </Header>
      {/* <Header title="Profile" subtitle="Edit Your" /> */}
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} px={THEME.screen.px}>
        <Wizard
          data={formData}
          onSubmit={_onSubmit}
          submitButtonText="Update Profile"
        />
      </KeyboardAvoidingView>
    </ScrollView>
  )
}

ProfileScreen.propTypes = {
  user: PropTypes.object.isRequired
}

export default connect(mapState, mapDispatch)(ProfileScreen)

