import { configureStore } from '@reduxjs/toolkit'
import pinnedCryptoReducer from './features/pinnedCryptoSlice'

export default configureStore({
  reducer: {
    pinnedCryptos : pinnedCryptoReducer,
  },
})