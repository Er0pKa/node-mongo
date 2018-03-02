// server.js
const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
const db             = require('./config/db');
// const login          = require('./config/login');
const app            = express();
const port = 8000;
const cexapi = require("./cex.api");

// cexapi.create('up114140428', 'V6uZsXIoTmgb7HRdOWA8b7QpM', 'FXTYtMJxRwqWD9dZhyop9350f8U');
// cexapi.create(login.username, login.api_key, login.api_secret);
// cexapi.balance(function(param){console.log(param)});

cexapi.ticker('BTC/USD', function(param){
  console.log(param.last);
});
// console.log(cexapi.dateTime());
// console.log(new Date().getTime());  //1519970748371
// console.log(Math.round(new Date().getTime() / 1000));  //1519970748
// console.log(new Date());  //Fri Mar 02 2018 09:14:25 GMT+0300 (MSK) {}
console.log(Date());  //Fri Mar 02 2018 09:14:25 GMT+0300 (MSK)

app.use(bodyParser.urlencoded({ extended: true }));

MongoClient.connect(db.url, (err, client) => {

  if (err) return console.log(err)
  var database = client.db('todolist-node');
  require('./app/routes')(app, database);
  app.listen(port, () => {
    console.log('We are live on ' + port);
  });
})