const express = require('express');
let router = express.Router();
const SponsorController = require('../controllers/sponsor.controller');
const AuthController = require("../controllers/auth.controller");

router.route('/')
    .get(AuthController.checkAuth, SponsorController.get);

module.exports = router;
