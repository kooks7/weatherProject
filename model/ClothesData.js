const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clothesSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  temp: {
    type: String,
    required: true
  },
  like: {
    type: Number,
    required: true
  },
  unlike: {
    type: Number,
    required: true
  },
  level: [Number]
});

const clothesdataSchema = new Schema({
  city: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  outer: [clothesSchema],
  top: [clothesSchema],
  bottom: [clothesSchema],
  acc: [clothesSchema]
});

module.exports = mongoose.model('Clothesdata', clothesdataSchema);
