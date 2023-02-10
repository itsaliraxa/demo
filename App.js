import React, {
  useCallback,
  useEffect,
  useState
} from 'react'
import { LogBox } from 'react-native';
import * as SplashScreen from 'expo-splash-screen'
import * as Montserrat from '@expo-google-fonts/montserrat'
import * as OpenSans from '@expo-google-fonts/open-sans'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import { loadAsync as fontLoadAsync } from 'expo-font'
import { persistStore } from 'redux-persist'
import firebase from '@react-native-firebase/app';
import crashlytics from '@react-native-firebase/crashlytics';

import ClinicalStudyPal from './src'
import store from './src/store'

const persistor = persistStore(store)

export default function App () {
  firebase.crashlytics().setCrashlyticsCollectionEnabled(true);
  
  LogBox.ignoreAllLogs(); //Ignore all log notifications
  const [isReady, setIsReady] = useState(false)
  const {
    Montserrat_300Light,
    Montserrat_300Light_Italic,
    Montserrat_400Regular,
    Montserrat_400Regular_Italic,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
    Montserrat_700Bold_Italic,
    Montserrat_800ExtraBold,
    Montserrat_900Black
  } = Montserrat
  const {
    OpenSans_400Regular,
    OpenSans_400Regular_Italic,
    OpenSans_500Medium,
    OpenSans_500Medium_Italic,
    OpenSans_700Bold,
    OpenSans_700Bold_Italic
  } = OpenSans

  useEffect(() => {
    const loadFonts = async () => {
      try {
        await SplashScreen.preventAutoHideAsync()
        await fontLoadAsync({
          Montserrat_300Light,
          Montserrat_300Light_Italic,
          Montserrat_400Regular,
          Montserrat_400Regular_Italic,
          Montserrat_600SemiBold,
          Montserrat_700Bold,
          Montserrat_700Bold_Italic,
          Montserrat_800ExtraBold,
          Montserrat_900Black,
          OpenSans_400Regular,
          OpenSans_400Regular_Italic,
          OpenSans_500Medium,
          OpenSans_500Medium_Italic,
          OpenSans_700Bold,
          OpenSans_700Bold_Italic
        })
      } catch (e) {
        console.warn(e)
      } finally {
        setIsReady(true)
      }
    }

    loadFonts().catch(error => console.warn('error:', error))
  }, [])

  /**
   * This tells the splash screen to hide immediately! If we call this after
   * `setIsReady`, then we may see a blank screen while the app is
   * loading its initial state and rendering its first pixels. So instead,
   * we hide the splash screen once we know the root view has already
   * performed layout.
   */
  const onLayoutRootView = useCallback(async () => {
    if (isReady) {
      await SplashScreen.hideAsync()
    }
  }, [isReady])

  if (!isReady) {
    return null
  }
  return (
    <Provider store={ store }>
      <PersistGate
        loading={null}
        onBeforeLift={ onLayoutRootView }
        persistor={ persistor }
      >
        <ClinicalStudyPal />
      </PersistGate>
    </Provider>
  )
}
