'use strict';

var express = require('express');
var controller = require('./contact.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id([0-9a-f]{24})', controller.getContact);
router.put('/:id([0-9a-f]{24})', controller.updateContact);
router.post('/', controller.addContact);
router.delete('/:id([0-9a-f]{24})', controller.deleteContact);


module.exports = router;
