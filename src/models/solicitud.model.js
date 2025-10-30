const db = require('../config/database');

const Solicitud = {
  async create(solicitudData) {
    const { 
      nombre_cliente, 
      email_cliente, 
      telefono_cliente, 
      producto_cotizado, 
      nombre_empresa, 
      direccion_empresa, 
      mensaje 
    } = solicitudData;

    const text = `
      INSERT INTO "Solicitud"(nombre_cliente, email_cliente, telefono_cliente, producto_cotizado, nombre_empresa, direccion_empresa, mensaje)
      VALUES($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `;
    
    const values = [nombre_cliente, email_cliente, telefono_cliente, producto_cotizado, nombre_empresa, direccion_empresa, mensaje];
    
    const { rows } = await db.query(text, values);
    return rows[0];
  }
};

module.exports = Solicitud;