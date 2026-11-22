const Expert = require('../models/expert.model');
const ExpertMessages = require("../messages/expert.messages");

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
