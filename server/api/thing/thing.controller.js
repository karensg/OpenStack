'use strict';

var request = require('request');
var googleapis = require('googleapis');
var urlHelper = require('url');
var session = require('express-session');
var serverToken = '';

// Client ID and client secret are available at
// https://code.google.com/apis/console
var CLIENT_ID = '91132622899-9nf94p2rrjfetos89cavjp94as3ocmem.apps.googleusercontent.com';
var CLIENT_SECRET = 'XG4D_MXvp990d0f0kt5P97HF';
var REDIRECT_URL = 'http://localhost:9000/api/things/saveToken';
var SCOPE = 'https://www.google.com/m8/feeds';

var OAuth2Client = googleapis.auth.OAuth2;
var auth = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);

// Get list of things
exports.index = function(req, res) {

  getToken(req,res, function (token) {

    var options = {
      url: 'https://www.google.com/m8/feeds/contacts/default/full',
      headers: {
          'Authorization': 'Bearer ' + token
      }
    };
    function callback(error, response, body) {
      res.write(body);
      res.end();
    }
    request(options, callback);
  });

};

exports.getContact = function (req,res) {
  var id = req.params.id;
  getToken(req,res, function (token) {

    var options = {
      url: 'https://www.google.com/m8/feeds/contacts/default/base/' + id,
      headers: {
          'Authorization': 'Bearer ' + token
      }
    };
    function callback(error, response, body) {
      res.write(body);
      res.end();
    }
    request(options, callback);
  });
};

exports.addContact = function(req,res) {

  /*getToken(req,res, function (token) {
    var options = {
      url: 'https://www.google.com/m8/feeds/contacts/default/full',
      headers: {
          'Authorization': 'Bearer ' + token
      },
      body: "",
      method: 'POST'
    };
    function callback(error, response, body) {
      res.write(body);
      res.end();
    }
    request(options, callback);
  });*/
};

exports.login = function (req,res) {

  var url = auth.generateAuthUrl({ scope: SCOPE });
  res.redirect(url);

};

exports.saveToken = function (req,res) {
  var getAccessToken = function(code) {
    auth.getToken(code, function(err, tokens) {
      if (err) {
        console.log('Error while trying to retrieve access token', err);
        return;
      }
      auth.credentials = tokens;
      serverToken = tokens.access_token;
      res.redirect('/');
    });
  };

  var url_parts = urlHelper.parse(req.url, true);
  var code = url_parts.query.code;

  if( typeof code !== 'undefined' ) {
    getAccessToken(code);
  }
};



var getToken = function (req,res, cb) {
  if(serverToken != '') {
    cb(serverToken);
  } else {
    res.redirect('login');
  }
};
