var Sequelize = require('sequelize');

module.exports = {

    uid: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true // Automatically gets converted to SERIAL for postgres
    },
    pseudo : {
        type: Sequelize.STRING,
        allowNull:false,
        validate:{
          isAlphanumeric:true,
          len:[2,10],
        }
    },
    email : {
        type: Sequelize.STRING,
        allowNull:false,
        validate:{
          isEmail:true,
        }
    },
    /*
    password_hash: Sequelize.STRING,
    password: {
        type: Sequelize.VIRTUAL,
        set: function (val) {
           this.setDataValue('password', val); // Remember to set the data value, otherwise it won't be validated
           this.setDataValue('password_hash', val);
         },
         validate: {
            len:[5,20],
            isAlphanumeric:true
        }
    },*/
    experience : {
        type: Sequelize.BIGINT,
        allowNull:false,
        defaultValue:0,
        validate:{
            isNumeric: true
        }
    },
    point : {
        type: Sequelize.DOUBLE,
        allowNull:false,
        defaultValue:0,
        validate:{
            isDecimal: true
        }
    }
}
