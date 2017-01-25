"use strict";

const azure = require('azure-storage')

function Users() {
  var accountName = 'rockfallstorage',
    accountKey    = 'Xl+57BjOS2v2KUB+EOWCVpJN387Fbl9IrNOfBSNwmxtx6TPthxSq9WqHImC3SPLAOWNPfrHfekmLe02EngBgeg==',
    tableName     = 'users',
    partitionKey  = 'user'

    var Table = require('./table')

    this.tableUsers = new Table(
      azure.createTableService(accountName, accountKey),
      tableName, partitionKey)
}

Users.prototype = {
  login: function (accountid, username) {
    var that = this
    return new Promise((resolve, reject) => {
      that.tableUsers.get(accountid, 
      (foundUser, err) => {
        if (err && err.statusCode !== 404) {console.error(err); return reject(err)}
        if (typeof foundUser === 'object') {
          return resolve(foundUser);
        }

        let user = {
          RowKey  : accountid,
          score   : '0',
          rock    : 'default',
          username: username
        }

        that.tableUsers.add(user, 
        (addedUser, err) => {
          if (err) { console.error(err)}
          return resolve(addedUser);
        })
      })
    })
  },

  update: function (id) {
    
  },

  delete: function (id) {
    
  }
}

module.exports = Users