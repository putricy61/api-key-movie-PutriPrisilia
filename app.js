// const express = require('express')
// const cors = require('cors')
// const router = require('./routes/movie-route')
// const app = express()
// require('dotenv').config()


// app.use(cors())
// app.use(express.json())

// app.use('/api',router)
// const PORT = process.env.PORT
// app.listen(PORT, ()=>{
//     console.log(`http://localhost:${PORT}/api/movie`);
    
// })

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Movie Search TMDb</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <style>
    body {
      font-family: Arial, sans-serif;
      background: #0f172a;
      color: #fff;
      margin: 0;
      padding: 0;
    }

    header {
      background: #020617;
      padding: 20px;
      text-align: center;
    }

    .controls {
      display: flex;
      justify-content: center;
      gap: 10px;
      margin: 20px;
    }

    /* Update bagian ini di dalam <style> */
.controls input {
    padding: 10px;
    width: 300px;
    border-radius: 5px;
    border: 1px solid #2563eb;
    background: #1e293b; /* Warna gelap */
    color: #ffffff;      /* WAJIB: Warna teks putih agar terlihat */
    outline: none;
    position: relative;
    z-index: 10;        /* Memastikan input tidak tertutup elemen lain */
}

    .controls button {
      padding: 10px 16px;
      border: none;
      border-radius: 5px;
      background: #2563eb;
      color: #fff;
      cursor: pointer;
    }

    .controls button:hover {
      background: #1d4ed8;
    }

    #movie-list {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
      gap: 20px;
      padding: 20px;
    }

    .movie-card {
      background: #020617;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 10px rgba(0,0,0,0.4);
      transition: transform 0.2s;
    }

    .movie-card:hover {
      transform: scale(1.03);
    }

    .movie-card img {
      width: 100%;
      height: 270px;
      object-fit: cover;
    }

    .movie-card .info {
      padding: 10px;
    }

    .movie-card h3 {
      font-size: 14px;
      margin: 0 0 6px 0;
    }

    .movie-card p {
      font-size: 12px;
      margin: 2px 0;
      color: #cbd5f5;
    }
  </style>
</head>
<body>

  <header>
    <h1>🎬 Movie Search - TMDb</h1>
    <p>Search & Popular Movies</p>
  </header>

  <div class="controls">
    <input 
      type="text" 
      id="searchInput" 
      placeholder="Search movie title..." 
    />
    <button id="searchBtn">Search</button>
    <button id="popularBtn">Popular Movies</button>
  </div>

  <div id="movie-list"></div>

  <script>
    const movieList = document.getElementById('movie-list');
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const popularBtn = document.getElementById('popularBtn');

    const BASE_URL = 'http://localhost:8000/api/movie'; 

    function renderMovies(response) {
        movieList.innerHTML = '';
        
        const movieData = response.data || response;

        if (!movieData || !Array.isArray(movieData) || movieData.length === 0) {
            movieList.innerHTML = '<p style="text-align:center; width:100%;">No movies found.</p>';
            return;
        }

        movieData.forEach(movie => {
            const card = document.createElement('div');
            card.className = 'movie-card';
            
            const imageUrl = movie.background 
                ? `https://image.tmdb.org/t/p/w500${movie.background}` 
                : 'https://via.placeholder.com/180x270?text=No+Image';

            card.innerHTML = `
                <img src="${imageUrl}" alt="${movie.title}" />
                <div class="info">
                    <h3>${movie.title}</h3>
                    <p>⭐ Rating: ${movie.rating || 'N/A'}</p>
                </div>
            `;
            movieList.appendChild(card);
        });
    }

    async function searchMovies() {
        const query = searchInput.value.trim();
        if (!query) return alert('Silakan masukkan judul film!');

        try {
            const response = await fetch(`${BASE_URL}?query=${encodeURIComponent(query)}`);
            if (!response.ok) throw new Error('Server tidak merespons');
            const result = await response.json();
            renderMovies(result); 
        } catch (error) {
            console.error("Detail Error:", error);
            alert('Gagal mencari film.');
        }
    }

    async function fetchPopularMovies() {
        movieList.innerHTML = '<p style="text-align:center; width:100%;">Loading popular movies...</p>';
        try {
            const response = await fetch(`${BASE_URL}/popular`);
            if (!response.ok) throw new Error('Gagal ambil data populer');
            const result = await response.json();
            renderMovies(result);
        } catch (error) {
            console.error("Popular Error:", error);
            alert('Gagal memuat film populer. Pastikan Backend di port 8000 jalan!');
        }
    }

    searchBtn.addEventListener('click', searchMovies);
    popularBtn.addEventListener('click', fetchPopularMovies);
    
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') searchMovies();
    });

    window.onload = fetchPopularMovies;
</script>

</body>
</html>


const express = require('express')
const cors = require('cors')
const router = require('./routes/movie-route')
const app = express()
require('dotenv').config()

app.use(cors())
app.use(express.json())
app.use('/api/movie', router);

// EXPORT app untuk digunakan di test atau di server.js
module.exports = app;

// Pindahkan listen ke file baru atau buat kondisi seperti ini:
if (require.main === module) {
    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}/api/movie`);
    });
}
