const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const weatherSchema = new Schema(
  {
    city: {
      type: String,
      required: true
    },
    gu: {
      type: String,
      required: true
    },
    weathers: [
      {
        time: String,
        temp: Number,
        feels_like: Number,
        condition: String,
        humidity: Number,
        wind_speed: Number,
        rain: Number
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model('Weather', weatherSchema);
