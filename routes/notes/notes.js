const express = require('express');
const path = require('path');
const app =express();
const router = express.Router();


// Set up your static directory (if necessary)
app.use(express.static('public')); 

router.post('/login', function(req, res){
req.body
res.sendFile();
res.json({message:'everything will be okay'})
})

router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../../public', 'notes.html'));
  });

module.exports = router;