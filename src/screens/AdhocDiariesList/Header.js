import React from 'react'
import PropTypes from 'prop-types'
import { DateTime } from 'luxon'
import { useNavigation } from '@react-navigation/native'

import {
  Box,
  Center,
  CloseIcon,
  Container,
  Flex,
  Heading,
  IconButton,
  Text,
  VStack
} from 'native-base'

/**
 * Quiz header
 *
 * @param {Object} params
 * @param {string} [params.date] - Quiz date
 * @param {string} [params.study_name] - Quiz study name
 *
 * @return {JSX.Element}
 * @constructor
 */
const Header = ({ title }) => {
  const navigation = useNavigation()

  return (
    <Center mx={5}>
      <Container w="100%" mt={5}>
        <Flex
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          w="100%"
        >
          {/* <IconButton
            borderRadius="full"
            icon={<CloseIcon size={4} />}
            onPress={() => navigation.goBack()}
            size="lg"
          /> */}
            { title &&
              <Heading
                color="black"
                fontWeight="600"
                size="md"
              >
                { title }
              </Heading>
            }
          <Box />
        </Flex>
      </Container>
     </Center>
  )
}

Header.propTypes = {
  date: PropTypes.string,
  study_name: PropTypes.string
}

export default Header
