import React from 'react'
import { DateTime } from 'luxon'
import { useNavigation } from '@react-navigation/native'

import {
  Box,
  Text,
  VStack,
  ScrollView
} from 'native-base'

import { THEME } from 'constants/index'

import Header from './Header'
import Card from 'features/Card'
/**
 * Show Adhoc Diaries
 *
 * @param {Object} params
 * @param {DiaryData} params.data - Adhoc diary object
 *
 * @returns {JSX.Element}
 * @constructor
 */
const AdhocDiariesList = ({
  route
}) => {
  const { params: { data } } = route
  const COLOR_HUE = 200
  const dataKeys = Object.keys(data)
  const navigation = useNavigation()

  return (
    <Box
      bgColor="blueGray.100"
      flex={1}
      my={5}
    >
      {/* <Header title="Adhoc Diaries" /> */}
      <ScrollView>
        <VStack space={THEME.spacing.md} mx={2}>
          {(data && dataKeys.length > 0) &&
            dataKeys.map(id => {
              if (data[id].length > 0) {
                return data[id].map((diary, index) => (
                  <Card
                    bgColor={`purple.${COLOR_HUE}`}
                    key={`adhoc-diary-${id}-${diary.id}-${index}`}
                    mt={THEME.spacing.regular}
                    // onPress={ () => navigation.navigate(screens.auth.quiz, { diary }) }
                    subtitle={DateTime.fromSQL(diary.created_at).toFormat('LLLL d')}
                    title={diary?.diary_name}
                  >
                    <Text>
                      Please complete at your earliest convenience
                    </Text>
                  </Card>
                ))
              }

              return null
            })
          }
        </VStack>
      </ScrollView>
    </Box>
  )
}
AdhocDiariesList.propTypes = {
  // route: PropTypes.object.isRequired,
}

export default AdhocDiariesList
