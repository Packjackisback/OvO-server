const express = require('express');
const app = express();
const port = 3000;

// Serve static files from the "public" directory (for downloading JSON files)
app.use(express.static('public'));

// Handle JSON file uploads
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('jsonFile'), (req, res) => {
  res.json({ message: 'File uploaded successfully!' });
});

app.get('/download/:fileName', (req, res) => {
  const fileName = req.params.fileName;
  res.download(`public/${fileName}`);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});