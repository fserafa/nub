const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');
const multer = require('multer');
const app = express();
const fileUpload = require('express-fileupload');
const mongoose = require('mongoose');

const Fatura = require('./models/Fatura');

mongoose.connect('mongodb+srv://admin:admin@nubank-a8feq.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(fileUpload());



app.post('/extrair', (req, res) => {
    var result = { date: Date.now(), texts: [] };

    PDFParser = require("pdf2json");
    let pdfParser = new PDFParser();

    pdfParser.on("pdfParser_dataError", errData => console.error("error", errData.data));
    pdfParser.on("pdfParser_dataReady", async (pdfData) => {
        let data = [];
        pdfData.formImage.Pages[2].Texts.map(d => {
            data = [...data, d.R]
        })

        data.map(texts => {
            texts.map(t => {
                let decoded = decodeURIComponent(t.T)
                result.texts = [...result.texts, decoded];
            })
        })

        const fatura = await Fatura.create({
            date: result.date,
            texts: result.texts,
        });

        res.status(200).send(fatura)

        // fs.writeFile("src/ee.json", JSON.stringify(pdfData), (err, result) => {
        //     if (err) console.log('error', err);
        // });
    });

    pdfParser.parseBuffer(req.files.file.data);
});

app.get('/faturas', async (req, res) => {
    const faturas = await Fatura.find();

    return res.json(faturas);
})

app.get('/fatura/:id', async (req, res) => {
    const fatura = await Fatura.findById(req.params.id)

    return res.json(fatura);
})

app.listen(3333, () => {
    console.log('App running on port 3333');
});