import React from 'react'
import { NativeBaseProvider } from 'native-base'
import { LinearGradient } from 'expo-linear-gradient'

import NavigationContainer from './navigation'
import theme from './theme/config'

const ClinicalStudyPal = () => (
  <NativeBaseProvider
    config={{
      dependencies: {
        'linear-gradient': LinearGradient
      }
    }}
    theme={ theme }
  >
    <NavigationContainer/>
  </NativeBaseProvider>
)

export default ClinicalStudyPal
