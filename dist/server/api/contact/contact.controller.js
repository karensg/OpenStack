'use strict';


//Setup database
var mongoskin = require('mongoskin');
var db = mongoskin.db('mongodb://localhost:27017/openstack', {safe:true});
var contacts = db.collection('contacts');

// Get list of contacts
exports.index = function(req, res) {

  // Pagination, e.g. ?offset=10&limit=10
  var offset = (req.query.offset !== undefined ) ? req.query.offset : 0;
  var limit = (req.query.limit !== undefined ) ? req.query.limit : 100;

  // Filtering, e.g. ?filter=firstName::Ruud|lastName::Visser
  var filterString = {};
  var filterObj = {};
  if (req.query.filter !== undefined ) {
    filterString = req.query.filter;
    var filterArr = filterString.split('|');
    for (var i = 0; i < filterArr.length; i++) {
      var keyVals = filterArr[i].split('::');
      filterObj[keyVals[0]] = {$regex : new RegExp('.*' + keyVals[1] + '.*', 'i')};
    }
  }

  // Sorting, e.g. ?sort=lastName|-firstName
  var sortString = {};
  var sortObj = {};
  if (req.query.sort !== undefined ) {
    sortString = req.query.sort;
    var sortArr = sortString.split('|');
    for (var s = 0; s < sortArr.length; s++) {
      if(String(sortArr[s])[0] === '-') {
        // Descening
        sortObj[String(sortArr[s]).substr(1)] = -1;
      } else {
        // Ascending
        sortObj[sortArr[s]] = 1;
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
exports.addImage = function(req, res) {
  var userId = req.params.id;
  var fs = require("fs");
  var im = require('imagemagick');
  var mkdirp = require('mkdirp');
  var img = req.files.file
  var tmp_path = img.path;
  var imgName = slug(img.name);
  console.log(imgName);
  //set where the file should actually exists - in this case it is in the "images" directory
  var target_path = '/uploads/';
  var thumb_target_path = '/uploads/thumbs/';
  var base = req.app.get('appPath');
  console.log(base);
  mkdirp(base + target_path, function(err) {
    console.log(err);

    mkdirp(base + thumb_target_path, function(err) {
        console.log(err);
        fs.rename(tmp_path, base + target_path + imgName, function(err) {
          if (err) throw err;

            //delete the temporary file, so that the explicitly set temporary upload

            im.crop({
              srcPath: base + target_path + imgName,
              dstPath: base + thumb_target_path + imgName,
              width: 120,
              height: 120,
              quality: 1,
              gravity: "Center"
            }, function(err, stdout, stderr){
              if (err) throw err;
              console.log('resized image to fit within 100x100');
            });

            //dir does not get filled with unwanted files
            fs.unlink(tmp_path, function() {
               if (err) throw err;
               res.status(201).json({imgUrl: target_path + imgName, thumbUrl: thumb_target_path + imgName});
            });
        });

    });
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

var slug = function(str) {

  var $slug = str.replace(/[^a-z0-9-.]/gi, '').
  replace(/-+/g, '').
  replace(/^-|-$/g, '');
  return $slug.toLowerCase();
};


exports.import = function(req, res) {

  var xlsxj = require("xlsx-to-json");
  xlsxj({
    input: "./stafflistv0.1.xlsx",
    output: "./stafflistv0.1.json"
  }, function(err, result) {
    if(err) {
      console.error(err);
    }else {
      contacts.insert(result, function(err, result){
        console.log(err);
      });
    }
  });
};
