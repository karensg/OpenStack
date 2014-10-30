'use strict';

//Setup database
var mongoskin = require('mongoskin');
var db = mongoskin.db('mongodb://localhost:27017/openstack', {safe:true});
var contacts = db.collection('contacts');

// Get list of contacts
exports.index = function(req, res) {
  // Pagination, e.g. ?offset=10&limit=10
  var offset = (req.query['offset'] !== undefined ) ? req.query['offset'] : 0;
  var limit = (req.query['limit'] !== undefined ) ? req.query['limit'] : 100;

  // Filtering, e.g. ?filter=firstName::Ruud|lastName::Visser
  var filterString = {};
  if (req.query['filter'] !== undefined ) {
    filterString = req.query['filter'];
    var filterArr = filterString.split('|');
    var filterObj = {};
    for (var i = 0; i < filterArr.length; i++) {
      var keyVals = filterArr[i].split('::');
      filterObj[keyVals[0]] = {$regex : new RegExp('.*' + keyVals[1] + '.*', 'i')};
    }
  }

  // Sorting, e.g. ?sort=lastName|-firstName
  var sortString = {};
  if (req.query['sort'] !== undefined ) {
    sortString = req.query['sort'];
    var sortArr = sortString.split('|');
    var sortObj = {};
    for (var i = 0; i < sortArr.length; i++) {
      if(String(sortArr[i])[0] == '-') {
        // Descening
        sortObj[String(sortArr[i]).substr(1)] = -1;
      } else {
        // Ascending
        sortObj[sortArr[i]] = 1;
      }
    }
  }
  // Pagination, filtering and sorting are generic and can be moved out of this function


  contacts.find(filterObj, {}, {skip: offset, limit: limit, sort: sortObj }).toArray(function (err, items) {
    res.setHeader('Content-Range', 'items ' + offset + '-' + (parseInt(offset)+parseInt(limit)) + '/*');
    res.json(items);
  });
};

/* GET contact properties. */
exports.getContact = function(req, res) {
  var userId = req.params.id;
  contacts.findById(userId, function(err, result) {
    if(result !== null) {
      res.json(result);
    } else {
      res.status(404).send({ msg:'error: ' + err });
    }
  });
};

/* Update current contact. */
exports.updateContact = function(req, res) {
  var userId = req.params.id;
  contacts.updateById(userId, {$set: req.body}, function(err, result) {
    if(result === 1) {
      res.status(204).send();
    } else {
      res.status(404).send({ msg:'error: ' + err });
    }
  });
};

/* Create new contact. */
exports.addContact = function(req, res) {
  contacts.insert(req.body, function(err, result){
    if(err === null) {
      res.status(201).json(result);
    } else {
      res.send({ msg:'error: ' + err });
    }
  });
};

/* DELETE current contact. */
exports.deleteContact = function(req, res) {
  var userId = req.params.id;
  contacts.removeById(userId, function(err, result) {
    if(result === 1) {
      res.status(204).send();
    } else {
      res.status(404).send({ msg:'error: ' + err });
    }
  });
};
