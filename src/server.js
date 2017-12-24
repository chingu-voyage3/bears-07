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

// Create new board
app.post('/api/boards', urlEncodedParser, function(req, res, next) {

  var createBoard = new Board({
    title: req.body.title,
    lists: []
  })

  Board.create(createBoard).then(function(){
    console.log('board created');
  }).then(res.json('board created'))

})

// Get all boards
app.get('/api/boards', function(req, res, next) {
  Board.find({}).then(allBoards => {
    res.json(allBoards);
  })
})

// Get single board
app.get('/api/boardview/:id', function(req, res, next) {
  Board.find({'_id':req.params.id}).then(board => {
    res.json(board);
  })
})


// Add a list to a board
app.put('/api/boards/:id', urlEncodedParser, function (req, res, next) {
  Board.findOneAndUpdate({'_id':req.params.id}, {$addToSet: {lists: { title: req.body.newListTitle, cards: [] }}}).then(updatedBoard => {
      res.json(updatedBoard);
    })
});

// Server listen
app.listen(app.get("port"), () => {
  console.log('Server is listening on port ' + app.get("port"));
});
