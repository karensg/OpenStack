'use strict';

var request = require('request');
var googleapis = require('googleapis');
var urlHelper = require('url');
var session = require('express-session');
var xml = require('xml');
var serverToken = '';

var CLIENT_ID = '91132622899-9nf94p2rrjfetos89cavjp94as3ocmem.apps.googleusercontent.com';
var CLIENT_SECRET = 'XG4D_MXvp990d0f0kt5P97HF';
var REDIRECT_URL = 'http://localhost:9000/api/things/saveToken';
var SCOPE = 'https://www.google.com/m8/feeds';

var OAuth2Client = googleapis.auth.OAuth2;
var auth = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);

// Get list of Google contacts
exports.index = function(req, res) {

  getToken(req,res, function (token) {

    var options = {
      url: 'https://www.google.com/m8/feeds/contacts/default/full',
      headers: {
          'Authorization': 'Bearer ' + token,
          'GData-Version': '3.0'
      }
    };
    function callback(error, response, body) {
      res.write(body);
      res.end();
    }
    request(options, callback);
  });

};

// Get a contact by ID
exports.getContact = function (req,res) {
  var id = req.params.id;
  getToken(req,res, function (token) {

    var options = {
      url: 'https://www.google.com/m8/feeds/contacts/default/base/' + id,
      headers: {
          'Authorization': 'Bearer ' + token,
          'GData-Version': '3.0'
      }
    };
    function callback(error, response, body) {
      res.write(body);
      res.end();
    }
    request(options, callback);
  });
};

// Create all contacts
exports.addContacts = function(req,res) {

  getToken(req,res, function (token) {
    var options = {
      url: 'https://www.google.com/m8/feeds/contacts/default/full',
      headers: {
          'Authorization': 'Bearer ' + token,
          'GData-Version': '3.0',
          'If-Match': '*'
      },
      body: xmlString,
      method: 'POST'
    };
    function callback(error, response, body) {
      res.write(body);
      res.end();
    }
    request(options, callback);
  });
};

// Redirect a user to a Google login page
exports.login = function (req,res) {

  var url = auth.generateAuthUrl({ scope: SCOPE });
  res.redirect(url);

};

// Callback: save token
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

// Used by all controllers
var getToken = function (req,res, cb) {
  if(serverToken != '') {
    cb(serverToken);
  } else {
    res.redirect('things/login');
  }
};

var xmlString = xml({
    'atom:entry':
    [
        {
            '_attr': {
                'xmlns:atom': 'http://www.w3.org/2005/Atom',
                'xmlns:gd': 'http://schemas.google.com/g/2005'
            }
        },
        {
            'atom:category': {
                '_attr': {
                    'scheme': 'http://schemas.google.com/g/2005#kind',
                    'term': 'http://schemas.google.com/contact/2008#contact'
                }
            }
        },
        {
            'gd:name': [
                { 'gd:givenName': 'Elizabeth' },
                { 'gd:familyName': 'Bennet' },
                { 'gd:fullName': 'Elizabeth Bennet' }
            ]
        },
        {
            'atom:content': [
                {
                    '_attr': {
                        'type': 'text'
                    }
                },
                'Notes'
            ]
        },
        {
            'gd:email': {
                '_attr': {
                    'rel': 'http://schemas.google.com/g/2005#work',
                    'primary': 'true',
                    'address': 'liz@gmail.com',
                    'displayName': 'E. Bennet'
                }
            }
        }
    ]
}, true);
