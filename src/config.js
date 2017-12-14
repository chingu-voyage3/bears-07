// Import Mongoose
const mongoose = require('mongoose');
// Use native promises
mongoose.Promise = global.Promise;
// Set up mongoose connection
mongoose.connect('mongodb://localhost/bears-07', {
  useMongoClient: true
});
// Get the connection
var db = mongoose.connection;
// Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'connection error:'));
// Once our connection opens, our callback will be called
db.once('open', function() {
  // we're connected!
  console.log('We\'re connected!');
  });
