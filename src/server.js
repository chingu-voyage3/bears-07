const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const urlEncodedParser = bodyParser.urlencoded({ extended: false });
const router = express.Router();
var Board = require('./data/models/Board');
const app = express();

app.set("port", process.env.PORT || 3001);

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



// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'false'}));





//To prevent errors from Cross Origin Resource Sharing, we will set our headers to allow CORS with middleware like so:
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');

  next();
});




// test http://localhost:3001/ping
app.get('/ping', function (req, res) {
 return res.send('pong');
});

app.get('/', function(req, res) {
  res.json('you did it');
});

app.post('/api/boards', function(req, res, next) {

  var boardName = 'test2';

  var createBoard = new Board({
    name: boardName
  })

  Board.create(createBoard).then(function(){
    console.log('board created');
  })
  return res.send('board created')
})



app.listen(app.get("port"), () => {
  console.log('Server is listening on port ' + app.get("port"));
});
