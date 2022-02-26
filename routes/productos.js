const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');

const { crearProducto, obtenerProductos, obtenerProducto, actualizarProducto, borrarProducto } = require('../controllers/productos');
const { existeProducto, existeCategoria } = require('../helpers/db-validators');

const router = Router();

/**
 * {{url}}/api/producto
 */

// Obtener todas las producto - publico
router.get('/', obtenerProductos);

// Obtener una producto por id - publico
router.get('/:id', [
    check('id', 'No es un id de Mongo valido').isMongoId(),
    check('id').custom(existeProducto),
    validarCampos
], obtenerProducto);

// Crear producto - privado - cualquier persona con un token valido
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'No es un id de Mongo valido').isMongoId(),
    check('categoria').custom(existeCategoria),
    validarCampos
], crearProducto);

// Actualizar producto - privado - cualquier persona con un token valido
router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    // check('categoria', 'No es un id de Mongo valido').isMongoId(),
    check('id').custom(existeProducto),
    validarCampos
], actualizarProducto);

// Borrar una producto - privado - Admin
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un id de Mongo valido').isMongoId(),
    check('id').custom(existeProducto),
    validarCampos
], borrarProducto);

module.exports = router;