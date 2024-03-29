const { Crew } = require("../models/crew.model")
const { Movie } = require("../models/movies.model")

exports.getCrewPage = async (req, res, next)=> {
    try{

       res.render('film-crew', {user: req.session})       
    }catch(e){
        console.log(e)
        res.render('error-503', {error: "Something went wrong, Try again"})
    }
}
exports.addCrew = async (req, res, next)=> {
    const {name, type} = req.body
    let arr = []
    try{
     const crew = await Crew.create({name, type})
     for(let i =0; i<req.body.movie.length; i++){
        let movieList = {
            movie: req.body.movie[i],
            rating: +(req.body.rating[i])   
        }
        arr.push(movieList)
        
     }
     await Crew.updateOne(
        {_id: crew._id},
        { $push : {"movieList" : arr}}
        )
    res.send(crew)
    }catch(e){
        console.log(e)
        res.render('error-503', {error: "Something went wrong, Try again"})
    }
}
exports.getNewMoviePage = async (req, res, next)=> {
    try{
        const directors = await Crew.find({type: "Director"})
        const producers = await Crew.find({type: "Producer"})
        const actors = await Crew.find({type: "Actor"})
        const actress = await Crew.find({type: "Actress"})
        const castingDir = await Crew.find({type: "Casting Director"})
        const writers = await Crew.find({type: "Writer"})
        const movieNumber= await Movie.countDocuments()
        res.render('new-movie', {
            user: req.session,
            directors, producers, actors, actress, castingDir, writers, movieNumber
        
        })       
    }catch(e){
        console.log(e)
        res.render('error-503', {error: "Something went wrong, Try again"})
    }
}
exports.addMovie = async (req, res, next)=> {
    try{
        let data = new Date(req.body.realeaseDate)
        let today = new Date();
        if(today > data){
            return res.send("invalid date")    
        }
        const {title, movieID, director, producer, actor, actress, castingDirector, writer, realeaseDate, budget} = req.body
        const movie = await Movie.create({title, movieID, director, producer, actor, actress, castingDirector, writer, realeaseDate, budget})
        res.send(movie)
    }catch(e){
        console.log(e)
        res.render('error-503', {error: "Something went wrong, Try again"})
    }
}
exports.getPredictionPage = async (req, res, next)=> {
    try{
       res.render('predict-movie', {
        user: req.session
       })
    }catch(e){
        console.log(e)
        res.render('error-503', {error: "Something went wrong, Try again"})
    }
}
exports.checkPrediction = async(req, res, next)=>{
    //check prediction by movie name or ID
    try{
        let directorStar = 0, producerStar= 0, actorStar = 0, actressStar =0, writerStar=0, castingDirStar=0, dateStar=0, budgetStar=0, movieRating
    const {title} = req.body
    const data =  await Movie.findOne({$or: [{title}, {movieID: title}]})
    if(data == null)   return res.send(`Movie Not Found & ${title}`)
    const director = await Crew.findOne({type: "Director", name: data.director})
    const producer = await Crew.findOne({type: "Producer", name: data.producer})
    const actor = await Crew.findOne({type: "Actor", name: data.actor})
    const actress = await Crew.findOne({type: "Actress", name: data.actress})
    const writer= await Crew.findOne({type: "Writer", name: data.writer})
    const castingDir = await Crew.findOne({type: "Casting Director", name: data.castingDirector})
    let arr = [director.movieList, producer.movieList, actor.movieList, actress.movieList, writer.movieList, castingDir.movieList ]
   
    function calculateRating(array, property) {
    const total = array.reduce((accumulator, object) => {
      return accumulator + object[property];
    }, 0);
  
    return total;
  }
for(let item of arr){
    if(item == arr[0]){
        directorStar= calculateRating(item, 'rating')/40;
    }
    if(item == arr[1]){
        
        producerStar= calculateRating(item, 'rating')/40;
    }
    if(item == arr[2]){
        actorStar= calculateRating(item, 'rating')/40;
    }
    if(item == arr[3]){
        actressStar= calculateRating(item, 'rating')/40;
    }
    if(item == arr[4]){
        writerStar= calculateRating(item, 'rating')/40;
    }
    if(item == arr[5]){
        castingDirStar= calculateRating(item, 'rating')/40;
    }
    console.log(item.length)
    
// }
}


var dayOfWeek = data.realeaseDate.getDay();
var isWeekend = (dayOfWeek === 6) || (dayOfWeek  === 0); // 6 = Saturday, 0 = Sunday
if(isWeekend == true){
    dateStar = 1
}else{
    dateStar = 0.5
}
if(data.budget >= 5000000){
    budgetStar = 1
}else{
    budgetStar = 0.5
}
movieRating = directorStar + producerStar + actorStar + actressStar + writerStar + castingDirStar + dateStar + budgetStar

const result =(movieRating/8)
if(result<0.5){
    return res.send(`Flop & ${data.movieID} & ${data.title}`)
}else if(result > 0.5 && result < 0.8){
    return res.send(`Hit & ${data.movieID} & ${data.title}`)
}else {
    return res.send(`Super Hit & ${data.movieID} & ${data.title}`)
}

    }catch(e){
        console.log(e)
        res.render('error-503', {error: "Something went wrong, Try again"})
    }
    
}
