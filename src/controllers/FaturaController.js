
const Fatura = require('../models/Fatura');

const utils = require('../utils/utils');

module.exports = {
    async index(req, res) {
        const faturas = await Fatura.find();

        return res.json(faturas);
    },

    async getById(req, res) {
        const fatura = await Fatura.findById(req.params.id)

        return res.json(fatura);
    },

    async update(req, res) {
        const { contas, fiadores } = req.body;

        const fatura = await Fatura.findById(req.params.id)

        fatura.contas = contas;
        fatura.fiadores = fiadores;

        await fatura.save();

        return res.json(fatura);
    },

    async delete(req, res) {
        const fatura = await Fatura.findById(req.params.id)

        await fatura.remove();

        return res.send();
    },

    async extrair(req, res) {
        var result = { date: Date.now(), contas: [], info: [] };

        PDFParser = require("pdf2json");
        let pdfParser = new PDFParser();

        pdfParser.on("pdfParser_dataError", errData => console.error("error", errData.data));
        pdfParser.on("pdfParser_dataReady", async (pdfData) => {
            let data = [];
            let info = [];

            for (let i = 2; i < pdfData.formImage.Pages.length - 1; i++) {
                pdfData.formImage.Pages[i].Texts.map(d => {
                    data = [...data, d.R]
                })
            }

            pdfData.formImage.Pages[0].Texts.map(d => {
                info = [...info, d.R]
            })

            data.map(texts => {
                texts.map(t => {
                    let decoded = decodeURIComponent(t.T)
                    result.contas = [...result.contas, decoded];
                })
            });

            info.map(i => {
                i.map(t => {
                    let decoded = decodeURIComponent(t.T)
                    result.info = [...result.info, decoded];
                })
            });

            const fatura = await Fatura.create({
                date: result.date,
                contas: utils.formatData(result.contas),
                info: result.info,
                vencimento: utils.extractVencimento(result.info)
            });

            res.status(200).send(fatura)

            // fs.writeFile("src/ee.json", JSON.stringify(pdfData), (err, result) => {
            //     if (err) console.log('error', err);
            // });
        });

        pdfParser.parseBuffer(req.files.file.data);
    },

    // async bkp(req, res) {
    //     var result = { date: Date.now(), texts: [] };

    //     PDFParser = require("pdf2json");
    //     let pdfParser = new PDFParser();

    //     pdfParser.on("pdfParser_dataError", errData => console.error("error", errData.data));
    //     pdfParser.on("pdfParser_dataReady", async (pdfData) => {
    //         let data = [];
    //         let _data = [];
    //         let foo = [];
    //         pdfData.formImage.Pages[2].Texts.map(d => {
    //             data = [...data, d.R]
    //         })

    //         // pdfData.formImage.Pages.map(p => {
    //         //     foo = [...foo, p.Texts.map(d => [..._data, d.R])]
    //         // })

    //         data.map(texts => {
    //             texts.map(t => {
    //                 let decoded = decodeURIComponent(t.T)
    //                 result.texts = [...result.texts, decoded];
    //             })
    //         })

    //         const fatura = await Fatura.create({
    //             date: result.date,
    //             texts: result.texts,
    //         });

    //         res.status(200).send(fatura)

    //         // fs.writeFile("src/ee.json", JSON.stringify(pdfData), (err, result) => {
    //         //     if (err) console.log('error', err);
    //         // });
    //     });

    //     pdfParser.parseBuffer(req.files.file.data);
    // },
}