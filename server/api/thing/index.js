'use strict';

var express = require('express');
var controller = require('./thing.controller');

var router = express.Router();

router.get('/post', controller.addContacts);
router.get('/login', controller.login);
router.get('/saveToken', controller.saveToken);
router.get('/', controller.index);
router.get('/:id', controller.getContact);

module.exports = router;
