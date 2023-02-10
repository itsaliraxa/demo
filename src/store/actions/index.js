import { setCount, setDiaryIds, setStudyName } from 'store/reducers/slices/diaries'
import { clearUser, setUser } from 'store/reducers/slices/user'
import {
  clearToast,
  setAuth,
  setLastAdhocDate,
  setLoading,
  setShowAdhocAlert,
  showToast
} from 'store/reducers/slices/status'

export const diariesStore = {
  setCount,
  setDiaryIds,
  setStudyName
}

export const userStore = {
  clearUser,
  setUser
}

export const statusStore = {
  clearToast,
  setAuth,
  setLastAdhocDate,
  setLoading,
  setShowAdhocAlert,
  showToast
}
