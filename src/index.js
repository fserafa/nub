const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const fileUpload = require('express-fileupload');
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://admin:admin@nubank-a8feq.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(fileUpload());

app.use(require('./routes'))

app.listen(3333, () => {
    console.log('App running on port 3333');
});