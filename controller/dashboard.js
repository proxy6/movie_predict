const { Crew } = require("../models/crew.model")

exports.dashboard = async (req, res, next)=> {
    const {email, password} = req.body
    try{
       const directors = await Crew.countDocuments({type: "Director"})
       const producers = await Crew.countDocuments({type: "Producer"})
       const actors = await Crew.countDocuments({type: "Actor"})
       const actress = await Crew.countDocuments({type: "Actress"})
       const writers = await Crew.countDocuments({type: "Writer"})
       const castingDir = await Crew.countDocuments({type: "Casting Director"})
  
       res.render('dashboard', {user: req.session, directors, producers, actors, actress, writers, castingDir})       
    }catch(e){
        console.log(e)
        res.render('error-503', {error: "Something went wrong, Try again"})
    }
}