const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CONFIG = require('../config/config');

// Especialista num grupo de animais (Tarefa 3.2).
const expertSchema = new Schema({
    name: String,
    institution: String,
    // Grupo de animais: o mesmo valor do campo «group» dos animais (ex.: "mamífero")
    area: String,
    email: String,
    active: {
        type: Boolean,
        default: true
    }
});

module.exports = global.mongoConnection.model(CONFIG.mongodb.collections.expert, expertSchema);
