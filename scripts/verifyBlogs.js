const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Blog = require('../models/Blog');

dotenv.config();

const verifyBlogs = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        const blogs = await Blog.find({});
        console.log('\nTotal blogs:', blogs.length);
        
        if (blogs.length === 0) {
            console.log('No blogs found in database');
        } else {
            console.log('\nBlogs in database:');
            blogs.forEach(blog => {
                console.log(`\nTitle: ${blog.title}`);
                console.log(`Slug: ${blog.slug}`);
                console.log(`Category: ${blog.category}`);
                console.log(`Author: ${blog.author}`);
                console.log(`Published: ${blog.isPublished}`);
                console.log('---');
            });
        }
    } catch (error) {
        console.error('Error:', error);
    } finally {
        await mongoose.connection.close();
    }
};

verifyBlogs(); 