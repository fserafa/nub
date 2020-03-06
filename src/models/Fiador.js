const mongoose = require('mongoose');

const FiadorSchema = new mongoose.Schema({
    name: String,
}, {
    timestamps: true,
});

module.exports = mongoose.model('Fiador', FiadorSchema)