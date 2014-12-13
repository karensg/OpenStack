/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var config = require('./config/environment');

//oauth2-server
var oauthserver = require('oauth2-server');

// Setup server
var app = express();

//Set oauthserver
app.oauth = oauthserver({
  model: require('./model'), // See below for specification
  grants: ['password'],
  debug: true
});

app.all('/oauth/token', app.oauth.grant());

app.get('/client/', function (req, res) {
  // Does not require an access_token
  res.send('Public area');
});

app.use(app.oauth.errorHandler());

var server = require('http').createServer(app);
require('./config/express')(app);
require('./routes')(app);

// Start server
server.listen(config.port, function () {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});


// Expose app
exports = module.exports = app;
