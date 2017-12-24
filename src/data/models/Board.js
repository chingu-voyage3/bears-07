const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Create Schema
const CardSchema = new Schema({
  title: String
})

const ListSchema = new Schema({
  title: String,
  cards: [CardSchema]
});

const UserSchema = new Schema({
  title: String,
  lists: [ListSchema]
});
// Create Model
const Board = mongoose.model('board', UserSchema);
// Make Available
module.exports = Board;
