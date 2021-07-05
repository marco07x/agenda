const express = require('express');
const router = express.Router();
const contactosController = require('../constrollers/contactosController');
const {check} = require('express-validator');

module.exports = function() {
    //Rutas
    router.get('/', contactosController.contactosLista);
    router.get('/nuevo-contacto', contactosController.formularioContacto);

    //Enviar al formulario
    router.post('/nuevo-contacto', 
        [
            check('nombre', 'El nombre es obligatorio').not().isEmpty().trim().escape(),
            check('apellidoPaterno', 'El apellido paterno es obligatorío').not().isEmpty().trim().escape(),
            check('telefono', 'Ingresa un numero de telefono valido').isNumeric().trim().escape(),
            check('correo', 'El correo electronico no es valido').isEmail()
        ],
        //contactosController.subirImagen,
    contactosController.nuevoContacto);

    //Listar Contactos
    router.get('/contactos/:url', contactosController.contactoPorUrl);

    //Actualizar el Proyecto
    router.get('/contacto/editar/:id', contactosController.formularioEditar);
    router.post('/nuevo-contacto/:id', 
        [
            check('nombre', 'El nombre es obligatorio').not().isEmpty().trim().escape(),
            check('apellidoPaterno', 'El apellido paterno es obligatorío').not().isEmpty().trim().escape(),
            check('telefono', 'Ingresa un numero de telefono valido').isNumeric().trim().escape(),
            check('correo', 'El correo electronico no es valido').isEmail()
        ],
    contactosController.actualizarContacto);

    //Eliminar Contacto
    router.delete('/contactos/:url', contactosController.eliminarContacto);
    return router;
}