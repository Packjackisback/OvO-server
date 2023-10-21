const express = require('express');
const multer = require('multer');
const fs = require('fs');
const app = express();
const port = 3000;

// Define the folder for file uploads
const upload = multer({ dest: 'commLevels/' });

app.use(express.static('public'));

// Handle file uploads
app.post('/upload', upload.single('file'), (req, res) => {
  const file = req.file;
  const description = req.body.description || 'No description provided';

  // Update the index with file name and description
  const index = 'index.json';
  const entry = {
    fileName: file.originalname,
    description: description,
  };

  fs.readFile(index, (err, data) => {
    let indexData = [];

    if (!err) {
      indexData = JSON.parse(data);
    }

    indexData.push(entry);

    fs.writeFile(index, JSON.stringify(indexData, null, 2), (err) => {
      if (err) {
        console.error('Error updating the index:', err);
        res.status(500).send('Error updating the index');
      } else {
        console.log('File uploaded and index updated.');
        res.status(200).send('File uploaded and index updated.');
      }
    });
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});