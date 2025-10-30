const db = require('../config/database');

const Categoria = {
  async getAllWithImage() {
    const text = `
      SELECT DISTINCT ON (c.id)
          c.id,
          c.nombre,
          p.imagen_url
      FROM "Categoria" c
      LEFT JOIN "Producto" p ON c.id = p.categoria_id
      ORDER BY c.id, p.id;
    `;
    const { rows } = await db.query(text);
    return rows;
  }
};

module.exports = Categoria;