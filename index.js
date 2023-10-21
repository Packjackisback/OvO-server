const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const _ = require('lodash');

const app = express();
app.use(express.static('uploads'));

// enable files upload
app.use(fileUpload({
    createParentPath: true
}));

//add other middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));

//start app 
const port = process.env.PORT || 3000;

app.listen(port, () => 
  console.log(`App is listening on port ${port}.`)
);

app.post('/upload-levels', async (req, res) => {
    try {
        if(!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            //Use the name of the input field (i.e. "levels") to retrieve the uploaded file
            let levels = req.files.levels;
            
            //Use the mv() method to place the file in the upload directory (i.e. "uploads")
            levels.mv('./uploads/' + levels.name);

            //send response
            res.send({
                status: true,
                message: 'File is uploaded',
                data: {
                    name: levels.name,
                    mimetype: levels.mimetype,
                    size: levels.size
                }
            });
        }
    } catch (err) {
        res.status(500).send(err);
    }
});