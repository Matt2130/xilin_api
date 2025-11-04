const { validationResult } = require('express-validator');
const Solicitud = require('../models/solicitud.model');
const { google } = require('googleapis');

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

let auth;
try {
  if (!process.env.GOOGLE_CREDENTIALS_JSON) {
    throw new Error('GOOGLE_CREDENTIALS_JSON no está definida en las variables de entorno');
  }
  
  const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS_JSON);
  
  auth = new google.auth.GoogleAuth({
    credentials: credentials,
    scopes: SCOPES,
  });
  
  console.log('Credenciales de Google cargadas correctamente');
} catch (error) {
  console.error('Error al cargar credenciales de Google:', error.message);
}

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

    if (auth) {
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
    } else {
      console.warn('No se pudo guardar en Google Sheets: credenciales no disponibles');
    }
    
    res.status(201).json(nuevaSolicitud);
  }
};

module.exports = solicitudController;