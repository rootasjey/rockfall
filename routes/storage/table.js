var azure = require('azure-storage');
var entGen = azure.TableUtilities.entityGenerator;

function Table(storageClient, tableName, partitionKey) {
  this.storageClient = storageClient;
  this.tableName = tableName;
  this.partitionKey = partitionKey;
  this.storageClient.createTableIfNotExists(tableName, function tableCreated(error) {
    if(error) {
      throw error
    }
  });
}

Table.prototype = {
  find: function(query, callback) {
    var self = this
    self.storageClient.queryEntities(query, function entitiesQueried(error, entities) {
      if(error) {
        callback(error)
      } else {
        callback(null, entities);
      }
    });
  },

  get: function (id, callback) {
    var that = this;
    this.storageClient.retrieveEntity(this.tableName, this.partitionKey, id, 
      (error, result, response) => {
        if (error) {
          return callback(id, error)
        }
        return callback(that.formatOutput(result))
    })
  },

  add: function(item, callback) {
    var that = this;
    // item.RowKey = uuid();
    item.RowKey = entGen.String(item.RowKey)
    item.PartitionKey = this.partitionKey
    item.sessionKey = Math.random() + Date.now()

    this.storageClient.insertEntity(this.tableName, item, {echoContent: true}, 
      (error, result, response) => {
        if(error){
          return callback(result, error)
        }
        callback(that.formatOutput(result))
    })
  },

  update: function(item, callback) {
    var self = this
    self.storageClient.queryEntity(self.tableName, self.partitionKey, item, (error, entity) => {
      if(error) {
        return callback(item, error)
      }

      entity.completed = true
      self.storageClient.updateEntity(self.tableName, entity, (error) => {
        if(error) {
          return callback(item, error)
        }
        callback(null)
      })
    })
  },

  formatOutput: function (entity) {
    return {
      id: entity.RowKey._,
      username: entity.username._,
      score: entity.score._,
      rock: entity.rock._,
      sessionKey: entity.sessionKey._
    }
  }
}

module.exports = Table;