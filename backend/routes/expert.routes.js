const express = require('express');
let router = express.Router();
const ExpertController = require('../controllers/expert.controller');
const {
    body,
    param
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

router.route('/:id')
    .get(AuthController.checkAuth, [param("id").isMongoId()], ExpertController.getOne)
    .put(AuthController.checkAuth, [param("id").isMongoId(), ...expertValidation], ExpertController.update)
    .delete(AuthController.checkAuth, [param("id").isMongoId()], ExpertController.delete);

module.exports = router;
