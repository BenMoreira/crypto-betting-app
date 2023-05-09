import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import pinnedCryptoReducer from '../features/pinnedCryptoSlice';
import placedBetsReducer from '../features/placedBetsSlice';
import tokenReducer from '../features/tokenSlice';

export const store = configureStore({
  reducer: {
    pinnedCryptos : pinnedCryptoReducer,
    placedBets : placedBetsReducer,
    tokens : tokenReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
