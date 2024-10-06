const express = require('express');
const path = require('path');
const app = express();

// Set up your static directory (if necessary)
app.use(express.static('public')); 

//importing routes
const noteRoutes = require('./routes/notes/notes');
const apiNoteRoutes = require('./routes/notes/api_notes');

// Middleware to parse incoming JSON requests
app.use(express.json());
// Middleware to parse URL-encoded form data (if needed)
app.use(express.urlencoded({ extended: true }));
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.use('/notes', noteRoutes);
app.use('/api/notes', apiNoteRoutes);
app.get('*', function (req, res){  
  res.sendFile(path.join(__dirname, 'public', '404.html'));
});

app.listen(3000);

module.exports = app;
