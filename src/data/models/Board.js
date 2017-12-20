const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Create Schema
const UserSchema = new Schema({
  title: String
});
// Create Model
const Board = mongoose.model('board', UserSchema);
// Make Available
module.exports = Board;
