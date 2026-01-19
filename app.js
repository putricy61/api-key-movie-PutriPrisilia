const express = require('express')
const cors = require('cors')
const router = require('./routes/movie-route')
const app = express()
require('dotenv').config()


app.use(cors())
app.use(express.json())

app.use('/api',router)
const PORT = process.env.PORT
app.listen(PORT, ()=>{
    console.log(`http://localhost:${PORT}/api/movie`);
    
})