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
        type : Sequelize.STRING
    },
    apellidoPaterno : {
        type : Sequelize.STRING
    },
    apellidoMaterno : {
        type : Sequelize.STRING
    },
    telefono : {
        type : Sequelize.STRING
    },
    correo : {
        type : Sequelize.STRING,
        validate: {
            isEmail: {
                msg : 'Agrega un correo valido'
            }
        },
        unique: {
            args: true,
            msg: 'Correo ya registrado'
        }
    },
    foto : {
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