const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Blog = require('../models/Blog');

dotenv.config();

const sampleBlogs = [
    {
        title: "Essential Spring Cleaning Tips for a Fresh Home",
        content: `Spring is the perfect time to give your home a thorough cleaning and fresh start. Here are some essential tips to make your spring cleaning more effective:

1. Start with Decluttering
Before deep cleaning, remove unnecessary items and organize your space. This makes the cleaning process more efficient and helps maintain a tidy home.

2. Top-to-Bottom Approach
Always clean from ceiling to floor. Start with ceiling fans, light fixtures, and upper surfaces, then work your way down to baseboards and floors.

3. Natural Cleaning Solutions
Use eco-friendly cleaning products or make your own using vinegar, baking soda, and lemon juice. These natural alternatives are safer for your family and the environment.

4. Don't Forget Often Overlooked Areas
Pay special attention to often neglected areas like window tracks, door frames, and behind appliances.

5. Maintain Regular Cleaning Schedule
After deep cleaning, establish a regular cleaning routine to maintain your home's freshness throughout the year.`,
        excerpt: "Discover effective spring cleaning strategies to refresh your home and create a healthier living environment.",
        coverImage: "https://images.unsplash.com/photo-1581578731548-c64695cc6952",
        category: "Cleaning Tips",
        author: "Sarah Johnson",
        isPublished: true,
        slug: "essential-spring-cleaning-tips"
    },
    {
        title: "Professional Office Cleaning: A Complete Guide",
        content: `Maintaining a clean and professional office environment is crucial for productivity and employee well-being. Here's your comprehensive guide to office cleaning:

1. Daily Cleaning Tasks
- Empty all trash bins and replace liners
- Vacuum carpets and mop hard floors
- Clean and sanitize bathrooms
- Wipe down common surfaces and touch points

2. Weekly Cleaning Tasks
- Deep clean bathrooms
- Dust all surfaces including window sills
- Clean interior windows and mirrors
- Sanitize kitchen areas

3. Monthly Cleaning Tasks
- Deep clean carpets and upholstery
- Clean exterior windows
- Dust high areas and vents
- Polish wooden furniture

4. Best Practices
- Use commercial-grade cleaning products
- Focus on high-traffic areas
- Maintain a regular cleaning schedule
- Document all cleaning activities`,
        excerpt: "Learn the essential steps and best practices for maintaining a clean and healthy office environment.",
        coverImage: "https://images.unsplash.com/photo-1497366216548-37526070297c",
        category: "Commercial Cleaning",
        author: "Michael Chen",
        isPublished: true,
        slug: "professional-office-cleaning-guide"
    }
];

const seedBlogs = async () => {
    try {
        // Connect to MongoDB
        console.log('Connecting to MongoDB...');
        console.log('URI:', process.env.MONGODB_URI); // Log the URI (remove in production)
        
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB successfully');

        // Clear existing blogs
        console.log('Clearing existing blogs...');
        const deleteResult = await Blog.deleteMany({});
        console.log(`Cleared ${deleteResult.deletedCount} existing blogs`);

        // Insert new blogs
        console.log('Inserting sample blogs...');
        const insertResult = await Blog.insertMany(sampleBlogs);
        console.log(`Inserted ${insertResult.length} blogs successfully`);

        // Verify the insertion
        const count = await Blog.countDocuments();
        console.log(`Total blogs in database: ${count}`);

        // List all blogs (for verification)
        const blogs = await Blog.find({});
        console.log('\nInserted blogs:');
        blogs.forEach(blog => {
            console.log(`- ${blog.title} (${blog.slug})`);
        });

        console.log('\nSeeding completed successfully');
        process.exit(0);
    } catch (error) {
        console.error('\nError while seeding blogs:');
        console.error('Error details:', error);
        process.exit(1);
    } finally {
        // Close the connection
        if (mongoose.connection.readyState === 1) {
            await mongoose.connection.close();
            console.log('Database connection closed');
        }
    }
};

// Run the seed function
console.log('Starting blog seeding process...');
seedBlogs(); 