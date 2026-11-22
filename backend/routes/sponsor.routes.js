const express = require('express');
let router = express.Router();
const SponsorController = require('../controllers/sponsor.controller');
const {
    body,
    param
} = require('express-validator');
const AuthController = require("../controllers/auth.controller");

// Tipos de patrocinador aceites (lista fechada)
const SPONSOR_TYPES = ["Empresa", "Particular"];

// Validação dos campos do formulário, comum a criar (POST) e editar (PUT)
const sponsorValidation = [body('name').isString().trim().not().isEmpty(),
    body('type').isIn(SPONSOR_TYPES),
    body('logo').optional({ checkFalsy: true }).isURL(),
    body('email').isEmail(),
    body('animals').custom(animals => Array.isArray(animals) && animals.length > 0),
    body('animals.*').isMongoId()
];

router.route('/')
    .get(AuthController.checkAuth, SponsorController.get)
    .post(AuthController.checkAuth, sponsorValidation, SponsorController.create);

router.route('/:id')
    .get(AuthController.checkAuth, [param("id").isMongoId()], SponsorController.getOne)
    .put(AuthController.checkAuth, [param("id").isMongoId(), ...sponsorValidation], SponsorController.update)
    .delete(AuthController.checkAuth, [param("id").isMongoId()], SponsorController.delete);

module.exports = router;
