const Categoria = require('../models/categoria.model');

const categoriaController = {
  async getAllCategorias(req, res) {
    try {
      const categorias = await Categoria.getAllWithImage();
      res.status(200).json(categorias);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener las categorías" });
    }
  }
};

module.exports = categoriaController;