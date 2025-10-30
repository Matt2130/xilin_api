const { validationResult } = require('express-validator');
const Solicitud = require('../models/solicitud.model');

const solicitudController = {
  async createSolicitud(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const nuevaSolicitud = await Solicitud.create(req.body);
      
      res.status(201).json(nuevaSolicitud);
    } catch (error) {
      console.error(error);
      
      res.status(500).json({ message: "Error interno del servidor al crear la solicitud" });
    }
  }
};

module.exports = solicitudController;