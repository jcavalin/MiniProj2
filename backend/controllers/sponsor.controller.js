const Sponsor = require('../models/sponsor.model');
const Animal = require('../models/animal.model');
const {
    validationResult
} = require('express-validator');
const SponsorMessages = require("../messages/sponsor.messages");

// Confirma que os animais novos existem e estão ativos. Os animais que o patrocinador
// já tinha (alreadySponsored) são aceites mesmo que entretanto tenham sido desativados.
function checkAnimals(animals, alreadySponsored, callback) {
    const newAnimals = animals.filter(id => !alreadySponsored.includes(id));
    if (newAnimals.length === 0) return callback(true);

    Animal.countDocuments({
        _id: { $in: newAnimals },
        active: true
    }, (error, count) => {
        if (error) throw error;
        return callback(count === newAnimals.length);
    });
}

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

exports.getOne = (req, res) => {

    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    Sponsor.findOne({
        _id: req.params.id
    }).populate("animals", "name active").exec((error, sponsor) => {
        if (error) throw error;
        if (!sponsor) return res.status(SponsorMessages.error.e0.http).send(SponsorMessages.error.e0);
        let message = SponsorMessages.success.s2;
        message.body = sponsor;
        return res.status(message.http).send(message);
    });

}

exports.create = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    // Só se podem patrocinar animais que existem e estão ativos
    const animals = [...new Set(req.body.animals)];
    checkAnimals(animals, [], (valid) => {
        if (!valid)
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

exports.update = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    Sponsor.findOne({
        _id: req.params.id
    }, (error, sponsor) => {
        if (error) throw error;
        if (!sponsor) return res.status(SponsorMessages.error.e0.http).send(SponsorMessages.error.e0);

        const animals = [...new Set(req.body.animals)];
        checkAnimals(animals, sponsor.animals, (valid) => {
            if (!valid)
                return res.status(SponsorMessages.error.e1.http).send(SponsorMessages.error.e1);

            // Só os campos do formulário podem ser alterados (o estado «active» fica como está)
            Sponsor.findOneAndUpdate({
                _id: req.params.id
            }, {
                $set: {
                    name: req.body.name,
                    type: req.body.type,
                    logo: req.body.logo,
                    email: req.body.email,
                    animals: animals
                }
            }, {
                new: true
            }).populate("animals", "name active").exec((error, sponsor) => {
                if (error) throw error;
                if (!sponsor) return res.status(SponsorMessages.error.e0.http).send(SponsorMessages.error.e0);

                let message = SponsorMessages.success.s1;
                message.body = sponsor;
                return res.status(message.http).send(message);
            });
        });
    });
}
