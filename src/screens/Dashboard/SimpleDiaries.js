import React from 'react'
import PropTypes from 'prop-types'
import { DateTime } from 'luxon'
import { useNavigation } from '@react-navigation/native'

import {
  Box,
  FlatList,
  Text,
  useContrastText
} from 'native-base'

import screens from 'screens'
import { THEME } from 'constants/index'
import { diarySchema } from 'schema'

import Card from 'features/Card'
import DashboardHeading from './DashboardHeading'

/**
 * Render simple diaries
 *
 * @param {Object} params
 * @param {string} [params.bgColor='primary'] - Card background color
 * @param {DiaryData[]} params.data - Simple diary data
 * @param {...JSX.ElementAttributesProperty} params.props - Additional component attributes
 *
 * @todo - Add animation to cards on load
 *
 * @returns {JSX.Element[] | JSX.Element}
 * @constructor
 */
const SimpleDiaries = ({
  bgColor,
  data,
  ...props
}) => {
  
  const COLOR_HUE = 100
  const navigation = useNavigation()
  const textColor = useContrastText(`${bgColor}.${COLOR_HUE}`)

  /**
   * Diary card
   *
   * @param {number} index - Diary index
   * @param {DiaryData} item - Diary object
   *
   * @returns {JSX.Element}
   * @constructor
   */
  const DiaryItem = ({ index, item }) => {
    const dtDate = DateTime.fromSQL(item.created_at)

    return (
      <Card
        accentColor={ bgColor }
        bgColor={ `${bgColor}.${COLOR_HUE}` }
        key={ index }
        mr={index !== (data.length - 1) ? THEME.spacing.sm : 0}
        onPress={ () => navigation.navigate(screens.auth.quiz, { diary: item })}
        w={ 150 }
        { ...props }
      >
        <DashboardHeading
          color={ textColor }
          size="sm"
        >
          { dtDate.toFormat('LLLL d') }
        </DashboardHeading>
        <Text
          color={ textColor }
          fontSize="xs"
        >
          { item.diary_name }
        </Text>
      </Card>
    )
  }

  DiaryItem.propTypes = {
    index: PropTypes.number,
    item: diarySchema.diaryProps
  }

  return (
    <Box>
      <FlatList
        _contentContainerStyle={{
          px: THEME.screen.px,
          py: THEME.spacing.md
        }}
        data={ data }
        horizontal={ true }
        initialNumToRender={ 5 }
        keyExtractor={ item => item.id }
        renderItem={ DiaryItem }
        showsHorizontalScrollIndicator={ false }
      />
    </Box>
  )
}

SimpleDiaries.propTypes = {
  bgColor: PropTypes.string,
  data: PropTypes.arrayOf(diarySchema.diaryProps),
  props: PropTypes.object
}

SimpleDiaries.defaultProps = {
  bgColor: 'primary'
}

export default SimpleDiaries
