const express = require('express');
let router = express.Router();
const SponsorController = require('../controllers/sponsor.controller');
const {
    body
} = require('express-validator');
const AuthController = require("../controllers/auth.controller");

// Tipos de patrocinador aceites (lista fechada)
const SPONSOR_TYPES = ["Empresa", "Particular"];

router.route('/')
    .get(AuthController.checkAuth, SponsorController.get)
    .post(AuthController.checkAuth, [body('name').isString().trim().not().isEmpty(),
        body('type').isIn(SPONSOR_TYPES),
        body('logo').optional({ checkFalsy: true }).isURL(),
        body('email').isEmail(),
        body('animals').custom(animals => Array.isArray(animals) && animals.length > 0),
        body('animals.*').isMongoId()
    ], SponsorController.create);

module.exports = router;
