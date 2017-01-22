"use strict";

const express     = require('express');
const router      = express.Router();
const twitterAPI  = require('node-twitter-api');
const popupTools  = require('popup-tools');

var twitter = new twitterAPI({
  consumerKey: 'Z8tH6fapQux9nQ4reXvAPx48b',
  consumerSecret: 'uh5hvelU5kJpkLnKNTryAhu9lY1shtw4dnI3ENqLbsNRFpW3nH',
  callback: 'http://localhost:8080/auth/twitter/redirect',
  x_auth_access_type: "read"
})

var _token, _tokenSecret

router.get('/url', (req, res) => {
  twitter.getRequestToken((err, reqToken, reqTokenSecret, results) => {
      if (err) {
          console.log("Error getting OAuth request token : " + err);
          res.status(500).send(err);
      }

      _token        = reqToken;
      _tokenSecret  = reqTokenSecret;
      res.status(200).send(twitter.getAuthUrl(reqToken));
  });
})

.get('/redirect', (req, res) => {
  twitter.getAccessToken(_token, _tokenSecret, req.query.oauth_verifier, 
    (error, accessToken, accessTokenSecret, results) => {
      if (error) {
          console.log(error);
          res.status(500).send(error);
      }

      twitter.verifyCredentials(accessToken, accessTokenSecret, {include_email: true}, 
        (error, data, response) => {
          if (error) {
              //something was wrong with either accessToken or accessTokenSecret
              //start over with Step 1
              res.status(500).send(error);
          }
          
          res.status(200).send(popupTools.popupResponse({user: data}));
      });
    });
});

module.exports = router;