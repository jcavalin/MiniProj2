const express = require('express');
let router = express.Router();
const ExpertController = require('../controllers/expert.controller');
const AuthController = require("../controllers/auth.controller");

router.route('/')
    .get(AuthController.checkAuth, ExpertController.get);

module.exports = router;
