"use strict";

const express     = require('express');
const router      = express.Router();
const FB          = require('fb');
const popupTools  = require('popup-tools');

router.get('/url', (req, res) => {
  let url = FB.getLoginUrl({
    appId: '1281899975260609',
    scope: 'email',
    redirect_uri: 'http://localhost:8080/auth/facebook/redirect'
  });
  res.status(200).send(url);
})

.get('/redirect', (req, res) => {
  FB.api('oauth/access_token', {
    client_id: '1281899975260609',
    client_secret: '71475f5981e9b5b702bb7d48625a5a37',
    redirect_uri: 'http://localhost:8080/auth/facebook/redirect',
    code: req.query.code
  }, function (fbRes) {
      if(!fbRes || fbRes.error) {
          console.log(!fbRes ? 'error occurred' : fbRes.error);
          return;
      }

      let accessToken = fbRes.access_token;
      let expires = fbRes.expires ? fbRes.expires : 0;
      FB.setAccessToken(accessToken);
      
      FB.api('/me', { fields: ['id', 'name', 'email'] }, (apiRes) => {
        if (apiRes && apiRes.error) {
            if(apiRes.error.code === 'ETIMEDOUT') {
            console.log('request timeout');
            res.status(500).send('request timeout');
          }
          else {
            console.log('error', res.error);
            res.status(500).send(res.error);
          }
          res.sendStatus(500);
        }
        
        res.status(200).send(popupTools.popupResponse({user: apiRes}));
      });
  });
  
});

module.exports = router;