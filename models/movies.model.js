const mongoose = require('mongoose');
const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    movieID: {
        type: String,
        required: true
    },
    director: {
        type: String,
    
    },
    producer: {
        type: String,

    },
    actor: {
        type: String,
    },
    actress: {
        type: String,
    },
    musicDirector: {
        type: String,
    },
    writer: {
        type: String,
    },
    realeaseDate:{
        type: Date
    },
    budget:{
        type: Number,
        default: 0.00
    }

},{
    timestamps: true
})
const Movie = mongoose.model('Movie', movieSchema);
exports.Movie = Movie;