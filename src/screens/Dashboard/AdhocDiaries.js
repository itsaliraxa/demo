import React from 'react'
import { DateTime } from 'luxon'
import { useNavigation } from '@react-navigation/native'

import {
  Box,
  Text,
  VStack
} from 'native-base'

import screens from 'screens'
import { THEME } from 'constants/index'
import { diarySchema } from 'schema'

import Card from 'features/Card'
import DashboardHeading from './DashboardHeading'

/**
 * Show Adhoc Diaries
 *
 * @param {Array} params
 * @param {DiaryData} params.data - Adhoc diary object
 *
 * @returns {JSX.Element}
 * @constructor
 */
const AdhocDiaries = ({
  data
}) => {

  const COLOR_HUE = 200
  // const dataKeys = Object.keys(data)
  const navigation = useNavigation()

  return (
    <Box mx={THEME.screen.px}>
      {/* <DashboardHeading mb={THEME.spacing.md}>Adhoc Diaries</DashboardHeading> */}
      <VStack space={THEME.spacing.md}>
        {data ?
          data.map((diary, index) => (
            <Card
              bgColor={`purple.${COLOR_HUE}`}
              key={`adhoc-diary-${index}-${diary?.id}`}
              mt={THEME.spacing.regular}
              onPress={() => navigation.navigate(screens.auth.quiz, { diary })}
              // subtitle={DateTime.fromSQL(diary.created_at).toFormat('LLLL d')}
              title={diary?.diary_name}
            >
              <Text>
                Please complete at your earliest convenience
              </Text>
            </Card>
          )):null
        }
      </VStack>
    </Box>
  )
}
AdhocDiaries.propTypes = {
  data: diarySchema.adhocDiaryProps.isRequired
}

export default AdhocDiaries
