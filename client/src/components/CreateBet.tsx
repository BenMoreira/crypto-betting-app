import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createBet, getBetsForCoin, getCoinData } from '../API/CoinAPI';
import { updateBets } from '../features/placedBetsSlice';
import { addCommasToDollarValue } from './PinnedCrypto';

export type CryptoObject = {
    crypto : String,
    price : number,
    shortTermOHLC : Array<Number>,
    longTermOHLC : Array<Number>,
}

export type BetObject = {
    betID : String,
    crypto : String,
    creationDate : String,
    expirationDate : String,
    creationPrice : Number,
    strikePrice : Number,
    statusCode : Number,
    daysExpiry : Number,
}

type BetData = {
    strikePrice : number,
    diff : number,
}

const CreateBet = ({name} : {name : String}) => {


    const [data, setData] = useState<CryptoObject>({
        crypto : "",
        price : 0,
        shortTermOHLC : [],
        longTermOHLC : [],
    });
    const [bets, setBets] = useState<BetObject>();

    const [strikes, setStrikes] = useState<boolean[]>([false, false, false, false]);

    const [strikePercent, setStrikePercent] = useState(-1);
    const [daysExpiry, setDaysExpiry] = useState(1);
    const [betData, setBetData] = useState<BetData>();
    const dispatch = useDispatch();

    useEffect(() => {
        let d = getCoinData("https://crypto-betting-app-7iph.onrender.com", name);
        d.then(res => setData((res.data as CryptoObject)));
        //console.log(getStrikePrice());
        //console.log(getCurrentPrice());
        ///checkBetAvailability();
        setBetData({
            strikePrice : getStrikePrice(),
            diff : getCurrentPrice() >= 10 ? (Math.trunc((getStrikePrice() - getCurrentPrice()) * 100) / 100): (Math.trunc((getStrikePrice() - getCurrentPrice()) * 100000) / 100000),
        });
    },[name, strikePercent, daysExpiry]);

    useEffect(() => {
        getBetsForCoin("https://crypto-betting-app-7iph.onrender.com", name).then(res => {
            setBets(res.data)
            dispatch(updateBets(res.data));
        });
        
    },[name, daysExpiry]);

    useEffect(()=>{
        setBetData({
            strikePrice : getStrikePrice(),
            diff : getCurrentPrice() >= 10 ? (Math.trunc((getStrikePrice() - getCurrentPrice()) * 100) / 100): (Math.trunc((getStrikePrice() - getCurrentPrice()) * 100000) / 100000),
        });
    }, [data]);

    useEffect(()=>{
        checkBetAvailability();
       //console.log(daysExpiry + " days");
    }, [bets, daysExpiry]); //]);

    useEffect(()=>{
        ///checkBetAvailability();
        
    }, []);

    function handleSelectChange(event : any){
        event.preventDefault();
        //console.log(event.target.value);
        setStrikePercent(event.target.value);
    }
    function handleExpiryChange(event : any){
        event.preventDefault();
        //console.log(event.target.value);
        setDaysExpiry(parseInt(event.target.value));
    }

    function getCurrentPrice(){
        return (Math.trunc(data.price * 100000) / 100000);
    }

    function getStrikePrice(){
        return (Math.trunc((data.price * strikePercent) * 100000) / 100000);
    }

    function getCurrentTime(){
        return new Date().getTime();
    } 

    function getExpirationTime(){
        let date = new Date();
        let tomorrow = new Date(date);
        tomorrow.setDate(tomorrow.getDate() + daysExpiry);
        tomorrow.setHours(0, 0, 0);
        tomorrow.setMilliseconds(0);

        //console.log(tomorrow.toLocaleString());
        return(tomorrow.getTime() - (tomorrow.getTimezoneOffset() * 60 * 1000));
    }

    function saveBet(){
        if(strikePercent > 0){
            console.log(strikePercent > 0);
        createBet("https://crypto-betting-app-7iph.onrender.com", {
            crypto : name,
            creationDate : getCurrentTime(),
            expirationDate : getExpirationTime(),
            creationPrice : getCurrentPrice(),
            strikePrice : getStrikePrice(),
            statusCode : 0,
            daysExpiry : daysExpiry,
        });


        let availability = strikes;
        console.log(availability);
        let betPercent = strikePercent;
        if(betPercent == 0.98){
            console.log("0.98 Taken!");
            availability[0] = true;
        }
        if(betPercent == 0.99){
            console.log("0.99 Taken!");
            availability[1] = true;
        }
        if(betPercent == 1.01){
            console.log("1.01 Taken!");
            availability[2] = true;
        }
        if(betPercent == 1.02){
            console.log("1.02 Taken!");
            availability[3] = true;
        }
        setStrikePercent(-1);
        setDaysExpiry(1);
        //setStrikes(availability);
        }
    }

    function checkBetAvailability(){
        let availability = strikes;
        if(bets !== undefined && bets !== null){
            //console.log("bets found!");
        (bets as unknown as Array<BetObject>).forEach((bet) => {
            let betPercent = Math.trunc((bet.strikePrice as number) / (bet.creationPrice as number) * 100) / 100;
           
            if(betPercent === 0.98){
                //console.log("0.98 Taken!");
                if((getExpirationTime() as unknown as String) == bet.expirationDate){
                availability[0] = true; 
                }
                else availability[0] = false;
            }
            if(betPercent === 0.99 ){
                //console.log("0.99 Taken!");
                if((getExpirationTime() as unknown as String) == bet.expirationDate){
                availability[1] = true;
                }
                else availability[1] = false;
            }
            if(betPercent === 1.01){
                //console.log("1.01 Taken!");
                if((getExpirationTime() as unknown as String) == bet.expirationDate){
                availability[2] = true;
                }
                else availability[2] = false;
            }
            if(betPercent === 1.02){
                //console.log("1.02 Taken!");
                if((getExpirationTime() as unknown as String) == bet.expirationDate){
                availability[3] = true;
                } else availability[3] = false;
            }
        });
    }
    setStrikes(availability);
    }

  return (
    <>
    <div className='w-full rounded-2xl bg-coal-900 px-5 py-2'>
        <div className='flex flex-col gap-2 justify-center text-blue-300 text-xl text-left'>
            <div className='flex justify-around w-full py-1 font-normal'>
                <div className='w-6/12'>
                Current Price $
                </div>
                <div className='w-6/12 text-center py-1 font-normal text-coal-100'>
                ${addCommasToDollarValue(getCurrentPrice()).toString()}
                </div>
            </div>
            <div className='flex justify-around  py-1 font-normal'>
                <div className='w-6/12'>
                Expiry
                </div>
                <div className='w-6/12 py-1 font-normal text-coal-100 hover:bg-coal-700 rounded-xl'>
                <select id="expiry" name="expiryday" className='bg-transparent w-full text-center ' value={daysExpiry as any} onChange={(e) => handleExpiryChange(e)}>
                    <option value={1} className='bg-coal-900'>1 Day</option>
                    <option value={2} className='bg-coal-900'>2 Days</option>
                    <option value={3} className='bg-coal-900'>3 Days</option>
                </select>
                </div>
            </div>
            <div className='flex justify-around py-1 font-normal'>
                <div className='w-6/12'>
                    Strike %
                </div>
                <div className='w-6/12 py-1 font-normal hover:bg-coal-700 rounded-xl'>
                <select id="strike" name="strikepercent" className='bg-transparent w-full text-coal-100 text-center' value={strikePercent} onChange={(e) => handleSelectChange(e)}>
                    <option value={-1} className='bg-coal-900'> -- select an option -- </option>
                    <option value={.98} disabled={strikes[0]} className='bg-coal-900'>-2%</option>
                    <option value={.99} disabled={strikes[1]} className='bg-coal-900'>-1%</option>
                    <option value={1.01} disabled={strikes[2]} className='bg-coal-900'>1%</option>
                    <option value={1.02} disabled={strikes[3]} className='bg-coal-900'>2%</option>
                </select>
                </div>
            </div>
            <div className='flex justify-around py-1 font-normal'>
                <div className='w-6/12'>
                    Strike $
                </div>
                <div className='w-6/12 text-center py-1 font-normal text-coal-100'>
                ${strikePercent != -1 ? addCommasToDollarValue(betData?.strikePrice) : <></>}
                </div>
            </div>
            <div className='flex justify-around py-1 font-normal'>
                <div className='w-6/12'>
                    Difference $
                </div>
                <div className='w-6/12 text-center py-1 font-normal text-coal-100'>
                ${strikePercent != -1 ? addCommasToDollarValue(betData?.diff) : <></>}
                </div>
            </div>
        </div>

        
    </div>
    <div className='flex flex-row justify-center pt-5'>
        <button onClick={() => saveBet()} disabled={strikePercent == -1} className='font-light bg-blue-600 rounded-lg text-coal-50 text-2xl p-2 mt-0 w-1/2 hover:bg-blue-800'>
            {strikePercent != -1 ? 'Create Bet' : 'Select a Strike...'}
        </button>
    </div>
    </>
  )
}

