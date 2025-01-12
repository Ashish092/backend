const mongoose = require('mongoose');
const slugify = require('slugify');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a title'],
        trim: true,
        maxlength: [100, 'Title cannot be more than 100 characters']
    },
    slug: {
        type: String,
        unique: true,
        lowercase: true,
        index: true
    },
    content: {
        type: String,
        required: [true, 'Please add content'],
        minlength: [50, 'Content must be at least 50 characters']
    },
    excerpt: {
        type: String,
        required: [true, 'Please add an excerpt'],
        maxlength: [200, 'Excerpt cannot be more than 200 characters']
    },
    coverImage: {
        type: String,
        required: [true, 'Please add a cover image']
    },
    author: {
        type: String,
        required: [true, 'Please add an author'],
        trim: true
    },
    category: {
        type: String,
        required: [true, 'Please add a category'],
        enum: {
            values: ['Cleaning Tips', 'Home Maintenance', 'Commercial Cleaning', 'Green Cleaning', 'Other'],
            message: '{VALUE} is not a valid category'
        }
    },
    isPublished: {
        type: Boolean,
        default: true
    },
    readTime: {
        type: Number,
        default: function() {
            const wordsPerMinute = 200;
            const wordCount = this.content.split(/\s+/).length;
            return Math.ceil(wordCount / wordsPerMinute);
        }
    }
}, {
    timestamps: true
});

// Create slug from title before saving
blogSchema.pre('save', async function(next) {
    if (!this.isModified('title')) {
        next();
        return;
    }

    try {
        let slug = slugify(this.title, {
            lower: true,
            strict: true,
            trim: true,
            remove: /[*+~.()'"!:@]/g
        });

        // Check for existing slug
        const slugRegEx = new RegExp(`^${slug}(-[0-9]*)?$`, 'i');
        const blogsWithSlug = await this.constructor.find({ slug: slugRegEx });

        if (blogsWithSlug.length > 0) {
            // If other documents with similar slugs exist, add a suffix
            slug = `${slug}-${blogsWithSlug.length + 1}`;
        }

        this.slug = slug;
        next();
    } catch (error) {
        next(error);
    }
});

// Virtual field for formatted date
blogSchema.virtual('formattedDate').get(function() {
    return new Date(this.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
});

// Add text index for search
blogSchema.index({
    title: 'text',
    content: 'text',
    excerpt: 'text'
});

module.exports = mongoose.model('Blog', blogSchema);

console.log('Blog model registered:', mongoose.modelNames().includes('Blog')); 