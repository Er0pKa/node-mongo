// server.js
const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
const db             = require('./config/db');
const app            = express();
const port = 8000;

app.use(bodyParser.urlencoded({ extended: true }));

MongoClient.connect(db.url, (err, client) => {

  // if (client) {console.log(client)}
  // if (err) { console.log(err) }
  if (err) return console.log(err)
  var database = client.db('todolist-node');
  require('./app/routes')(app, database);
  app.listen(port, () => {
    console.log('We are live on ' + port);
  });
  // if (err) return console.log(err)
  // require('./app/routes')(app, database);
  // app.listen(port, () => {
  //   console.log('We are live on ' + port);
  // });               
})