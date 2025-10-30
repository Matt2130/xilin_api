const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const productoController = require('../controllers/producto.controller');

/* Ruta especifica */
router.get('/productos/featured', productoController.getFeaturedProductos);
/* Rutas generales */
router.get('/productos', productoController.getAllProductos);
router.get('/productos/:id', productoController.getProductoById);
router.post(
    '/crear/productos',
    [
        body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
        body('modelo').notEmpty().withMessage('El modelo es obligatorio'),
        body('caracteristicas').notEmpty().withMessage('Las caracteristicas son obligatorias'),
        body('imagen_url').notEmpty().withMessage('La imagen es obligatoria'),
        body('categoria_id').isInt().withMessage('La categoría debe ser un número entero')
    ],
    productoController.createProducto
);

module.exports = router;