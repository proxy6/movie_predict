const { Movie } = require("../models/movies.model")

exports.dashboard = async (req, res, next)=> {
    const {email, password} = req.body
    try{
       const directors = await Movie.countDocuments({type: "Director"})
       const producers = await Movie.countDocuments({type: "Producer"})
       const actors = await Movie.countDocuments({type: "Actor"})
       const actress = await Movie.countDocuments({type: "Actress"})
       const writers = await Movie.countDocuments({type: "Writer"})
       const music = await Movie.countDocuments({type: "Music Director"})
       console.log(directors)
       res.render('dashboard', {user: req.session, directors, producers, actors, actress, writers, music})       
    }catch(e){
        console.log(e)
        res.render('error-503', {error: "Something went wrong, Try again"})
    }
}