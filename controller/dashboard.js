
const {faker} =  require("@faker-js/faker")
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

exports.seedDB = async(req, res, next)=>{
    // populate actors
    for(let i = 0; i<=100; i++){
        await Crew.create({
           name: faker.name.fullName({sex: "male"}),
           type: "Actor",
           movieList:[
            {
            movie: faker.random.words(4),
            rating: faker.datatype.float({ min: 1, max: 10, precision: 0.1 }),
           },
           {
            movie: faker.random.words(4),
            rating: faker.datatype.float({ min: 1, max: 10, precision: 0.1 }),
           },
           {
            movie: faker.random.words(4),
            rating: faker.datatype.float({ min: 1, max: 10, precision: 0.1 }),
           },
           {
            movie: faker.random.words(4),
            rating: faker.datatype.float({ min: 1, max: 10, precision: 0.1 }),
           },

           ]
        })


        //populate Actress 
        await Crew.create({
            name: faker.name.fullName({sex: "female"}),
            type: "Actress",
            movieList:[
             {
             movie: faker.random.words(4),
             rating: faker.datatype.float({ min: 1, max: 10, precision: 0.1 }),
            },
            {
             movie: faker.random.words(4),
             rating: faker.datatype.float({ min: 1, max: 10, precision: 0.1 }),
            },
            {
             movie: faker.random.words(4),
             rating: faker.datatype.float({ min: 1, max: 10, precision: 0.1 }),
            },
            {
             movie: faker.random.words(4),
             rating: faker.datatype.float({ min: 1, max: 10, precision: 0.1 }),
            },
 
            ]
         })
        
        //populate Director
        await Crew.create({
            name: faker.name.fullName({sex: "female" | "male"}),
            type: "Director",
            movieList:[
             {
             movie: faker.random.words(4),
             rating: faker.datatype.float({ min: 1, max: 10, precision: 0.1 }),
            },
            {
             movie: faker.random.words(4),
             rating: faker.datatype.float({ min: 1, max: 10, precision: 0.1 }),
            },
            {
             movie: faker.random.words(4),
             rating: faker.datatype.float({ min: 1, max: 10, precision: 0.1 }),
            },
            {
             movie: faker.random.words(4),
             rating: faker.datatype.float({ min: 1, max: 10, precision: 0.1 }),
            },
 
            ]
         })

         //populate producer

         await Crew.create({
            name: faker.name.fullName({sex: "female" | "male"}),
            type: "Producer",
            movieList:[
             {
             movie: faker.random.words(4),
             rating: faker.datatype.float({ min: 1, max: 10, precision: 0.1 }),
            },
            {
             movie: faker.random.words(4),
             rating: faker.datatype.float({ min: 1, max: 10, precision: 0.1 }),
            },
            {
             movie: faker.random.words(4),
             rating: faker.datatype.float({ min: 1, max: 10, precision: 0.1 }),
            },
            {
             movie: faker.random.words(4),
             rating: faker.datatype.float({ min: 1, max: 10, precision: 0.1 }),
            },
 
            ]
         })

         //populate writer
         await Crew.create({
            name: faker.name.fullName({sex: "female" | "male"}),
            type: "Writer",
            movieList:[
             {
             movie: faker.random.words(4),
             rating: faker.datatype.float({ min: 1, max: 10, precision: 0.1 }),
            },
            {
             movie: faker.random.words(4),
             rating: faker.datatype.float({ min: 1, max: 10, precision: 0.1 }),
            },
            {
             movie: faker.random.words(4),
             rating: faker.datatype.float({ min: 1, max: 10, precision: 0.1 }),
            },
            {
             movie: faker.random.words(4),
             rating: faker.datatype.float({ min: 1, max: 10, precision: 0.1 }),
            },
 
            ]
         })

         //populate casting director
         await Crew.create({
            name: faker.name.fullName({sex: "female" | "male"}),
            type: "Casting Director",
            movieList:[
             {
             movie: faker.random.words(4),
             rating: faker.datatype.float({ min: 1, max: 10, precision: 0.1 }),
            },
            {
             movie: faker.random.words(4),
             rating: faker.datatype.float({ min: 1, max: 10, precision: 0.1 }),
            },
            {
             movie: faker.random.words(4),
             rating: faker.datatype.float({ min: 1, max: 10, precision: 0.1 }),
            },
            {
             movie: faker.random.words(4),
             rating: faker.datatype.float({ min: 1, max: 10, precision: 0.1 }),
            },
 
            ]
         })
    }
    res.send("Database Seeded")
}