const express = require('express');
const router = express.Router();
const userWebsitesRouter = require('../routes/user-websites');


router.use('/:userId', userWebsitesRouter);

module.exports = router;