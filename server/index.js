//dependency//const declaration
const express = require("express");
const uuid = require("uuid");
const app = express();
//
const bcrypt = require("bcrypt");
const fetch = require("node-fetch");
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

/** FOR CLIENT USES ONLY */
app.get(("/getUser"), (req, res)=>{
    UserModel.findOne({email: req.query.email}).then((result)=>{
        //console.log(result);
        if(!result){
            res.json({"error": "User not found"});
        }
        else{
            res.json(result);
        }
    })
});

/** FOR Auth0 PURPOSES ONLY */
app.get(("/getUserByEmail"), (req, res)=>{
    UserModel.findOne({email: req.body.email}).then((result)=>{
        //console.log(result);
        if(!result){
            res.json({"error": "User not found"});
        }
        else{
            res.json(result);
        }
    })
});

app.get("/login",  (req, res)=>{
    const auth = new Buffer.from(req.headers.authorization.split(' ')[1],
        'base64').toString().split(':');
    console.log(auth);
    const email = auth[0];
    const pass = auth[1];

    UserModel.findOne({email: email}).then((result)=>{
        bcrypt.compare(pass, result.password, function(error, valid){
            if(error || !valid){
                res.json({"error" : "Invalid Password"});
            }
            else res.json(result);
        });
        //res.json(result);
    })
})

app.put("/changePassword", (req, res) => {
    res.json({"result" : "success"});
})

app.post("/createUser", (req, res)=>{
    CreateUser(req.body, function(result){
        res.json(result);
    });
})

app.get("/verifyUser", (req, res)=>{
    UserModel.findOne({email : req.body.email}).then((err, result)=>{
        if(err){
            res.json(err);
        }
        if(result){
            res.json(result);
        }
    })
})

app.get("/getAllWagers", (req, res)=>{
    WagerModel.find({}).then(function(result){
        res.json(result);
    });
})

app.get("/getAllBets", (req, res) =>{
    BetModel.find({}).then(function(result){
        res.json(result);
    });
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

app.patch("/updateUserPins", async (req, res) =>{
    
    let data = req.body

    const filter = { email: data.email };

    const update = { pins: data.pins };

    UserModel.findOneAndUpdate(filter, update, {
        //this makes the findOneAndUpdate function return the new document!! not the old oneee
        upsert: true,
        returnDocument: 'after',
      }).then(result => {
        if(!result) 
            res.json({"error" : "User not found"});
        else
            res.json(result);
    })
})


app.get("/getCoins", async (req, res)=>{
    let c =  await CoinModel.find({});
    res.send(c);

})

app.get("/getCoin", async (req, res)=>{
    let c =  await CoinModel.findOne({crypto : req.query.cryptoName});
    res.send(c);

})

app.get("/getBetsFor", async (req, res) =>{
    let c =  await BetModel.find({crypto : req.query.cryptoName});
    res.send(c);
})

app.post("/createBet", async (req, res) => {
    data = req.body.data;
    let bet = BetModel.create({betID: uuid.v4(),...data});
    res.send(bet);
})

app.post("/createWager", async  (req, res) => {
    data = req.body.data;
    let wager = WagerModel.create({...data});
    res.send(wager);
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

function sleep (milliseconds) {
    return new Promise((resolve) => setTimeout(resolve, milliseconds))
  }

var fetchCoinDataLoop = setInterval(async function(){
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
            await sleep(20000);
            let tokenName = nameList[token];
            //console.log(tokenName);
            let call = getShortTermOHLC(tokenName);
            call.then((shortOHLC) =>{
                let longCall = getLongTermOHLC(tokenName);
                longCall.then((longOHLC) =>{
                    
                    //COIN CREATION CODE
                    let priceCall = getCurrentPrice(tokenName).then(async(price, reject)=>{

                    // let coin = new CoinModel({crypto:tokenName, price: price[tokenName].usd, shortTermOHLC:shortOHLC, longTermOHLC:longOHLC});
                    // coin.save();
                    

                    //IMPORTANT UPDATE CODE
                    const filter = { crypto: tokenName };
                    console.log(price);

                    const update = { price: price[tokenName].usd, shortTermOHLC: shortOHLC, longTermOHLC: longOHLC};
                    let a = await CoinModel.findOneAndUpdate(filter, update);
                    }).catch(err => console.error(err));
                    
                    

                })
            })
            
            }   

            //clearInterval(requestLoop);
      }, 240000);


function isPast(time) {
    let date = new Date();
    const currentTime = new Date().getTime();
    return time <= (currentTime);
}

function formatDate(milliseconds) {
    const date = new Date(milliseconds);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    return `${day}-${month}-${year}`;
  }

async function getHistoricPrice(coinName, UTCMillis){
    let call = await fetch("https://api.coingecko.com/api/v3/coins/" + coinName + "/history?date=" + formatDate(parseInt(UTCMillis)));
    return call.json().then(res => {return res});
}



var betResolution = setInterval(async function(){

    BetModel.find({}).then(result =>{
        result.forEach(bet =>{
            if(isPast(bet.expirationDate)){
                let historicPrice = getHistoricPrice(bet.crypto, bet.expirationDate);
                historicPrice.then(async result => {
                    let currentPrice = result.market_data.current_price.usd;
                    if(currentPrice){
                    if(bet.strikePrice > bet.creationPrice){
                        if(currentPrice >= bet.strikePrice){
                            console.log("Positive Strike Reached!");
                            await BetModel.findOneAndUpdate({betID : bet.betID}, {statusCode: 1});
                        } 
                        else{
                            console.log("Failed to Reach Strike!");
                            await BetModel.findOneAndUpdate({betID : bet.betID}, {statusCode: -1});
                        }
                    }
                    else if(bet.strikePrice < bet.creationPrice){
                        if(currentPrice <= bet.strikePrice){
                            console.log("Negative Strike Reached!");
                            await BetModel.findOneAndUpdate({betID : bet.betID}, {statusCode: 1});
                        }
                        else{
                            console.log("Failed to Reach Strike!");
                            await BetModel.findOneAndUpdate({betID : bet.betID}, {statusCode: -1});
                        }
                    }
                    else console.log("No Strike Reached!");
                    }
                });
            
            }
        })
    })
    clearInterval(betResolution);
  }, 1000);


      // If you ever want to stop it...  clearInterval(requestLoop)

app.listen(3001, ()=>{
  console.log("SERVER RUNNING ON PORT 3001");
})


function CreateUser(user, callback) {
      UserModel.findOne({ email: user.email }).then((err, withSameMail) =>{
        if (err || withSameMail) {
          //client.close();
          return callback({"error": "the user already exists"});
        }
  
        bcrypt.hash(user.password, 10, function (err, hash) {
          if (err) {
            return callback(err);
          }
  
          user.password = hash;
          //user.tokens = 100;
          //user.save()
          let newUser = new UserModel({...user, pins: [], userID: uuid.v4(), tokens: 100 });
          newUser.save();
          console.log(newUser.toJSON());
          callback(newUser.toJSON());
          //callback(newUser);
          //callback(newUser);
        //   user.save(user, function (err, inserted) {
        //     //accounts.insert({"email":user.email, "tokens":100});
        //     //client.close();
  
        //     if (err) return callback(err);
        //     callback(null);
        //   });
        });
      });
    };


    // app.post("/newWager", async (req, res)=>{
//     await ok.save();
//     res.json(ok);
// });