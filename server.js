const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
// const db = require('./app/models');
const db = require('./app/config/db.config');
const movieRoutes = require('./app/routes/movie.routes');
const genreRoutes = require('./app/routes/genre.routes');
const artistRoutes = require('./app/routes/artist.routes');

// Connect to MongoDB
const connection = mongoose.createConnection(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  
  connection.once('open', () => {
    console.log("Connected to the database!");
  });
  
  connection.on('error', (err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// Middleware
const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
    res.json({ message: "Welcome to Upgrad Movie booking application development." });
  });

app.use('/api/movies', movieRoutes);
app.use('/api/genres', genreRoutes);
app.use('/api/artists', artistRoutes);


const PORT = process.env.PORT || 8085;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});