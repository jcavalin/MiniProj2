const Expert = require('../models/expert.model');
const Animal = require('../models/animal.model');
const {
    validationResult
} = require('express-validator');
const ExpertMessages = require("../messages/expert.messages");

// A área tem de ser um dos grupos usados pelos animais (campo «group»).
function checkArea(area, callback) {
    Animal.distinct("group", (error, groups) => {
        if (error) throw error;
        return callback(groups.includes(area));
    });
}

// Lista os especialistas.
exports.get = (req, res) => {

    Expert.find(req.query, (error, experts) => {
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

    checkArea(req.body.area, (valid) => {
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
