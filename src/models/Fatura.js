const mongoose = require('mongoose');

const FaturaSchema = new mongoose.Schema({
    date: Date,
    contas: {
        type: Array,
        default: []
    },
    info: {
        type: Array,
        default: []
    },
    fiadores: {
        type: Array,
        default: []
    },
    vencimento: String
}, {
    timestamps: true,
});

module.exports = mongoose.model('Fatura', FaturaSchema)