const express = require('express');
const mongoose = require('mongoose');

const items = require('./routes/api/items');

const app = express();

// JSON Parser Middleware
app.use(express.json());

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
    .connect(db, {useNewUrlParser: true})
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

// Use Routes
app.use('/api/items', items);

// Environmental var for later Heroku use
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));