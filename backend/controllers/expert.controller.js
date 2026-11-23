const Expert = require('../models/expert.model');
const Animal = require('../models/animal.model');
const {
    validationResult
} = require('express-validator');
const ExpertMessages = require("../messages/expert.messages");

// A área tem de ser um dos grupos usados pelos animais (campo «group»).
// Ao editar, a área que o especialista já tinha continua válida.
function checkArea(area, currentArea, callback) {
    Animal.distinct("group", (error, groups) => {
        if (error) throw error;
        return callback(area === currentArea || groups.includes(area));
    });
}

// Lista os especialistas.
// Não usa req.query como filtro, para não aceitar operadores do MongoDB vindos do URL (ex.: ?name[$ne]=).
exports.get = (req, res) => {

    Expert.find({}, (error, experts) => {
        if (error) throw error;

        let message = ExpertMessages.success.s2;

        if (experts.length < 0)
            message = ExpertMessages.success.s5;

        message.body = experts;
        return res.status(message.http).send(message);
    });

}

exports.create = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    checkArea(req.body.area, null, (valid) => {
        if (!valid)
            return res.status(ExpertMessages.error.e1.http).send(ExpertMessages.error.e1);

        new Expert({
            name: req.body.name,
            institution: req.body.institution,
            area: req.body.area,
            email: req.body.email
        }).save((error, expert) => {
            if (error) throw error;
            let message = ExpertMessages.success.s0;
            message.body = expert;
            return res.header("location", "/experts/" + expert._id).status(message.http).send(message);
        });
    });
}

exports.getOne = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    Expert.findOne({
        _id: req.params.id
    }, (error, expert) => {
        if (error) throw error;
        if (!expert) return res.status(ExpertMessages.error.e0.http).send(ExpertMessages.error.e0);
        let message = ExpertMessages.success.s2;
        message.body = expert;
        return res.status(message.http).send(message);
    });
}

exports.update = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    Expert.findOne({
        _id: req.params.id
    }, (error, expert) => {
        if (error) throw error;
        if (!expert) return res.status(ExpertMessages.error.e0.http).send(ExpertMessages.error.e0);

        checkArea(req.body.area, expert.area, (valid) => {
            if (!valid)
                return res.status(ExpertMessages.error.e1.http).send(ExpertMessages.error.e1);

            // Só os campos do formulário podem ser alterados (o estado «active» fica como está)
            Expert.findOneAndUpdate({
                _id: req.params.id
            }, {
                $set: {
                    name: req.body.name,
                    institution: req.body.institution,
                    area: req.body.area,
                    email: req.body.email
                }
            }, {
                new: true
            }, (error, expert) => {
                if (error) throw error;
                if (!expert) return res.status(ExpertMessages.error.e0.http).send(ExpertMessages.error.e0);

                let message = ExpertMessages.success.s1;
                message.body = expert;
                return res.status(message.http).send(message);
            });
        });
    });
}

exports.delete = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    Expert.deleteOne({
        _id: req.params.id
    }, (error, result) => {
        if (error) throw error;
        if (result.deletedCount <= 0) return res.status(ExpertMessages.error.e0.http).send(ExpertMessages.error.e0);
        return res.status(ExpertMessages.success.s3.http).send(ExpertMessages.success.s3);
    });
}
