const { validationResult } = require('express-validator');
const Solicitud = require('../models/solicitud.model');
const { google } = require('googleapis');

const KEY_FILE_PATH = '/etc/secrets/google-credentials.json';

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

const auth = new google.auth.GoogleAuth({
    keyFile: KEY_FILE_PATH, 
    scopes: SCOPES,
});

const solicitudController = {
  async createSolicitud(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let nuevaSolicitud;

    try {
      nuevaSolicitud = await Solicitud.create(req.body);

    } catch (dbError) {
      console.error('Error al guardar en Supabase:', dbError);
      return res.status(500).json({ message: "Error interno del servidor al crear la solicitud" });
    }

    try {
      const sheets = google.sheets({ version: 'v4', auth });
      const spreadsheetId = process.env.GOOGLE_SHEET_ID;
      const data = req.body;

      const newRow = [
        new Date().toISOString(),
        data.nombre_cliente,
        data.email_cliente,
        data.telefono_cliente,
        data.producto_cotizado,
        data.nombre_empresa,
        data.direccion_empresa,
        data.mensaje
      ];

      await sheets.spreadsheets.values.append({
        spreadsheetId,
        range: "'Hoja 1'!A1",
        valueInputOption: 'USER_ENTERED',
        resource: {
          values: [newRow],
        },
      });
      console.log('Solicitud guardada en Google Sheets');

    } catch (sheetsError) {
      console.error('Error al guardar en Google Sheets:', sheetsError.message);
    }
    
    res.status(201).json(nuevaSolicitud);
  }
};

module.exports = solicitudController;