'use strict';

var express = require('express');
var controller = require('./contact.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id([0-9a-f]{24})', controller.getContact);

module.exports = router;
