import Axios from "axios";


export function getCoinData(URL, cryptoName){
    return Axios.get(URL + "/getCoin", { params: {cryptoName : cryptoName}}).then((response)=> {return(response)});
}

export function getAllCoinData(URL){
    return Axios.get(URL + "/getCoins").then((response)=> {return(response)});
}

export function createBet(URL, values){
    return Axios.post(URL + "/createBet", {data: values}).then((response) => {return(response)});
}

export function createWager(URL, values){
    return Axios.post(URL + "/createWager", {data: values}).then((response) => {return(response)});
}

export function getBetsForCoin(URL, cryptoName){
    return Axios.get(URL + "/getBetsFor", { params: {cryptoName : cryptoName}}).then((response)=> {return(response)});
}