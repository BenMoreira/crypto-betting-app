import { PayloadAction, createSlice} from '@reduxjs/toolkit'
import { RootState } from '../app/store';

export type Bet = {
    betID : String,
    userID : String,
    placedDate : Number,
    wagerValue : Number,
}

export interface PlacedBetsState {
    placedBets : Array<Bet>;
}

const initialState: PlacedBetsState = {
    placedBets : [],
  };
  

export const placedBetsSlice = createSlice({
    name: 'Pinned Cryptos',
    initialState: initialState,
    reducers: {
        updateBets: (state, action: PayloadAction<Array<Bet>>)=>{
            state.placedBets  = action.payload;
        },

       
    }
})

export const {updateBets} = placedBetsSlice.actions;

//export const selectPinnedCryptos = (state: RootState) => state.counter.value;

export default placedBetsSlice.reducer;