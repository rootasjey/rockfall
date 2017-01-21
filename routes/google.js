"use strict";

const express     = require('express');
const router      = express.Router();
const google      = require('googleapis');
const popupTools  = require('popup-tools');

var OAuth2, oauth2Client, 
    plus = google.plus('v1');

router
.get('/url', (req, res) => {
  OAuth2 = google.auth.OAuth2;
  oauth2Client = new OAuth2(
    '439248842878-5o5u0t7qopdb514ju7r9b5adelj2p8ca.apps.googleusercontent.com',
    '06vh16fdomOwJFFTmaQved7M'
    ,'http://localhost:8080/auth/google/redirect'
  );  

  let url = oauth2Client.generateAuthUrl({
    // 'online' (default) or 'offline' (gets refresh_token)
    access_type: 'online',
    // If you only need one scope you can pass it as string
    scope: [
      'https://www.googleapis.com/auth/plus.me', 
      'https://www.googleapis.com/auth/userinfo.email']
  });
  res.status(200).send(url);
})

.get('/redirect', (req, res) => {
  console.log(req.query.code);
  oauth2Client.getToken(req.query.code, (err, tokens) => {
    // Now tokens contains an access_token and an optional refresh_token. 
    // Save them.
    if (!err) {
      oauth2Client.setCredentials(tokens);
    }

    plus.people.get({
      userId: 'me',
      auth: oauth2Client
    }, (err, response) => {
      if (err) {console.error(err);}
      res.send(popupTools.popupResponse({user: response}));
    });
  });
});

module.exports = router;