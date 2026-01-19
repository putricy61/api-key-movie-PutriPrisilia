const cache = require('../config/node-cache')
const tmdb = require('../config/tmdb')
const createMovie = require('../models/movie-model')

const searchMovie = async(req,res)=>{
    const query = req.query.query
    if(!query){
        return res.status(500).json({msg:'Query is required!!'})
    }

    if (cache.has(query)){
        console.log(`Data Fecth from cache`);
        return res.status(200).json(cache.get(query))
    }

    try{
        const response = await tmdb.get('/search/movie', {
            params:{query}
        })
        const movieResult = response.data.results.map(createMovie)
        console.log(`Data Fecth from tmdb server`);
        cache.set(query,movieResult)
        return res.status(200).json(movieResult)
        
    }
    catch(error){
        console.log(error);
        
    }
}

module.exports = {searchMovie}