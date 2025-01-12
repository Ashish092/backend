const Blog = require('../models/Blog');
const slugify = require('slugify');

// Get all blogs
const getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({ isPublished: true })
            .sort({ createdAt: -1 });
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get single blog by slug
const getBlogBySlug = async (req, res) => {
    try {
        const blog = await Blog.findOne({ 
            slug: req.params.slug,
            isPublished: true 
        });
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        res.json(blog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create new blog
const createBlog = async (req, res) => {
    try {
        const { title, content, excerpt, coverImage, category, author, isPublished } = req.body;
        
        // Basic validation
        if (!title || !content || !excerpt || !coverImage || !category || !author) {
            return res.status(400).json({ 
                message: 'Please provide all required fields' 
            });
        }

        // Create blog - slug will be generated in the pre-save hook
        const blog = await Blog.create({
            title,
            content,
            excerpt,
            coverImage,
            category,
            author,
            isPublished
        });

        res.status(201).json({
            success: true,
            data: blog,
            message: 'Blog created successfully'
        });
    } catch (error) {
        if (error.code === 11000) { // Duplicate key error
            res.status(400).json({ 
                message: 'A blog with this title already exists' 
            });
        } else {
            res.status(400).json({ 
                message: error.message || 'Failed to create blog' 
            });
        }
    }
};

// Update blog
const updateBlog = async (req, res) => {
    try {
        const { title } = req.body;
        let updateData = { ...req.body };

        // If title is being updated, generate new slug
        if (title) {
            updateData.slug = slugify(title, {
                lower: true,
                strict: true,
                trim: true
            });

            // Check if new slug already exists (excluding current blog)
            const existingBlog = await Blog.findOne({ 
                slug: updateData.slug,
                _id: { $ne: req.params.id }
            });
            
            if (existingBlog) {
                const uniqueSuffix = Math.random().toString(36).substring(2, 7);
                updateData.slug = `${updateData.slug}-${uniqueSuffix}`;
            }
        }

        const blog = await Blog.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true, runValidators: true }
        );

        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        res.json(blog);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete blog
const deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findByIdAndDelete(req.params.id);
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        res.json({ message: 'Blog deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Add a new function to check slug availability
const checkSlugAvailability = async (req, res) => {
    try {
        const { title } = req.query;
        if (!title) {
            return res.status(400).json({ message: 'Title is required' });
        }

        const slug = slugify(title, {
            lower: true,
            strict: true,
            trim: true
        });

        const existingBlog = await Blog.findOne({ slug });
        
        res.json({
            available: !existingBlog,
            suggestedSlug: existingBlog ? `${slug}-${Date.now().toString(36)}` : slug
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add search functionality
const searchBlogs = async (req, res) => {
    try {
        const { query, category } = req.query;
        let searchQuery = { isPublished: true };

        if (query) {
            searchQuery.$text = { $search: query };
        }

        if (category && category !== 'All') {
            searchQuery.category = category;
        }

        const blogs = await Blog.find(searchQuery)
            .sort({ score: { $meta: 'textScore' } })
            .select('-content')
            .limit(10);

        res.json(blogs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getBlogs,
    getBlogBySlug,
    createBlog,
    updateBlog,
    deleteBlog,
    checkSlugAvailability,
    searchBlogs
}; 