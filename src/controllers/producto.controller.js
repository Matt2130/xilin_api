const Producto = require('../models/producto.model');
const { validationResult } = require('express-validator');

const productoController = {
    async getAllProductos(req, res) {
        try {
        const { categoria_id } = req.query; 

        let productos;
        if (categoria_id) {
            productos = await Producto.getByCategoryId(categoria_id);
        } else {
            
            productos = await Producto.getAll();
        }
        res.status(200).json(productos);
        } catch (error) {
        console.error(error); 
        res.status(500).json({ message: "Error al obtener los productos" });
        }
    },
    async getProductoById(req, res) {
        try {
            const { id } = req.params;
            const producto = await Producto.getById(id);
    
            if (!producto) {
                return res.status(404).json({ message: "Producto no encontrado" });
            }
            res.status(200).json(producto);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error al obtener el producto" });
        }
    },
    async getFeaturedProductos(req, res) {
        try {
            const productos = await Producto.getFeatured();
            res.status(200).json(productos);
        } catch (error) {
            res.status(500).json({ message: "Error al obtener productos destacados" });
        }
    },
    async createProducto(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const nuevoProducto = await Producto.create(req.body);
            res.status(201).json(nuevoProducto);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error al crear el producto" });
        }
    }
};

module.exports = productoController;