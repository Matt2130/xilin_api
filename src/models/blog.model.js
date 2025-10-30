const db = require('../config/database');

const Blog = {
  async getAllPaginated(page = 1, limit = 3) {
    const offset = (page - 1) * limit;

    const text = `
      SELECT
        b.id,
        b.titulo,
        SUBSTRING(b.contenido FROM 1 FOR 250) as contenido_corto,
        b.banner_url,
        b.fecha_creacion,
        a.nombre as autor_nombre,
        COALESCE(a.foto_url, '/assets/img/default-author.png') as autor_foto_url
      FROM "Blog" b
      LEFT JOIN "Autor" a ON b.autor_id = a.id
      ORDER BY b.fecha_creacion DESC
      LIMIT $1 OFFSET $2;
    `;
    
    const totalQuery = 'SELECT COUNT(*) FROM "Blog"';
    
    const [postsResult, totalResult] = await Promise.all([
        db.query(text, [limit, offset]),
        db.query(totalQuery)
    ]);

    const totalPosts = parseInt(totalResult.rows[0].count, 10);
    const totalPages = Math.ceil(totalPosts / limit);

    return {
      posts: postsResult.rows,
      totalPages,
      currentPage: page,
    };
  },
  async getById(id) {
    const text = `
      SELECT
        b.id,
        b.titulo,
        b.contenido,
        b.banner_url,
        b.fecha_creacion,
        a.nombre as autor_nombre,
        COALESCE(a.foto_url, '/assets/img/default-author.png') as autor_foto_url,
        a.puesto as autor_puesto
      FROM "Blog" b
      LEFT JOIN "Autor" a ON b.autor_id = a.id
      WHERE b.id = $1;
    `;
    const { rows } = await db.query(text, [id]);
    return rows[0];
  }
};

module.exports = Blog;