import React, { useEffect, useState } from 'react'
import PropTypes, { object } from 'prop-types'
import { connect, useSelector } from 'react-redux'
import { DateTime } from 'luxon'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'

import { Box, Flex } from 'native-base'

import screens from 'screens'
import { DATA, THEME } from 'constants/index'
import { dashboardServices, diaryServices } from 'services'
import { statusSchema } from 'schema'
import { statusStore } from 'store/actions'
import firebase from '@react-native-firebase/app';
import crashlytics from '@react-native-firebase/crashlytics';


import AdhocAlert from './AdhocAlert'
import AdhocCompleted from './AdhocCompleted'
import AdhocDiaries from './AdhocDiaries'
import CompletedMessage from './CompletedMessage'
// import CreateAdhocButton from './CreateAdhocButton'
import DashboardHeading from './DashboardHeading'
import Header from 'features/Header'
import ScrollContainer from 'features/ScrollContainer'
import SimpleDiaries from './SimpleDiaries'
import CustomDevider from 'features/Devider'
// import api from 'services/api'


const mapDispatch = { setLoading: statusStore.setLoading }
const mapState = (state) => ({
  diary_ids: state.diaries?.diary_ids?.entities,
  status: state.status
})

/**
 * Dashboard Screen
 *
 * @param {Object} params
 * @param {Object} params.diary_ids - Available diary ids
 * @param {Function} params.navigation - React navigation object
 * @param {StatusStore} params.status - Status store object
 * @param {Function} params.setLoading - Set loading state
 *
 * @returns {JSX.Element}
 * @constructor
 */
