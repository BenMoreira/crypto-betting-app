import { PayloadAction, createSlice} from '@reduxjs/toolkit'
import { RootState } from '../app/store';

export interface PinnedCryptoState {
    pinnedCryptos: Array<String>;
}

const initialState: PinnedCryptoState = {
    pinnedCryptos: [],
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
        setPins: (state, action: PayloadAction<Array<String>>)=>{
            state.pinnedCryptos = action.payload;
        }

       
    }
})

export const {pin, unpin, setPins} = pinnedCryptoSlice.actions;

//export const selectPinnedCryptos = (state: RootState) => state.counter.value;

export default pinnedCryptoSlice.reducer;