const Sponsor = require('../models/sponsor.model');
const Animal = require('../models/animal.model');
const {
    validationResult
} = require('express-validator');
const SponsorMessages = require("../messages/sponsor.messages");

// Lista os patrocinadores, com o nome e o estado dos animais patrocinados.
exports.get = (req, res) => {

    Sponsor.find(req.query).populate("animals", "name active").exec((error, sponsors) => {
        if (error) throw error;

        let message = SponsorMessages.success.s2;

        if (sponsors.length < 0)
            message = SponsorMessages.success.s5;

        message.body = sponsors;
        return res.status(message.http).send(message);
    });

}

exports.create = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    // Só se podem patrocinar animais que existem e estão ativos
    const animals = [...new Set(req.body.animals)];
    Animal.countDocuments({
        _id: { $in: animals },
        active: true
    }, (error, count) => {
        if (error) throw error;
        if (count !== animals.length)
            return res.status(SponsorMessages.error.e1.http).send(SponsorMessages.error.e1);

        new Sponsor({
            name: req.body.name,
            type: req.body.type,
            logo: req.body.logo,
            email: req.body.email,
            animals: animals
        }).save((error, sponsor) => {
            if (error) throw error;
            sponsor.populate("animals", "name active", (error) => {
                if (error) throw error;
                let message = SponsorMessages.success.s0;
                message.body = sponsor;
                return res.header("location", "/sponsors/" + sponsor._id).status(message.http).send(message);
            });
        });
    });
}
