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

app.get("/login",  (req, res)=>{
    const auth = new Buffer.from(req.headers.authorization.split(' ')[1],
        'base64').toString().split(':');
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

app.post("/createNewUser", (req, res)=>{
    CreateUser(req.body, function(result){
        res.json(result);
    });
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

app.post("/newWager", async (req, res)=>{
    await ok.save();
    res.json(ok);
});

app.post("/createUser", async (req, res) =>{
    data = req.body;
    let bet = UserModel.create({...data});
    res.send(bet);
})


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
      // If you ever want to stop it...  clearInterval(requestLoop)

app.listen(3001, ()=>{
  console.log("SERVER RUNNING ON PORT 3001");
})


function CreateUser(user, callback) {
    //const bcrypt = require('bcrypt');
    //const MongoClient = require('mongodb@4.1.0').MongoClient;
    //const client = new MongoClient('mongodb+srv://robertrecalo:GTBH8o2VeiglBY7E@cluster0.9hupwwm.mongodb.net/test');
    
    //client.connect(function (err) {
      //if (err) return callback(err);
  
      //const db = client.db('Crypto-Betting-App');
      //const users = db.collection('auths');
      //const accounts = db.collection('users');
  
      UserModel.findOne({ email: user.email }).then((err, withSameMail) =>{
        if (err || withSameMail) {
          //client.close();
          return callback({"error": "the user already exists"} || new Error('the user already exists'));
        }
  
        bcrypt.hash(user.password, 10, function (err, hash) {
          if (err) {
            //client.close();
            return callback(err);
          }
  
          user.password = hash;
          //user.tokens = 100;
          //user.save()
          let newUser = new UserModel(user);
          newUser.save();
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
  //}
  