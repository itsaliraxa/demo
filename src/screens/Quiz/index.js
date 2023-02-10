import React, { useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { DateTime } from 'luxon'
import { useNavigation } from '@react-navigation/native'

import {
  Box,
  Center,
  ScrollView
} from 'native-base'

import { convertToWizardFormat } from 'schema/wizard'
import { getApiCachedData } from 'utils/storage'
import { quizServices } from 'services'
import { statusStore } from 'store/actions'

import Header from './Header'
import IntroCard from './IntroCard'
import Wizard from 'features/Form/Wizard'
import { cos } from 'react-native-reanimated'

const mapState = state => ({
  api: state.api,
  last_adhoc_date: state.status.last_adhoc_date,
  user: state.user
})

const mapDispatch = {
  setLastAdhocDate: statusStore.setLastAdhocDate,
  setLoading: statusStore.setLoading,
  setShowAdhocAlert: statusStore.setShowAdhocAlert,
  showToast: statusStore.showToast
}

/**
 * Diary quiz screen
 *
 * @param {Object} params
 * @param {Object} params.api - API store object
 * @param {number} params.last_adhoc_date - Last date adhoc diary was completed
 * @param {Object} params.route - React navigation route object
 * @param {Function} params.setLastAdhocDate
 * @param {Function} params.setLoading - Update loading state
 * @param {Function} params.setShowAdhocAlert
 * @param {Function} params.showToast - Show toast message
 * @param {Object} params.user - User store object
 *
 * @todo - Add languages
 *
 * @return {JSX.Element|null}
 * @constructor
 */
const QuizScreen = ({
  api,
  last_adhoc_date,
  route,
  setLastAdhocDate,
  setLoading,
  setShowAdhocAlert,
  showToast,
  user
}) => {

  const { params: { diary } } = route
  const { data, isFetching } = quizServices.useGetQuizByIdQuery(diary.id)

  const { study_name } = getApiCachedData(api, 'Dashboard', 'latest')

  const [submitQuiz] = quizServices.useSubmitQuizMutation()
  const [wizardData, setWizardData] = useState(null)
  const [formData, setFormData] = useState({
    _token: user?.api_token,
    answer: null,
    diary_id: diary?.diary_id,
    frequency: null,
    id: diary.adhoc == 0 ? diary?.id : null,
    questions: null
  })
  const [isReady, setIsReady] = useState(false)

  const navigation = useNavigation()

  const { adhoc } = diary

  /**
   * Update form data object value
   *
   * @param {string} prop - Property name
   * @param {string|Object} val - Property value
   *
   * @returns {*}
   * @private
   */
  const _updateFormValue = (prop, val) => {


    setFormData({
      ...formData,
      [prop]: val
    })
  }

  /**
   * Submit quiz data
   *
   * @param {Object} values - Form data
   *
   * @returns {Promise<void>}
   */
  const onSubmit = async (values) => {
    const completedFormData = {
      ...formData
    }

    const answer = {}

    setLoading(true)

    for (const [id, selected_answer] of Object.entries(values)) {

      const splitId = id.split('-')
      const name = splitId[1]
      const specName = splitId[2]

      if (specName) {
        // spec input
        const { dependsOn, displayValue } = data?.questions?.entities?.specifications?.[id]

        // skip adding spec if display value is not satisfied
        if (displayValue && dependsOn && displayValue !== values[dependsOn]) {
          continue
        }

        answer[name].specifications = {
          ...answer[name].specifications,
          [specName]: selected_answer
        }
      } else {
        // regular input
        answer[name] = {
          ...answer[name],
          selected_answer
        }
      }
    }

    completedFormData.answer = answer
    completedFormData.questions = Object.keys(answer)
    console.log(completedFormData,'completedFormData')
    submitQuiz({
      data: {
        api_token: user.api_token,
        data: JSON.stringify(completedFormData)
      },
      user_id: user.id
    })
      .unwrap()
      .then(response => {
        console.log(response, 'response at submit quiz screen')
        if (response.success) {
          // const dNow = DateTime.now()
          // if (adhoc) {
          //   // set adhoc date and hide alert
          //   setLastAdhocDate(dNow.toMillis())
          //   setShowAdhocAlert(false)
          // } else {
          //   // show adhoc message if one hasn't been submitted
          //   const dLast = last_adhoc_date ? DateTime.fromMillis(last_adhoc_date) : null

          //   if ((dLast && !dLast.hasSame(dNow, 'day')) || !dLast) {
          //     setShowAdhocAlert(true)
          //   }
          // }

          navigation.pop()

          showToast({
            description: response?.message,
            status: 'success',
            title: diary?.diary_name
          })
        }
      })
      .catch((error) => { setLoading(false), console.log(error, 'error at submitQuiz') })
  }

  useEffect(() => {
    const abortController = new AbortController()
    if (!isFetching) {
      if (data?.questions) {
        setWizardData(convertToWizardFormat(data.questions))
      }

      if (data?.frequency) {

        _updateFormValue('frequency', data.frequency)
      }
      setIsReady(true)
    } else {
      // TODO: close and show error message
    }
    return () => {
      abortController.abort()
      // stop the query by aborting on the AbortController on unmount
    }
  }, [isFetching])

  if (!isReady) {
    return null
  }

  return (
    <Box
      bgColor="blueGray.100"
      flex={1}
    >
      <Header date={diary.adhoc == 0 ? diary?.created_at : null} study_name={study_name} />
      <ScrollView>
        <Center
          mb={10}
          px={4}
          w="100%"
        >
          <Wizard
            data={wizardData}
            IntroPage={<IntroCard diary_name={diary?.diary_name} introText={diary?.title} />}
            multiPage
            onSubmit={onSubmit}
            requireAll
          />
        </Center>
      </ScrollView>
    </Box>
  )
}

QuizScreen.propTypes = {
  api: PropTypes.object.isRequired,
  last_adhoc_date: PropTypes.number,
  route: PropTypes.object.isRequired,
  setLastAdhocDate: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
  setShowAdhocAlert: PropTypes.func.isRequired,
  showToast: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

QuizScreen.defaultProps = {
  last_adhoc_date: null
}

export default connect(
  mapState,
  mapDispatch
)(QuizScreen)
