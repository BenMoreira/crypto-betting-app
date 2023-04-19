import { PayloadAction, createSlice} from '@reduxjs/toolkit'
import { RootState } from '../app/store';

export interface PinnedCryptoState {
    pinnedCryptos: Array<String>;
}

const initialState: PinnedCryptoState = {
    pinnedCryptos: ["bitcoin"],
  };
  

export const pinnedCryptoSlice = createSlice({
    name: 'Pinned Cryptos',
    initialState: initialState,
    reducers: {
        pin: (state, action: PayloadAction<String>)=>{
            state.pinnedCryptos = state.pinnedCryptos.concat(action.payload);
        },
        unpin: (state, action: PayloadAction<String>)=>{
            state.pinnedCryptos = state.pinnedCryptos.filter((crypto: String) => crypto !== action.payload);
        },

       
    }
})

export const {pin, unpin} = pinnedCryptoSlice.actions;

//export const selectPinnedCryptos = (state: RootState) => state.counter.value;

export default pinnedCryptoSlice.reducer;