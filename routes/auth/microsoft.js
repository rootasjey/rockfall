"use strict";

const express     = require('express');
const router      = express.Router();
const fetch       = require('node-fetch');
const popupTools  = require('popup-tools');

var clientId    = '00000000481C9865'
var secret      = 'PdmN3fjPXMWcz7fhTmBtfFQ'
var scopes      = 'wl.signin' /*,wl.emails */
var redirectURI = 'http://localhost:8080/auth/microsoft/redirect'

var TableUser = require('../storage/tableUsers');

router
.get('/url', (req, res) => {
  var url = `https://login.live.com/oauth20_authorize.srf?client_id=${clientId}` + 
            `&scope=${scopes}&grant_type=authorization_code` +
            `&response_type=code&redirect_uri=${redirectURI}&state=idle`

  res.status(200).send(url)
})

.get('/redirect', (req, res) => {
  let tokenURL = `https://login.live.com/oauth20_token.srf?client_id=${clientId}&` +
                  `redirect_uri=${redirectURI}&client_secret=${secret}&` +
                  `code=${req.query.code}&grant_type=authorization_code`
  
  fetch(tokenURL)
  .then((resp) => resp.json())
  .then((json) => {
    let query = `https://apis.live.net/v5.0/me?access_token=${json.access_token}`

    fetch(query)
    .then((rawUser) => rawUser.json())
    .then(jsonUser => {
      var users = new TableUser();
      users
        .login(`microsoft-${jsonUser.id}`, jsonUser.name)
        .then((azureUser) => {
          res.status(200).send(popupTools.popupResponse({user: azureUser}))
        })
    })
  })
})

module.exports = router