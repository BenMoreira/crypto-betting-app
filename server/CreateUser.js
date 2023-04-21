function CreateUser(user, callback) {
    const bcrypt = require('bcrypt');
    const MongoClient = require('mongodb@4.1.0').MongoClient;
    const client = new MongoClient('mongodb+srv://robertrecalo:GTBH8o2VeiglBY7E@cluster0.9hupwwm.mongodb.net/test');
  
    client.connect(function (err) {
      if (err) return callback(err);
  
      const db = client.db('Crypto-Betting-App');
      const users = db.collection('auths');
      //const accounts = db.collection('users');
  
      users.findOne({ email: user.email }, function (err, withSameMail) {
        if (err || withSameMail) {
          client.close();
          return callback(err || new Error('the user already exists'));
        }
  
        bcrypt.hash(user.password, 10, function (err, hash) {
          if (err) {
            client.close();
            return callback(err);
          }
  
          user.password = hash;
          user.tokens = 100;
          users.insert(user, function (err, inserted) {
            //accounts.insert({"email":user.email, "tokens":100});
            client.close();
  
            if (err) return callback(err);
            callback(null);
          });
        });
      });
    });
  }
  