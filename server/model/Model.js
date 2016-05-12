"use strict";

var Sequelize = require('sequelize');
/** La classe parente de tout les modèles. Elle possède les méthodes d'accès à la base */
module.exports = class Model{

    /** constructeur ou l'on spécifie le nom de la table, le modèle de données et la validation d'enregistrement

    @tableName (String): le nom de la table dans la base de données sur lequel on travail.
    @modelDefinition (object): définition de la structure du modèle, champ, type, validation, etc.
    @modelValidation (object): ajout des contraintes sur la table.
    */
    constructor(tableName, modelDefinition, modelValidation){

        this.name = tableName;
        this.modelDef = modelDefinition;
        this.modelValidation = modelValidation;
        this.bdModel = null;
        this.sequelize = null;
    }

    /** on initialise la connexion à la base de données, définie le modèle et synchronise la base de données
    @dialect (String):postgre, mysql, etc.
    @userdb (String): nom de l'utilisateur base de données.
    @password (String): mot de passe de l'utilisateur.
    @address (String): adresse du serveur.
    @dbname (String): nom de la base de données.
    @callback (object): fonction exécuté à la fin de l'initialisation

    */
    initDB(dialect, userdb, password, address, port, dbname, callback){

        this.sequelize = new Sequelize(dialect+'://'+userdb+':'+password+'@'+address+':'+port+'/'+dbname);

        this.bdModel = this.sequelize.define(this.name, this.modelDef,
            {
                validate: this.modelValidation,
                freezeTableName: true // Model tableName will be the same as the model name
            }
        );

        this.bdModel.sync({force: false}).then(function () {
            callback();
        });
    }

    /** fonction éxecuté avant chaque requête qui vérifie que la connexion a bien été établie sur le base de données. */
    checkInitDB(){

        if(this.bdModel == null || this.sequelize == null){
            throw new Error("L'initialisation de la base de données n'a pas été effectué! ..... server/model/Model.js");
        }
    }


    /** Création d'un enregistrement dans la table spécifié pour un modèle donné
    @paramModel (object): structure du modèle contenant les données à inserer.
    @callbackSuccess (Ref) : fonction exécuté si la création réussie
    @callbackError (Ref) : fonction exécuté si la création échoue
    */
    createModel(paramModel, callbackSuccess, callbackError){

        this.checkInitDB();
        this.bdModel.build(paramModel)
        .save()
        .then(function (model) {
            callbackSuccess(model);
        })
        .catch(function(e) {
            callbackError(e);
        });
    }

    /** Sélection d'enregistrement dans la table spécifié pour un modèle donné
    @selectModel (object) : structure des informations à récupérer et/ou des conditions de sélection.
    @callbackSuccess (Ref) : fonction exécuté si la sélection réussie
    @callbackError (Ref) : fonction exécuté si la sélection échoue
    */
    selectModel(selectModel, callbackSuccess, callbackError){

        this.checkInitDB();
        this.bdModel.findAll(selectModel)
        .then(function(models){
            callbackSuccess(models);
        })
        .catch(function(e){
            callbackError(e);
        });

    }

    /** Mise à Jour d'enregistrement dans la table spécifié pour un modèle donné
    @paramModel (object) : structure des informations à modifier et/ou des conditions de modification.
    @callbackSuccess (Ref) : fonction exécuté si la modification réussie
    @callbackError (Ref) : fonction exécuté si la modification échoue
    */
    updateModel(paramModel, callbackSuccess, callbackError){

        this.checkInitDB();
        this.bdModel.update(paramModel)
        .then(function (result) {
            callbackSuccess(result);
        })
        .catch(function(e){
            callbackError(e);
        });
    }


    /** Suppression d'enregistrement dans la table spécifié pour un modèle donné
    @paramModel (object) : s conditions de suppression.
    @callbackSuccess (Ref) : fonction exécuté si la suppression réussie
    @callbackError (Ref) : fonction exécuté si la suppression échoue
    */
    deleteModel(paramModel, callbackSuccess, callbackError){

        this.checkInitDB();
        this.bdModel.destroy(paramModel)
        .then(function (result) {
            callbackSuccess(result);
        })
        .catch(function(e){
            callbackError(e);
        });
    }
}
