const mongoose = require('mongoose');

const FaturaSchema = new mongoose.Schema({
    date: Date,
    texts: Array,
}, {
    timestamps: true,
});

module.exports = mongoose.model('Fatura', FaturaSchema)