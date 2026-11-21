const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CONFIG = require('../config/config');

// Patrocinador de um ou mais animais (Tarefa 3.2).
const sponsorSchema = new Schema({
    name: String,
    // "Empresa" ou "Particular"
    type: String,
    // URL do logótipo (opcional)
    logo: String,
    email: String,
    // Referências à coleção de animais, como em animal.model.js (evaluation)
    animals: [{
        type: String,
        ref: CONFIG.mongodb.collections.animal
    }],
    active: {
        type: Boolean,
        default: true
    }
});

module.exports = global.mongoConnection.model(CONFIG.mongodb.collections.sponsor, sponsorSchema);
