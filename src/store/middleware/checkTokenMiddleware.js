import AsyncStorage from '@react-native-async-storage/async-storage'
import { statusStore, userStore } from 'store/actions'
import api from 'services/api'

const { util } = api

const checkTokenMiddleware = (api) => (next) => (action, state) => {
    const { dispatch } = api
    if (action.type === 'api/executeQuery/rejected') {
        console.log(action, 'action in checkTokenMiddleware')
        dispatch(util.invalidateTags(['User']))
        clearStorage();
        dispatch(userStore.clearUser())
        dispatch(statusStore.setAuth(false))
        dispatch(statusStore.showToast({
            status: 'warning',
            title: 'Login Session Expired',
            description: 'Please log back into your account',
            variant: 'subtle'
        }))
        dispatch(util.resetApiState())
    }
    return next(action);
};

export default checkTokenMiddleware;


const clearStorage = async () => {
    await AsyncStorage.clear()
}