const DashboardScreen = ({
  diary_ids,
  navigation,
  status: {
    isLoading,
    show_adhoc_alert
  },
  setLoading
}) => {
  //  const state= useSelector((state) => console.log(state, 'redux state'))

  // const state = useSelector((state) => state)
  // const { queries } = state.api

  const [adhocId, setAdhocId] = useState([])
  const [createAdhocDiary] = diaryServices.useCreateAdhocDiaryMutation()
  const [parsedDiaryData, setParsedDiaryData] = useState({})
  const [showDiaryAlert, setShowDiaryAlert] = useState(false)

  const dtNow = DateTime.now()
  const end_date = dtNow.plus({ days: 1 }).toFormat(DATA.date_format.date)
  const start_date = dtNow.toFormat(DATA.date_format.date)

  const { data: dashboard, isFetching: dashboardIsFetching } = dashboardServices.useDashboardQuery({ end_date, start_date })
  const { data: diaries, isFetching: diaryIsFetching } = diaryServices.useGetAllDiariesByIdQuery({ end_date, start_date, dashboard }, { skip: !dashboard })
  const simpleCardColors = [
    'primary',
    'orange'
  ]
  const tabBarHeight = useBottomTabBarHeight()

  // show loading spinner while loading data
  useEffect(() => {
    console.log(firebase,'firebase >>> >> ')
    console.log(crashlytics(),'crashlytics >>> >> ')
    console.log(firebase.crashlytics(),'firebase.crashlytics() >>> >> ')
    firebase.crashlytics().log('loading diaries & dashboard');
    if ((dashboardIsFetching || diaryIsFetching) && !isLoading) {
      setLoading(true)
    } else if (!dashboardIsFetching && !diaryIsFetching && isLoading) {
      setLoading(false)
    }
  }, [dashboardIsFetching, diaryIsFetching])

  /**
   * Create and open adhoc diary
   *
   * @private
   */
  const _createAdhocDiary = () => {
    let id = adhocDiaries[0]?.diary_id;
    let diary = diaries?.entities?.diaries?.[id]
  }

  /**
   * Get adhoc diary id value
   *
   * @returns {string|null}
   * @private
   */
  const _getAdhocDiaryId = () => {

    if (!diaries) {
      // TODO: show an error message
      return null
    }
    const { entities: { diaries: diaryData } } = diaries
    // convert obj to array & separate adhoc
    const vals = Object.keys(diaryData).map(key => diaryData[key]).filter((item) => item.adhoc == 1 && item);
    // if want only id then uncoment this
    let diary_id = [... new Set(vals.map(x => x.diary_id))];
    return diary_id || null
  }

  /**
   * Parse diary data into adoc-type > diary_id type
   * @private
   */
  const _parseDiaryData = () => {
    if (!diaries) {
      return
    }
    const { entities: { diaries: diaryData, types, diary_ids }, result: diaryIds } = diaries
    const completedTypeId = Object.values(types)?.find(type => type?.name === 'completed')?.id
    let parsed = {
      adhoc: [],
      totalAdhoc: {},
      completedAdhocCount: 0,
      simple: {}
    }

    if (diaryIds.length > 0) {
      for (const id of diaryIds) {
        const diary = diaryData[id]
        const adhoc = diary.adhoc === 1 ? 'totalAdhoc' : 'simple'
        const diary_id = diary.diary_id
        const type = diary.type
        // Simple diaries obj
        if (diary && diary.type == 0) {
          parsed = {
            ...parsed,
            [adhoc]: {
              ...(parsed[adhoc] || {}),
              [diary_id]: [
                ...(parsed[adhoc][diary_id] || []),
                { ...diary }
              ]
            }
          }
        }
        // Adhoc diaries obj
        if (adhoc === 'totalAdhoc') {
          // Adhoc completed count
          if (completedTypeId && completedTypeId === type) {
            parsed.completedAdhocCount = parsed.completedAdhocCount + 1
          }
          parsed = {
            ...parsed,
            [adhoc]: {
              ...(parsed[adhoc] || {}),
              [diary_id]: [
                ...(parsed[adhoc][diary_id] || []),
                { ...diary }
              ]
            }
          }
        }
      }
      let adhoc = Object.keys(diaryData).map(key => diaryData[key]).filter((item) => item.adhoc == 1 && item);
      // getting unique obj by diary_id
      let adhoc_unique = adhoc.filter((a, i) => adhoc.findIndex((s) => a.diary_id === s.diary_id) === i);
      // parsed.simple = simple
      parsed.adhoc = adhoc_unique
    }
    setShowDiaryAlert(Object.keys(parsed?.simple).length > 0 ? true : false);
    setParsedDiaryData({
      ...parsedDiaryData,
      ...parsed
    })
  }
  const _viewAdhocDiaries = () => {
    const { totalAdhoc } = parsedDiaryData
    navigation.navigate(screens.auth.adhocDiariesList, { data: totalAdhoc })
  }
  useEffect(() => {
    if (!diaries) {
      return
    }
    if (adhocId.length == 0) {
      setAdhocId(_getAdhocDiaryId())
    }
    _parseDiaryData()
  }, [diaries])

  if (isLoading) {
    return null
  }
  return (
    <>
      <Flex flex={1}>
        <ScrollContainer>
          <Header
            subtitle={dtNow.toFormat('cccc, LLLL d').toUpperCase()}
            title={dashboard?.study_name || 'Welcome'}
          />
          {/* Adhoc Alert */}
          {showDiaryAlert && (
            <AdhocAlert />
          )}
          {/* Simple Diaries */}
          {(diaries && parsedDiaryData?.simple && Object.keys(parsedDiaryData?.simple).length > 0) &&
            Object.entries(parsedDiaryData.simple).map(([id, data], index) => (
              <Box key={`simple-diaries-${id}`}>
                <DashboardHeading px={THEME.screen.px}>{data?.[0]?.diary_name}</DashboardHeading>
                {
                  data
                    ? (
                      <SimpleDiaries
                        bgColor={simpleCardColors?.[index]}
                        data={data}
                        key={`simple-diaries-${id}`}
                      />
                    )
                    : (
                      <CompletedMessage
                        bgColor={simpleCardColors?.[index]}
                        key={`simple-diaries-completed-${id}`}
                        visible={true}
                      />
                    )
                }
              </Box>
            ))
          }
          {/* Completed Message */}
          {(diaries && parsedDiaryData?.simple && Object.keys(parsedDiaryData?.simple).length == 0) &&
            <CompletedMessage
              bgColor={simpleCardColors?.[0]}
              key={'no-diaries-exist'}
              visible={true}
            />
          }
          {/* Adhoc diaries */}
          {(parsedDiaryData?.adhoc && parsedDiaryData.adhoc.length > 0) &&
            <>
              <CustomDevider value='Adhoc Diaries' />
              {/* Completed adhoc count */}
              <AdhocCompleted count={parsedDiaryData.completedAdhocCount} _onPress={_viewAdhocDiaries} />
              <AdhocDiaries data={parsedDiaryData?.adhoc} />
            </>

          }

        </ScrollContainer>
      </Flex>
      {/* {(adhocId.length > 0) &&
        <CreateAdhocButton
          bottom={tabBarHeight + 30}
          label="Daily Diary"
          onPress={_createAdhocDiary}
          right={THEME.screen.px}
        />
      } */}
    </>
  )
}

DashboardScreen.propTypes = {
  diary_ids: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
  status: statusSchema.statusProps.isRequired,
  setLoading: PropTypes.func.isRequired
}

export default connect(
  mapState,
  mapDispatch
)(DashboardScreen)
