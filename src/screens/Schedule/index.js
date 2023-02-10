import React from 'react'
import { DateTime } from 'luxon'
import { FontAwesome5 } from '@expo/vector-icons'

import {
  Box,
  HStack,
  Heading,
  Icon,
  ScrollView,
  Text,
  VStack,
  useContrastText
} from 'native-base'

import { DATA, THEME } from 'constants/index'

import Header from 'features/Header'

/**
 * Schedule screen
 *
 * @return {JSX.Element}
 * @constructor
 */
const ScheduleScreen = () => {
  const bgColor = 'info'
  const currentHue = 200
  const futureHue = 100
  const currentTextColor = useContrastText(`${bgColor}.${currentHue}`)
  const futureTextColor = useContrastText(`${bgColor}.${futureHue}`)

  /**
   * Schedule data
   */
  const data = [
    {
      date: DateTime.fromFormat('2022-01-24', DATA.date_format.date),
      text: 'Baseline Visit',
      location: 'in-person'
    },
    {
      date: DateTime.fromFormat('2022-02-02', DATA.date_format.date),
      text: 'Procedure Visit',
      location: 'in-person'
    },
    {
      date: DateTime.fromFormat('2022-03-02', DATA.date_format.date),
      text: 'One Month Follow-up',
      location: 'video'
    }
  ]

  return (
    <>
      <ScrollView>
        <Header subtitle="Appointment" title="Schedule" />
        <VStack
          px={ THEME.screen.px }
          space={ THEME.spacing.lg }
        >
          { data.map((entry, index) => {
            const firstEntry = index === 0
            const hue = firstEntry ? currentHue : futureHue
            const textColor = firstEntry ? currentTextColor : futureTextColor

            return (
              <Box
                key={ `schedule-entry-${index}` }
                position="relative"
                style={{
                  transform: [
                    {
                      scale: firstEntry ? 1 : 0.98
                    }
                  ]
                }}
              >
                <Box
                  bgColor="white:alpha.50"
                  borderRadius="full"
                  h="70%"
                  left={ THEME.spacing.xs }
                  position="absolute"
                  top={ `${(100 - 70) / 2}%` }
                  w={1}
                  zIndex={1}
                />
                <HStack
                  alignItems="center"
                  bgColor={ `${bgColor}.${hue}` }
                  borderRadius={ THEME.borderRadius.lg }
                  justifyContent="space-between"
                  px={ THEME.spacing.lg }
                  py={ THEME.spacing.md }
                  shadow={ firstEntry ? 0 : null }
                  space={ THEME.spacing.md }
                >
                  <VStack>
                    <HStack
                      alignItems="center"
                      space={ THEME.spacing.sm }
                    >
                      <Heading
                        color={ textColor }
                        size="sm"
                      >
                        { entry.text }
                      </Heading>
                    </HStack>
                    <Text
                      color={ textColor }
                      fontWeight="light"
                      fontSize="md"
                    >
                      { entry.date.toFormat('cccc, LLLL d') }
                    </Text>
                  </VStack>
                  <Icon
                    as={ FontAwesome5 }
                    color="black:alpha.75"
                    name={ entry.location === 'in-person' ? 'building' : 'video' }
                    size="sm"
                  />
                </HStack>
              </Box>
            )
          }) }
        </VStack>
      </ScrollView>
    </>
  )
}

export default ScheduleScreen
