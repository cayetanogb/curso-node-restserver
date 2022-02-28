const { Categoria, Producto } = require('../models');
const Role = require('../models/rol');
const Usuario = require('../models/usuario');

// Validar rol
const esRoleValido = async(rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if ( !existeRol ) {
        throw new Error(`El rol ${ rol } no esta registrado en la BD`);
    }
}

// Validar email
const emailExiste = async(correo = '') => {
    const existeEmail = await Usuario.findOne({ correo });
    if ( existeEmail ) {
        throw new Error(`El correo: ${ correo } ya esta registrado`);
    }
}

// Validar usuario
const existeUsuarioPorId = async(id) => {
    const existeUsuario = await Usuario.findById(id);
    if ( !existeUsuario ) {
        throw new Error(`El usuario con id: ${ id } no existe`);
    }
}

// Validar categoria
const existeCategoria = async(id) => {
    const categoria = await Categoria.findById(id);
    if (!categoria) {
        throw new Error(`La categoria con id: ${ id } no existe`);
    }
}

// Validar producto
const existeProducto = async(id) => {
    const producto = await Producto.findById(id);
    if (!producto) {
        throw new Error(`El producto con id: ${ id } no existe`);
    }
}

// Validar coleccion
const coleccionesPermitidas = (coleccion = '', colecciones = []) => {
    const incluida = colecciones.includes( coleccion );
    if (!incluida) {
        throw new Error(`La coleccion ${ coleccion } no es permitida - ${ colecciones }`);
    }

    return true;
}

module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId,
    existeCategoria,
    existeProducto,
    coleccionesPermitidas
}