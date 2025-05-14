const mongoose = require("mongoose"); 

const movieSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true,
        unique: true
    },
    seats: [
    {
      seatNumber: Number,
      isBooked: {
        type: Boolean,
        default: false,
      },
      username: {
        type: String,
        default: null,
      },
    },
  ],   
})

const Movie = mongoose.model("movie",movieSchema);

module.exports = Movie;