export default CreateBet

/*
<table className='mx-auto table-auto w-3/4 border-spacing-1 border-separate text-xl'>
        <thead className='bg-coal-800 text-blue-300 text-xl'>
            {/* <th className='font-normal'>Token Name</th> }
            <th className='font-normal p-1'>Current Price ($)</th>
            <th className='font-normal p-1'>Expiry</th>
            <th className='font-normal p-1'>Strike (%)</th>
            <th className='font-normal p-1'>Strike ($)</th>
            <th className='font-normal p-1'>Difference ($)</th>
            <th className='font-normal p-1'></th>
        </thead>
        <tbody>
        <tr className=' text-coal-100'>
            {/* <td>Bitcoin</td> }
            <td  className='text-center p-1'>
                ${getCurrentPrice().toString()}
            </td>
            <td className='text-center p-1'>
            <select id="expiry" name="expiryday" className='bg-transparent w-full text-center' value={daysExpiry as any} onChange={(e) => handleExpiryChange(e)}>
                    <option value={1}>1 Day</option>
                    <option value={2}>2 Days</option>
                    <option value={3}>3 Days</option>
                </select>
            </td>
            <td className='text-center p-1'>
                <select id="strike" name="strikepercent" className='bg-transparent w-full text-center' value={strikePercent} onChange={(e) => handleSelectChange(e)}>
                    <option value={-1}> -- select an option -- </option>
                    {/* {strikes[0] === false ? <option value={.98} disabled={strikes[0]}>-2%</option> : <></>} }
                    <option value={.98} disabled={strikes[0]}>-2%</option>
                    <option value={.99} disabled={strikes[1]}>-1%</option>
                    <option value={1.01} disabled={strikes[2]}>1%</option>
                    <option value={1.02} disabled={strikes[3]}>2%</option>
                </select>
            </td>
            <td className='text-center p-1'>${strikePercent !== -1 ? betData?.strikePrice : ''}</td>
            <td className='text-center p-1'>${strikePercent !== -1 ? betData?.diff : ''}
            </td>
            <td  className='text-center p-1'>
                <button onClick={() => saveBet()}> Place Bet</button>
            </td>
            {/* <td>{new Date().toLocaleTimeString()}</td>}
        </tr>
        </tbody>
    </table>
*/