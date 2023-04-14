import Axios from "axios";


export function getCoinData(URL, cryptoName){
    return Axios.get(URL + "/getCoin", { params: {cryptoName : cryptoName}}).then((response)=> {return(response)});
}

export function getAllCoinData(URL){
    return Axios.get(URL + "/getCoins").then((response)=> {return(response)});
}