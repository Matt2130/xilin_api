const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const solicitudController = require('../controllers/solicitud.controller');

router.post(
  '/solicitudes',
  [
    body('nombre_cliente').notEmpty().withMessage('El nombre es obligatorio'),
    body('email_cliente').isEmail().withMessage('Debe ser un correo electrónico válido'),
    body('telefono_cliente').notEmpty().withMessage('El teléfono es obligatorio'),
    body('producto_cotizado').notEmpty().withMessage('El producto de interés es obligatorio'),
    body('nombre_empresa').notEmpty().withMessage('El nombre de la empresa es obligatorio'),
    body('direccion_empresa').notEmpty().withMessage('La dirección de la empresa es obligatorio'),
    body('mensaje').notEmpty().withMessage('El mensaje es obligatorio'),
  ],
  solicitudController.createSolicitud
);

module.exports = router;