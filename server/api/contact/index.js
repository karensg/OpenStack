'use strict';

var express = require('express');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var controller = require('./contact.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id([0-9a-f]{24})', controller.getContact);
router.post('/:id([0-9a-f]{24})/image', multipartMiddleware, controller.addImage);
router.put('/:id([0-9a-f]{24})', controller.updateContact);
router.post('/', controller.addContact);
router.delete('/:id([0-9a-f]{24})', controller.deleteContact);


module.exports = router;
