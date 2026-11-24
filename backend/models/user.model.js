const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CONFIG = require('../config/config');
const bcrypt = require("bcryptjs");

const userSchema = new Schema({
    name: String,
    type: String,
    birth_date: Date,
    description: String,
    location: {
        city: String,
        district: String,
        country: String
    },
    auth: {
        username: {
            type: String,
            unique: true
        },
        password: String,
        public_key: String,
        private_key: String
    },
    registration_date: {
        type: Date,
        default: Date.now
    },
    quiz: {
        id_quiz: String,
        points: Number,
        date: Date
    },
    active: {
        type: Boolean,
        default: true
    },
    gamification: {
        points: {
            type: Number,
            default: 0
        },
        quiz: {
            type: String,
            default: null
        }
    }

});

userSchema
    .pre("save", function (callback) {

        this.auth.public_key = Math.random().toString(36).substring(2) + this._id;
        this.auth.private_key = Math.random().toString(36).substring(2) + this._id;

        this.auth.password = bcrypt.hashSync(escape(this.auth.password), bcrypt.genSaltSync(2));

        callback();
    })

// Nas respostas da API (JSON) não vão a palavra-passe nem as chaves usadas para assinar o token,
// para não ficarem no browser (ex.: no localStorage depois do login). O username continua a ir.
userSchema.set("toJSON", {
    transform: function (doc, ret) {
        if (ret.auth) {
            delete ret.auth.password;
            delete ret.auth.public_key;
            delete ret.auth.private_key;
        }
        return ret;
    }
});

module.exports = global.mongoConnection.model(CONFIG.mongodb.collections.user, userSchema);