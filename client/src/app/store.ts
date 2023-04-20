import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import pinnedCryptoReducer from '../features/pinnedCryptoSlice';
import placedBetsReducer from '../features/placedBetsSlice';

export const store = configureStore({
  reducer: {
    pinnedCryptos : pinnedCryptoReducer,
    placedBets : placedBetsReducer,
    counter : counterReducer,
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
