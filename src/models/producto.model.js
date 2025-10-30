const db = require('../config/database');

const Producto = {
    async getAll() {
        const { rows } = await db.query('SELECT * FROM "Producto"');
        return rows;
    },
    async getById(id) {
    const text = `
      SELECT
        p.id,
        p.nombre,
        p.modelo,
        p.caracteristicas,
        p.dimensiones_url, -- Asegúrate que este sea el nombre correcto
        p.imagen_url,
        p.manual_url,
        p.ficha_tecnica_url,
        p.fecha_creacion,
        p.video_url,
        c.nombre as categoria_nombre -- Obtenemos el nombre de la categoría
        -- Añade aquí cualquier otro campo que necesites, como 'video_id' si lo tienes
      FROM "Producto" p
      LEFT JOIN "Categoria" c ON p.categoria_id = c.id
      WHERE p.id = $1;
    `;
    const { rows } = await db.query(text, [id]);
    return rows[0];
    },
    async getByCategoryId(categoriaId) {
    const text = `
      SELECT
        p.id, p.nombre, p.modelo, p.imagen_url, p.ficha_tecnica_url, c.nombre as categoria_nombre
      FROM "Producto" p
      LEFT JOIN "Categoria" c ON p.categoria_id = c.id
      WHERE p.categoria_id = $1
      ORDER BY p.nombre;
    `;
    const { rows } = await db.query(text, [categoriaId]);
    return rows;
    },
    async getFeatured() {
        const { rows } = await db.query('SELECT id, nombre, modelo, imagen_url, ficha_tecnica_url FROM "Producto" ORDER BY fecha_creacion DESC LIMIT 5');
        return rows;
    },
    async create(productoData) {
        const { nombre, modelo, categoria_id, caracteristicas, dimensiones_url, imagen_url, manual_url, ficha_tecnica_url } = productoData;

        const text = `
            INSERT INTO "Producto"(nombre, modelo, categoria_id, caracteristicas, dimensiones_url, imagen_url, manual_url, ficha_tecnica_url)
            VALUES($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *
        `;
        
        const values = [nombre, modelo, categoria_id, caracteristicas, dimensiones_url, imagen_url, manual_url, ficha_tecnica_url];

        const { rows } = await db.query(text, values);
        return rows[0];
    }
};

module.exports = Producto;