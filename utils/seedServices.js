const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Service = require('../models/Service');
const connectDB = require('../config/db');

// Load env vars
dotenv.config();

// Services data
const services = [
    {
        id: "move-in-move-out-cleaning",
        title: "Move In/Move Out Cleaning",
        description: "Professional end of lease cleaning service to ensure you get your bond back.",
        image: "/images/Movein.png",
        price: "From $359",
        isPopular: true,
        features: [
            { title: "Deep Cleaning", description: "Comprehensive cleaning of all rooms" },
            { title: "Kitchen Cleaning", description: "Kitchen deep cleaning including oven and cabinets" },
            { title: "Bathroom Cleaning", description: "Bathroom sanitization and descaling" },
            { title: "Window Cleaning", description: "Window cleaning (interior)" }
        ],
        longDescription: "Our comprehensive end of lease cleaning service ensures you get your bond back. We handle everything from deep cleaning carpets to scrubbing kitchens and bathrooms."
    },
    {
        id: "carpet-cleaning",
        title: "Carpet Cleaning",
        description: "Professional carpet cleaning service using advanced steam cleaning technology.",
        image: "/images/carpet-cleaning.png",
        price: "From $35 - $55 per room",
        features: [
            { title: "Steam Cleaning", description: "Deep steam cleaning for all carpet types" },
            { title: "Stain Removal", description: "Professional stain removal treatment" },
            { title: "Deodorizing", description: "Complete deodorizing treatment" },
            { title: "Pet Stains", description: "Pet stain and odor removal" }
        ],
        longDescription: "Our carpet cleaning service uses deep-cleaning techniques to remove stains, dirt, and allergens, leaving your carpets looking fresh and new."
    },
    {
        id: "after-renovation-cleaning",
        title: "After Renovation Cleaning",
        description: "Comprehensive post-renovation cleaning service.",
        image: "/images/after-renovation-cleaning.jpg",
        price: "From $45 per hour",
        features: [
            { title: "Dust Removal", description: "Complete dust and debris removal" },
            { title: "Surface Cleaning", description: "Deep cleaning of all surfaces" },
            { title: "Paint Cleanup", description: "Paint spot cleaning and removal" },
            { title: "Final Inspection", description: "Thorough final inspection" }
        ],
        longDescription: "Comprehensive post-renovation cleaning service to remove all construction dust, debris, and make your space ready for use."
    },
    {
        id: "commercial-cleaning",
        title: "Commercial Cleaning",
        description: "Professional cleaning services for offices and commercial spaces.",
        image: "/images/commercial-cleaning.jpg",
        price: "Custom Quote",
        isPopular: true,
        features: [
            { title: "Office Cleaning", description: "Complete office space cleaning" },
            { title: "Floor Care", description: "Professional floor maintenance" },
            { title: "Sanitization", description: "Complete sanitization service" },
            { title: "Window Cleaning", description: "Professional window cleaning" }
        ],
        longDescription: "Professional cleaning services for offices, retail spaces, and commercial properties. We offer customized cleaning solutions to meet your business needs."
    },
    {
        id: "general-house-cleaning",
        title: "General House Cleaning",
        description: "Regular home cleaning service for a healthy living environment.",
        image: "/images/general-cleaning.jpg",
        price: "From $35 per hour",
        features: [
            { title: "Regular Cleaning", description: "Scheduled cleaning service" },
            { title: "Deep Cleaning", description: "Thorough deep cleaning" },
            { title: "Kitchen & Bath", description: "Kitchen and bathroom cleaning" },
            { title: "Dusting", description: "Complete dusting service" }
        ],
        longDescription: "Regular home cleaning service to maintain a clean and healthy living environment."
    },
    {
        id: "ndis-cleaning",
        title: "NDIS Cleaning",
        description: "Specialized cleaning services for NDIS participants.",
        image: "/images/ndis-cleaning.jpg",
        price: "$35 - $50 per hour",
        features: [
            { title: "Customized Service", description: "Personalized cleaning plans" },
            { title: "Regular Service", description: "Scheduled cleaning visits" },
            { title: "Special Care", description: "Special needs accommodation" },
            { title: "NDIS Compliant", description: "Fully NDIS registered service" }
        ],
        longDescription: "Specialized cleaning services for NDIS participants, ensuring a safe and hygienic living environment."
    },
    {
        id: "end-of-lease",
        title: "End of Lease Cleaning",
        description: "Professional end of lease cleaning service.",
        image: "/images/end-of-lease-cleaning.jpg",
        price: "From $359",
        features: [
            { title: "Bond Back", description: "Bond back guarantee" },
            { title: "Deep Clean", description: "Complete property deep clean" },
            { title: "Checklist", description: "Real estate approved checklist" },
            { title: "Inspection", description: "Pre-inspection service" }
        ],
        longDescription: "Professional end of lease cleaning service to ensure you get your bond back."
    },
    {
        id: "tile-and-floor-cleaning",
        title: "Tile and Floor Cleaning",
        description: "Professional floor cleaning for all types of flooring.",
        image: "/images/floor-cleaning.png",
        price: "$40 - $55 per hour",
        features: [
            { title: "All Floors", description: "All floor types cleaned" },
            { title: "Grout Cleaning", description: "Deep grout cleaning" },
            { title: "Sealing", description: "Professional sealing service" },
            { title: "Polishing", description: "Floor polishing service" }
        ],
        longDescription: "Professional floor cleaning service for all types of flooring, including tiles, hardwood, vinyl, and natural stone."
    },
    {
        id: "upholstery-cleaning",
        title: "Upholstery Cleaning",
        description: "Professional upholstery cleaning service.",
        image: "/images/upholstery-cleaning.png",
        price: "From $60 per seat",
        features: [
            { title: "Deep Clean", description: "Deep fabric cleaning" },
            { title: "Stain Removal", description: "Professional stain removal" },
            { title: "Protection", description: "Fabric protection service" },
            { title: "Deodorizing", description: "Complete deodorizing" }
        ],
        longDescription: "Professional upholstery cleaning service to refresh and extend the life of your furniture."
    },
    {
        id: "window-cleaning",
        title: "Window Cleaning",
        description: "Professional window cleaning service.",
        image: "/images/windows-cleaning.png",
        price: "From $5 - $10 per window",
        features: [
            { title: "Interior/Exterior", description: "Complete window cleaning" },
            { title: "Track Cleaning", description: "Window track cleaning" },
            { title: "Screen Cleaning", description: "Window screen cleaning" },
            { title: "High Windows", description: "High window cleaning" }
        ],
        longDescription: "Professional window cleaning service for crystal clear views and enhanced curb appeal."
    }
];

// Seed function
const seedServices = async () => {
    try {
        // Connect to database
        await connectDB();

        // Drop the collection to remove all indexes
        try {
            await mongoose.connection.collection('services').drop();
            console.log('Collection dropped successfully');
        } catch (error) {
            if (error.code !== 26) { // Error code 26 means collection doesn't exist
                console.log('Error dropping collection:', error);
            }
        }

        // Create the collection with proper indexes
        await Service.createCollection();
        console.log('Collection created successfully');

        // Create indexes
        await Service.collection.createIndex({ id: 1 }, { unique: true });
        console.log('Indexes created successfully');

        // Insert new services
        const createdServices = await Service.insertMany(services);
        console.log(`Inserted ${createdServices.length} services`);

        // Disconnect from database
        await mongoose.disconnect();
        console.log('Database connection closed');

        process.exit(0);
    } catch (error) {
        console.error('Error seeding services:', error);
        process.exit(1);
    }
};

// Run the seed function
seedServices(); 