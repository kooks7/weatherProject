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
    type: Number,
    required: true
  },
  level: [String]
});

module.exports = mongoose.model('Clothes', clothesSchema);
