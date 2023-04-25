import { PayloadAction, createSlice} from '@reduxjs/toolkit'
import { RootState } from '../app/store';

export interface TokenState {
    tokens: any;
}

const initialState: TokenState = {
    tokens: 100,
  };
  

export const tokenSlice = createSlice({
    name: 'Pinned Cryptos',
    initialState: initialState,
    reducers: {
        addTokens: (state, action: PayloadAction<Number>)=>{
            state.tokens += action.payload;
        },
        subtractTokens: (state, action: PayloadAction<Number>)=>{
            state.tokens = state.tokens - (action.payload as number);
        },
        updateTokens: (state, action: PayloadAction<Number>)=>{
            state.tokens = action.payload;
        }

       
    }
})

export const {addTokens, subtractTokens, updateTokens} = tokenSlice.actions;

//export const selectPinnedCryptos = (state: RootState) => state.counter.value;

export default tokenSlice.reducer;