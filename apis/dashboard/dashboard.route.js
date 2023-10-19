const express = require('express'); //import express module
const router = express.Router();
const dashboardController = require('./dashboard.controller'); 


router.post('/addstation', dashboardController.create);
router.get('/', dashboardController.get);

module.exports = router;