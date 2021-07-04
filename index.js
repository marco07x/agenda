const express = require('express');
const routes = require('./routes');
const path = require('path');
const bodyParser = require('body-parser');
const flash = require('connect-flash');

//Helpers con algunas funciones
const helpers = require('./helpers');

//Creando la conexion a la Base de Datos
const db = require('./config/db');

//Importar el modelo
require('./models/Contactos');

db.sync()
    .then(() => console.log('Conectado al servidor'))
    .catch(error => console.log(error));

//Creando la app
const app = express();

//Cargar archivos estaticos
app.use(express.static('public'))

//Habilitar Pug
app.set('view engine', 'pug');

//Añadiendo la carpeta de las vistas
app.set('views', path.join(__dirname, './views'));

//agregar flash
app.use(flash());

//Pasar var dump
app.use((req, res, next) => {
    res.locals.vardump = helpers.vardump;
    next();
});

//Habilitando bodyParser para leer datos del formulario
app.use(bodyParser.urlencoded({extended: true}));

//Rutas
app.use('/', routes());

//Habilitar un puerto
app.listen(4120);