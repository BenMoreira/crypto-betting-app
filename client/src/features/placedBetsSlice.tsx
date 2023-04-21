import { PayloadAction, createSlice} from '@reduxjs/toolkit'
import { RootState } from '../app/store';

export type Bet = {
    betID : String,
    crypto : String,
    creationDate : String,
    expirationDate : String,
    creationPrice : Number,
    strikePrice : Number,
    statusCode : Number,
    daysExpiry : Number,
}
/*

betID
"8a3fe279-3441-4d57-b3ee-8f0fe625f0db"
crypto
"bitcoin"
creationDate
"1681964872548"
expirationDate
"1682103600000"
creationPrice
28911
strikePrice
29200.11
statusCode
0
daysExpiry
1
*/

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