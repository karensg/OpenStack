var express = require('express');
var router = express.Router();

var contacts = db.collection('contancts');


/* GET contacts listing. */
router.get('/', function(req, res) {
  contacts.find(req.query).toArray(function (err, items) {
    res.json(items);
  });
});

/* GET contact properties. */
router.get('/:id([0-9a-f]{24})', function(req, res) {
  var userId = req.params.id;
  contacts.findById(userId, function(err, result) {
    if(result !== null) {
      res.json(result);
    } else {
      res.status(404).send({ msg:'error: ' + err });
    }
  });
});

/* Update current contact. */
router.put('/:id([0-9a-f]{24})', function(req, res) {
  var userId = req.params.id;
  contacts.updateById(userId, {$set: req.body}, function(err, result) {
    if(result === 1) {
      res.status(204).send();
    } else {
      res.status(404).send({ msg:'error: ' + err });
    }
  });
});


/* Create new contact. */
router.post('/', function(req, res) {
  contacts.insert(req.body, function(err, result){
    if(err === null) {
      res.status(201).json(result);
    } else {
      res.send({ msg:'error: ' + err });
    }

  });
});

/* DELETE current contact. */
router.delete('/:id([0-9a-f]{24})', function(req, res) {
  var userId = req.params.id;
  contacts.removeById(userId, function(err, result) {
    if(result === 1) {
      res.status(204).send();
    } else {
      res.status(404).send({ msg:'error: ' + err });
    }
  });
});

module.exports = router;
