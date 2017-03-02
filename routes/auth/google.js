"use strict";

const express     = require('express');
const router      = express.Router();
const google      = require('googleapis');
const popupTools  = require('popup-tools');

var TableUser = require('../storage/tableUsers');

var OAuth2, oauth2Client, 
    plus = google.plus('v1');

router
.get('/url', (req, res) => {
  OAuth2 = google.auth.OAuth2;
  oauth2Client = new OAuth2(
    '439248842878-5o5u0t7qopdb514ju7r9b5adelj2p8ca.apps.googleusercontent.com',
    '06vh16fdomOwJFFTmaQved7M',
    'http://localhost:8080/auth/google/redirect'
  );  

  let url = oauth2Client.generateAuthUrl({
    access_type: 'online',
    scope: [
      'https://www.googleapis.com/auth/plus.me'
      /*,'https://www.googleapis.com/auth/userinfo.email'*/]
  });
  res.status(200).send(url);
})

.get('/redirect', (req, res) => {
  oauth2Client.getToken(req.query.code, (err, tokens) => {
    if (!err) {
      oauth2Client.setCredentials(tokens);
    }

    plus.people.get({
      userId: 'me',
      auth: oauth2Client
    }, (err, jsonUser) => {
      if (err) { console.error(err) }

      var users = new TableUser();
      users
        .login(`google-${jsonUser.id}`, jsonUser.displayName)
        .then((azureUser) => {
          res.status(200).send(popupTools.popupResponse({user: azureUser}))
        })
    });
  });
});

module.exports = router;