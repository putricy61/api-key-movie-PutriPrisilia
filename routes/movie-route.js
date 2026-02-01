// const express = require('express')
// const movieController = require('../controllers/movie-controller')
// const router = express.Router()

// router.get('/movie',movieController.searchMovie)

// module.exports = router
const express = require('express')
const movieController = require('../controllers/movie-controller')
const router = express.Router()

router.get('/',movieController.searchMovie)
router.get('/popular', movieController.getPopularMovies)

module.exports = router
