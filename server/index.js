//dependency//const declaration
const express = require("express");
const app = express();
const mongoose = require('mongoose')
const UserModel = require('./models/User')
const WagerModel = require('./models/Wager')
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


app.listen(3001, ()=>{
  console.log("SERVER RUNNING ON PORT 3001");
})