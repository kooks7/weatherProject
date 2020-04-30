const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cityIdSchema = new Schema({
  id: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  state: {
    type: String
  },
  country: {
    type: String,
    required: true
  },
  coord: {
    lon: {
      type: Number,
      required: true
    },
    lat: {
      type: Number,
      required: true
    }
  }
});

module.exports = mongoose.model('city', cityIdSchema);
