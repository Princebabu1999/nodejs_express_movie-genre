//genre requests and returns related movie.
const Joi=require('joi')
const express=require('express')
const app= express()
app.use(express.json())
const movies=[
    {name:'Avengers - Endgame',director:'Anthony Russo and Joe Russo',genre:'action',release_date:'26 April 2019'},
    {name:'The Hangover',director:'Todd Phillips',genre:'comedy',release_date:'26 June 2009'},
    {name:'The Fault in Our Stars',director:'Josh Boone',genre:'romance',release_date:'4 July 2014'},
]
app.get('/api/movies',(req,res)=>{
    res.send(movies)
})
app.get('/api/movies/:genre',(req,res)=>{
    movies.forEach((m)=>{
        if(m.genre === req.params.genre){
            res.send(m)
        }        
    })
})
app.post('/api/movies',(req,res)=>{
    const {error}=validateMovie(req.body)
    if(error) return res.status(400).send(error.details[0].message)
    const movie={
        name:req.body.name,
        director:req.body.director,
        genre:req.body.genre,
        release_date:req.body.release_date
    }
    movies.push(movie)
    res.send(movie)
})
 function validateMovie(movie){
    const schema={
        name:Joi.string().required(),
        director:Joi.string().required(),
        genre:Joi.string().required(),
        release_date:Joi.string().required()
    }
    return Joi.validate(movie,schema)
 }

 app.delete('/api/movies/:genre',(req,res)=>{
     const movie=movies.find(m=>m.genre===req.params.genre)
     if(!movie) return res.status(400).send('Invalid genre')

     const index=movies.indexOf(movie)
     movies.splice(index,1)
     res.send(movies)
 })
const port=process.env.PORT || 3000
app.listen(port,()=> console.log(`listening to port ${port}...`))