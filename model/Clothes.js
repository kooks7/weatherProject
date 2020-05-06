const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clothesSchema = new Schema({
  city: {
    type: String,
    required: true
  },
  time: {
    type: Number,
    required: true
  },
  outer: {
    name: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    temp: {
      type: Number,
      required: true
    },
    like: {
      type: Number,
      required: true
    },
    level: [String]
  },
  top: {
    name: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    temp: {
      type: Number,
      required: true
    },
    like: {
      type: Number,
      required: true
    },
    level: [String]
  }
});

module.exports = mongoose.model('Clothes', clothesSchema);
