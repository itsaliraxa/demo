import React from 'react'
import { Center, Container, Text } from 'native-base'

/**
 * Footer that contains copyright info
 *
 * @returns {JSX.Element}
 * @constructor
 */
const Footer = () => (
  <Center safeAreaBottom>
    <Container>
      <Text color="dark.300">
        &copy; Delve Health - All rights reserved.
      </Text>
    </Container>
  </Center>
)

export default Footer
