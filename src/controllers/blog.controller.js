const Blog = require('../models/blog.model');

const blogController = {
  async getAllPosts(req, res) {
    try {
      const page = parseInt(req.query.page, 10) || 1;
      const limit = 3;
      
      const data = await Blog.getAllPaginated(page, limit);
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener los posts del blog" });
    }
  },
  async getPostById(req, res) {
    try {
      const { id } = req.params;
      const post = await Blog.getById(id);

      if (!post) {
        return res.status(404).json({ message: "Post no encontrado" });
      }
      
      res.status(200).json(post);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener el post del blog" });
    }
  }
};

module.exports = blogController;