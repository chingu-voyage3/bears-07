const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const urlEncodedParser = bodyParser.urlencoded({ extended: false });
const router = express.Router();

const app = express();

// Import Mongoose
const mongoose = require('mongoose');
// Use native promises
mongoose.Promise = global.Promise;
// Set up mongoose connection
mongoose.connect('mongodb://localhost:27017/bears-07', {
  useMongoClient: true
});
// Get the connection
var db = mongoose.connection;
// Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'connection error:'));
// Once our connection opens, our callback will be called
db.once('open', function() {
  // we're connected!
  console.log('Connected succesfully to MongoDB.');
});




if (!process.env.DISABLE_XORIGIN) {
  app.use(function(req, res, next) {
    var allowedOrigins = ['https://narrow-plane.gomix.me', 'https://www.freecodecamp.com'];
    var origin = req.headers.origin || '*';
    if(!process.env.XORIG_RESTRICT || allowedOrigins.indexOf(origin) > -1){
         console.log(origin);
         res.setHeader('Access-Control-Allow-Origin', origin);
         res.header("Access-Control-Allow-Headers", "GET, PUT, POST, DELETE", "Origin, X-Requested-With, Content-Type, Accept");
    }
    next();
  });
}



// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'false'}));


// test http://localhost:3001/ping
app.get('/ping', function (req, res) {
 return res.send('pong');
});

var Board = require('./data/models/Board');

app.post('/boards', function(req, res, next) {

  var boardName = 'test';

  var createBoard = new Board({
    name: boardName
  })

  Board.create(createBoard).then(function(){
    console.log('board created');
  })
  res.send({type: 'POST'})
})



var listener = app.listen(process.env.PORT || 3001, function () {
  console.log('Server is listening on port ' + listener.address().port || 3001);
});
