const express = require('express');
const path = require('path');
const fs = require('fs');

const router = express.Router();
const app = express();

// Set up your static directory (if necessary)
app.use(express.static('public')); 

router.get('/', function (req, res) {
    //Fetch the notes from the database
    const filePath = path.join(__dirname, '../../db', 'db.json');
    // Read the file asynchronously
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
        return res.status(500).json({ error: 'Unable to read file' });
        }
        // Parse the JSON file content
        const jsonData = JSON.parse(data);
        // Send the JSON data as a response
        res.json(jsonData);
    });
  });

router.post('/', function(req, res){
  const newData = req.body;  // The data you want to write
  const filePath = path.join(__dirname, '../../db', 'db.json');
  // Read existing file content
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Unable to read file' });
    }

    let jsonData = JSON.parse(data);
    // Add the new data (could be appended or merged based on your needs)
    jsonData.push(newData);
    // Write updated content back to the file
    fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), 'utf8', (err) => {
      if (err) {
        return res.status(500).json({ error: 'Unable to write to file' });
      }
      res.json({ message: 'Note saved successfully' });
    });
  });
});

router.delete('/:id', function(req, res){
  console.log(req.params.id);
  const noteId = req.params.id;
  const filePath = path.join(__dirname, '../../db', 'db.json');
  // Read existing file content
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Unable to read file' });
    }
    let jsonData = JSON.parse(data);
    // Add the new data (could be appended or merged based on your needs)
    jsonData = jsonData.filter(function(element){
      return element.id != noteId;
    });
    // Write updated content back to the file
    fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), 'utf8', (err) => {
      if (err) {
        return res.status(500).json({ error: 'Unable to write to file' });
      }
      res.json({ message: 'Note saved successfully' });
    });
  });
});

module.exports = router;