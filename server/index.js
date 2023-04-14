//dependency//const declaration
const express = require("express");
const app = express();
const mongoose = require('mongoose')
const UserModel = require('./models/User')
const WagerModel = require('./models/Wager')
const CoinModel = require('./models/Coin')
const BetModel = require('./models/Bet')
//connect Express' backend to React's frontend
const cors = require('cors');
const { ObjectId } = require("mongodb");
var mongodb = require('mongodb');


 

//express can auto parse JSON body
app.use(express.json());
//use cors for connecting front and back end
app.use(cors());

mongoose.connect("mongodb+srv://robertrecalo:GTBH8o2VeiglBY7E@cluster0.9hupwwm.mongodb.net/Crypto-Betting-App?retryWrites=true&w=majority");

//req = request
//res = response
// "/getUsers" == request name
app.get("/getAllUsers", (req, res)=>{
    UserModel.find({}).then(function(result){
        res.json(result);
    });
});

app.get("/getAllWagers", (req, res)=>{
    WagerModel.find({}).then(function(result){
        res.json(result);
    });
});

app.get("/getAllBets", (req, res) =>{
    BetModel.find({}).then(function(result){
        res.json(result);
    });
});

app.post("/newWager", async (req, res)=>{
    await ok.save();
    res.json(ok);
});


app.post("/saveCoin", async (req, res)=>{
    // const call = fetch("https://api.coingecko.com/api/v3/coins/bitcoin/ohlc?vs_currency=usd&days=30");
    // //call.then((response)=>{res.json(response.json())});
    // res.json(call);
    let coin = new CoinModel({crypto:"btc", price:69});
    coin.save();
    res.json(coin);
    //const newCoin = new CoinModel({crypto: "btc", price:});
    //   const newInquiry = new InquiryModel(inquiry);

    //   await newInquiry.save();
    
    //   res.json(inquiry);
    //call.then(response => response.json().then(result => {result.save()}));
    //res.json(call);
})

// app.post("/createUser", async (req, res) =>{
//     await lol.save();
//     res.json(lol);
// //   const user = req.body;
// //   //make new user using the UserModel schema, passing the data given in the 'req' parameter
// //   const newUser = new UserModel(user);

// //   //insert the newUser document to the DB
// //   await newUser.save();

// //   //return back the new user's data
// //   res.json(user);

// });

// app.get("/getAllInquiries", (req, res)=>{
//   InquiryModel.find({}, (err, result)=>{
//     if(err){
//       res.json(err);
//       console.log("Error making /getAllInquiries request!!!");
//     }
//     else{
//       res.json(result);
//     }
//   });
// });

// app.post("/createInquiry", async(req, res)=>{
//   const inquiry = req.body;
  
//   const newInquiry = new InquiryModel(inquiry);

//   await newInquiry.save();
  
//   res.json(inquiry);

// });

// app.delete("/deleteInquiry", async (req, res)=>{

//       //console.log(req.body);
//       //var a = req.data
//       InquiryModel.findOneAndDelete({UTCTime : req.body.UTCTime}, (err, result) =>{
//         if(err){
//           res.json(err);
//         }
//         else{
//           res.json(result);
//         }
//       });
// });

app.get("/getCoins", async (req, res)=>{
    let c =  await CoinModel.find({});
    res.send(c);

})

app.get("/getCoin", async (req, res)=>{
    let c =  await CoinModel.findOne({crypto : req.query.cryptoName});
    res.send(c);

})


async function getShortTermOHLC(coinName){
    let call = await fetch("https://api.coingecko.com/api/v3/coins/"+coinName+"/ohlc?vs_currency=usd&days=1");
    return call.json().then(res => {return res});
}

async function getLongTermOHLC(coinName){
    let call = await fetch("https://api.coingecko.com/api/v3/coins/"+coinName+"/ohlc?vs_currency=usd&days=14");
    return call.json().then(res => {return res});
}
async function getCurrentPrice(coinName){
    let call = await fetch("https://api.coingecko.com/api/v3/simple/price?ids="+coinName+"&vs_currencies=usd");
    return call.json().then(res => {return res});
}

var requestLoop = setInterval(async function(){
            // const idDict = {
            //     bitcoin : "btc",
            //     //ethereum : "eth",
            //     dogecoin : "doge",
            //     litecoin : "ltc",
            //     solana : "sol",
            //     monero : "xmr",
            //     optimism : "op",
            //     dash : "dash",
            //     decentraland : "mana",
            //     maker : "mkr",
            
            // }
            const names = "bitcoin,ethereum,dogecoin,litecoin,solana,monero,optimism,dash,decentraland,maker";
            let nameList = names.split(",");

            for (token in nameList){
            let tokenName = nameList[token];
            //console.log(tokenName);
            let call = getShortTermOHLC(tokenName);
            call.then((shortOHLC) =>{
                let longCall = getLongTermOHLC(tokenName);
                longCall.then((longOHLC) =>{
                    
                    //COIN CREATION CODE
                    let priceCall = getCurrentPrice(tokenName).then(async (price)=>{
                    // let coin = new CoinModel({crypto:tokenName, price: price[tokenName].usd, shortTermOHLC:shortOHLC, longTermOHLC:longOHLC});
                    // coin.save();
                    

                    //IMPORTANT UPDATE CODE
                    const filter = { crypto: tokenName };
                    const update = { price: price[tokenName].usd, shortTermOHLC: shortOHLC, longTermOHLC: longOHLC};
                    let a = await CoinModel.findOneAndUpdate(filter, update);
                    //console.log(a.crypto);
                    //console.log(a.price);
                    });

                    
                    

                })
            })

            }   

            //clearInterval(requestLoop);
            
      }, 120000);

      // If you ever want to stop it...  clearInterval(requestLoop)

app.listen(3001, ()=>{
  console.log("SERVER RUNNING ON PORT 3001");
})