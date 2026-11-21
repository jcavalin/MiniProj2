const Sponsor = require('../models/sponsor.model');
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
