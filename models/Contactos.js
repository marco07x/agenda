const Sequelize = require('sequelize');
const db = require('../config/db');
const slug = require('slug');
const shortid = require('shortid');

const Contactos = db.define('contactos', {
    id : {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    url : {
        type: Sequelize.STRING
    },
    nombre : {
        type : Sequelize.STRING(50),
        validate: {
            notEmpty: {
                msg: 'El nombre no puede ir vacio'
            }
        }
    },
    apellidoPaterno : {
        type : Sequelize.STRING(50),
        validate: {
            notEmpty: {
                msg: 'El apellido paterno no puede ir vacio'
            }
        }
    },
    apellidoMaterno : {
        type : Sequelize.STRING(50)
    },
    telefono : {
        type : Sequelize.NUMBER,
        validate: {
            notEmpty: {
                msg: 'El numero de telefono no puede ir vacio'
            },
            isNumeric: true,
        },
        unique: {
            args: true,
            msg: 'El numero ya se ha registrado'
        }
    },
    correo : {
        type : Sequelize.STRING,
        validate: {
            notEmpty: {
                msg: 'El correo no puede ir vacio'
            },
            isEmail: {
                msg : 'Agrega un correo valido'
            }
        },
        unique: {
            args: true,
            msg: 'El Correo ya se ha registrado'
        }
    },
    imagen : {
        type : Sequelize.STRING
    }
}, {
    hooks: {
        beforeCreate(contacto) {
            const url = slug(contacto.nombre).toLocaleLowerCase();

            contacto.url = `${url}-${shortid.generate()}`;
        }
    }
});

module.exports = Contactos;