const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const weatherSchema = new Schema(
  {
    city: {
      type: String,
      required: true
    },
    weather: [
      {
        time: String,
        temp: Number,
        feels_like: Number
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model('Weather', weatherSchema);
