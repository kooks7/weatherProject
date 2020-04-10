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
        time: Date,
        temp: Number,
        feels_like: Number,
        required: true
      }
    ]
  },
  { timestamps: true }
);
