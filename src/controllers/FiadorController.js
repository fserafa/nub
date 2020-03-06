
const Fiador = require('../models/Fiador');

module.exports = {
    async store(req, res) {
        const { name } = req.body;

        const fiador = await Fiador.create({
            name
        });

        res.status(200).send(fiador);
    },

    async index(req, res) {
        const fiadores = await Fiador.find();

        return res.json(fiadores);
    },

    async delete(req, res) {
        const fiador = await Fiador.findById(req.params.id)

        await fiador.remove();

        return res.send();
    },
}     