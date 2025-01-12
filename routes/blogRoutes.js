const express = require('express');
const router = express.Router();
const { 
    getBlogs, 
    getBlogBySlug, 
    createBlog, 
    updateBlog, 
    deleteBlog, 
    checkSlugAvailability, 
    searchBlogs 
} = require('../controllers/blogController');
const { protect } = require('../middleware/authMiddleware');

// Public routes
router.get('/', getBlogs);
router.get('/:slug', getBlogBySlug);

// Protected routes
router.post('/', protect, createBlog);
router.put('/:id', protect, updateBlog);
router.delete('/:id', protect, deleteBlog);

// Add these new routes
router.get('/check-slug', checkSlugAvailability);
router.get('/search', searchBlogs);

module.exports = router; 