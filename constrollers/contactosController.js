const { validationResult } = require('express-validator');
const Contactos = require('../models/Contactos');
const slug = require('slug');

exports.contactosLista = async (req, res) => {
    //Mostrar contactos
    const contactos = await Contactos.findAll();

    res.render('index', {
        nombrePagina : 'Agenda de Contactos',
        contactos
    });
}

exports.formularioContacto = async (req, res) => {
    //Mostrar contactos
    const contactos = await Contactos.findAll();

    res.render('nuevoContacto', {
        nombrePagina : 'Nuevo Contacto',
        contactos
    });
}

exports.nuevoContacto = async (req, res) => {

    //Mostrar contactos
    const contactos = await Contactos.findAll();

    const { nombre, apellidoPaterno, apellidoMaterno, telefono, correo } = req.body;
    //Revisar no tener errores
    try {
        //No hay errores
        const url = slug(nombre).toLocaleLowerCase();
        await Contactos.create({ nombre, url, apellidoPaterno, apellidoMaterno, telefono, correo });
        res.redirect('/');
    } catch (error) {
        res.render('nuevoContacto', {
            errores: error.errors,
            nombrePagina : 'Nuevo Contacto',
            contactos
        });
    }
}

exports.contactoPorUrl = async (req, res, next) => {
    //Mostrar contactos
    const contactosPromise = Contactos.findAll();

    //Llamado de un solo contacto por url
    const contactoPromise = Contactos.findOne({
        where: {
            url: req.params.url
        }
    });
    const [contactos, contacto] = await Promise.all([contactosPromise, contactoPromise])


    //Pasar a la siguiente linea si no se encuentra una url
    if(!contacto)
        return next();

    //Renderizar la vista
    res.render('datos', {
        nombrePagina : 'Datos del Contacto',
        contacto,
        contactos
    });
}

exports.formularioEditar = async (req, res) => {
    //Mostrar contactos
    const contactosPromise = Contactos.findAll();

    const contactoPromise = Contactos.findOne({
        where: {
            id: req.params.id
        }
    });
    const [contactos, contacto] = await Promise.all([contactosPromise, contactoPromise])

    //Renderizar la vista
    res.render('nuevoContacto', {
        nombrePagina : 'Edidar Contacto',
        contactos,
        contacto
    });
}

exports.actualizarContacto = async (req, res) => {

    //Mostrar contactos
    const contactos = await Contactos.findAll();

    const { nombre, apellidoPaterno, apellidoMaterno, telefono, correo } = req.body;


    //Mostrar mensajes de error de express validator
    try {
        //No hay errores
        const url = slug(nombre).toLocaleLowerCase();
        await Contactos.update(
            { nombre: nombre, apellidoPaterno: apellidoPaterno, apellidoMaterno: apellidoMaterno, telefono : telefono, correo : correo },
            { where: { id: req.params.id }}
        );
        res.redirect('/');
    } catch (error) {
        res.render('nuevoContacto', {
            errores: error.errors,
            nombrePagina : 'Nuevo Contacto',
            contactos
        });
    }
}

exports.eliminarContacto = async (req, res, next) => {
    //Acceder a los datos de la url
    const {urlContacto} = req.query;

    const resultado = await Contactos.destroy({where: {url : urlContacto}});

    if(!resultado) {
        return next();
    }

    res.status(200).send('Contacto Eliminado Correctamente');
}