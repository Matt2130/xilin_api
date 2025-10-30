const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blog.controller');

router.get('/blogs', blogController.getAllPosts);
router.get('/blogs/:id', blogController.getPostById);

module.exports = router;