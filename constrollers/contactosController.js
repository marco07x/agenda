const { validationResult } = require('express-validator');
const Contactos = require('../models/Contactos');
const slug = require('slug');

/*exports.subirImagen = (req, res, next) => {
    upload(req, res, function(error) {
        if(error instanceof multer.MulterError) {
            return next()
        }
    });
    next();
}
//Opciones de Multer
/*const configuracionMulter = {
    storage: fileStorage = multer.diskStorage({
        destination : (req, file, cb) => {
            cb(null, __dirname+'../../public/uploads');
        },
        filename : (req, file, cb) => {
            cb(null, file);
            console.log(file);
        }
    })
}

const upload = multer(configuracionMulter).single('imagen');
*/
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


    //Mostrar mensajes de error de express validator
    const errores = validationResult(req);
    if(!errores.isEmpty()) {
        return res.status(400).json({errores: errores.array()}),
        res.render('nuevoContacto', {
            nombrePagina : 'Nuevo Contacto',
            errores,
            contactos
        });
    } else {
        //No hay errores
        const url = slug(nombre).toLocaleLowerCase();
        await Contactos.create({ nombre, url, apellidoPaterno, apellidoMaterno, telefono, correo });
        res.redirect('/');
    }



    //console.log(req.body);

    //Validar que tengamos algi en el input
    

/*
    let errores = [];

    if(!nombre) {
        errores.push({'texto': 'El nombre del Contacto no puedo ir vacio'});
    }
*/
    //Si hay errores
  /*  if(errores.length > 0) {
        res.render('nuevoContacto', {
            nombrePagina : 'Nuevo Proyecto',
            errores
        })
    }
    */
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

exports.actualizarProyecto = async (req, res) => {

    //Mostrar contactos
    const contactos = await Contactos.findAll();

    const { nombre, apellidoPaterno, apellidoMaterno, telefono, correo } = req.body;


    //Mostrar mensajes de error de express validator
    const errores = validationResult(req);
    if(!errores.isEmpty()) {
        return res.status(400).json({errores: errores.array()}),
        res.render('nuevoContacto', {
            nombrePagina : 'Nuevo Contacto',
            errores,
            contactos
        });
    } else {
        //No hay errores
        const url = slug(nombre).toLocaleLowerCase();
        await Contactos.update(
            { nombre: nombre, apellidoPaterno: apellidoPaterno, apellidoMaterno: apellidoMaterno, telefono : telefono, correo : correo },
            /*{ apellidoPaterno: apellidoPaterno},
            { apellidoMaterno: apellidoMaterno},
            { telefono : telefono},
            { correo : correo},*/
            { where: { id: req.params.id }}
        );
        res.redirect('/');
    }



    //console.log(req.body);

    //Validar que tengamos algi en el input
    

/*
    let errores = [];

    if(!nombre) {
        errores.push({'texto': 'El nombre del Contacto no puedo ir vacio'});
    }
*/
    //Si hay errores
  /*  if(errores.length > 0) {
        res.render('nuevoContacto', {
            nombrePagina : 'Nuevo Proyecto',
            errores
        })
    }
    */
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