'use strict';

var express = require('express');
var controller = require('./thing.controller');

var router = express.Router();

router.get('/login', controller.login);
router.get('/saveToken', controller.saveToken);

router.get('/', controller.index);
router.get('/:id', controller.getContact);
router.get('/post', controller.addContact);

module.exports = router;
