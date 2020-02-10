const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');
const multer = require('multer');
let rawData = require('./F1040EZ.json');
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/', (req, res) => {
    // PDFParser = require("pdf2json");
    // let pdfParser = new PDFParser();

    // pdfParser.on("pdfParser_dataError", errData => console.error("error", errData));
    // pdfParser.on("pdfParser_dataReady", pdfData => {
    //     console.log("aqui", JSON.stringify(pdfData));
    //     fs.writeFile("src/opa.json", JSON.stringify(pdfData), (err, result) => {
    //         if (err) console.log('error', err);
    //     });
    // });

    // pdfParser.loadPDF('src/nubank.pdf');
    console.log(req.file)
    let data = [];
    let result = [];

    rawData.formImage.Pages[2].Texts.map(d => {
        data = [...data, d.R]
    })

    data.map(texts => {
        texts.map(t => {
            result = [...result, t.T]
        })
    })

    // var texts = []
    // data.formImage.Pages[2].Texts.map(d => {
    //     texts = [...texts, d.R]
    // })
    // let ar = [];

    // texts.map(t => {
    //     console.log(t)
    //     t.map(d => console.log(d.T))
    //     // console.log(t)
    //     // ar = [...ar, t.T]
    // })
    res.status(200).send(result)
})

app.listen(3000);