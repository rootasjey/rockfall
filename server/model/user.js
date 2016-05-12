class User{

    constructor(userdefinition){

        this.name = 'user';
        this.userdef = userdefinition;
        this.bdUser = null;
        this.sequelize = null;
    }

    static initDB(dialect, userdb, password, address, port, dbname){

        this.sequelize = new Sequelize(dialect+'://'+userdb+':'+password+'@'+address+':'+port+'/'+dbname);

        this.bdUser = this.sequelize.define(this.name, this.userdef,
            {
                validate: {
                    bothCoordsOrNone: function() {
                        if ((this.pseudo === null) || (this.password === null) || (this.experience === null) || (this.point === null)) {
                            throw new Error('Require pseudo, password, experience and point field!')
                        }
                    }
                },
                freezeTableName: true // Model tableName will be the same as the model name
            }
        );
    }

    static createUser(paramUser, callbackSuccess, callbackError){

        this.bdUser.build(paramUser)
        .save()
        .then(function (result) {
            callbackSuccess(result);
        })
        .catch(function(e) {
            callbackError(e);
        });
    }

    static selectUser(selectUser, callbackSuccess, callbackError){

        this.bdUser.findAll(selectUser)
        .then(function(users){
            callbackSuccess(users);
        })
        .catch(function(e){
            callbackError(e);
        });

    }

    static updateUser(paramUser, callbackSuccess, callbackError){

        this.bdUser.update(paramUser)
        .then(function (result) {
            callbackSuccess(result);
        })
        .catch(function(e){
            callbackError(e);
        });
    }

    static deleteUser(paramUser, callbackSuccess, callbackError){

        this.bdUser.destroy(paramUser)
        .then(function (result) {
            callbackSuccess(result);
        })
        .catch(function(e){
            callbackError(e);
        });
    }
}
