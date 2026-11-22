const express = require('express');
let router = express.Router();
const ExpertController = require('../controllers/expert.controller');
const {
    body
} = require('express-validator');
const AuthController = require("../controllers/auth.controller");

// Validação dos campos do formulário de especialista
const expertValidation = [body('name').isString().trim().not().isEmpty(),
    body('institution').isString().trim().not().isEmpty(),
    body('area').isString().trim().not().isEmpty(),
    body('email').isEmail()
];

router.route('/')
    .get(AuthController.checkAuth, ExpertController.get)
    .post(AuthController.checkAuth, expertValidation, ExpertController.create);

module.exports = router;
