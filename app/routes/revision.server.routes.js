var express = require('express');
var controller = require('../controllers/revision.server.controller');
var router = express.Router();

router.get('/', controller.showTitleForm);
router.get('/getOverall', controller.getOverall);
router.get('/getLatest', controller.getLatest);
module.exports = router;