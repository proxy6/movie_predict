const mongoose = require('mongoose');
const crewSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    movieList: [{
        movie:{
        type: String,
      
        },
        rating:{
            type: Number,
           
        }
    }],

},{
    timestamps: true
})
const Crew = mongoose.model('Crew', crewSchema);
exports.Crew = Crew;