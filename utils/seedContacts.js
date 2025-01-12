const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Contact = require('../models/Contact');
const connectDB = require('../config/db');

// Load env vars
dotenv.config();

const sampleContacts = [
    {
        firstName: "John",
        lastName: "Smith",
        email: "john.smith@example.com",
        phone: "+61 432 123 456",
        address: {
            street: "42 Park Avenue",
            city: "Sydney",
            state: "NSW",
            postcode: "2000",
            country: "Australia"
        },
        status: "active",
        source: "website",
        tags: ["VIP", "Regular Customer"],
        notes: "Prefers morning appointments. Has a dog.",
        lastActivity: new Date("2024-03-15")
    },
    {
        firstName: "Sarah",
        lastName: "Johnson",
        email: "sarah.j@example.com",
        phone: "+61 432 789 012",
        address: {
            street: "15 Beach Road",
            city: "Bondi",
            state: "NSW",
            postcode: "2026",
            country: "Australia"
        },
        status: "active",
        source: "referral",
        tags: ["Premium", "Weekly Service"],
        notes: "Allergic to strong chemicals. Prefers eco-friendly products.",
        lastActivity: new Date("2024-03-18")
    },
    {
        firstName: "Michael",
        lastName: "Wong",
        email: "m.wong@example.com",
        phone: "+61 433 345 678",
        address: {
            street: "78 Queen Street",
            city: "Brisbane",
            state: "QLD",
            postcode: "4000",
            country: "Australia"
        },
        status: "inactive",
        source: "social_media",
        tags: ["Commercial", "Monthly Service"],
        notes: "Office cleaning client. After hours access required.",
        lastActivity: new Date("2024-02-28")
    },
    {
        firstName: "Emma",
        lastName: "Taylor",
        email: "emma.t@example.com",
        phone: "+61 434 567 890",
        address: {
            street: "23 Collins Street",
            city: "Melbourne",
            state: "VIC",
            postcode: "3000",
            country: "Australia"
        },
        status: "pending",
        source: "website",
        tags: ["New Client"],
        notes: "Requested quote for deep cleaning service.",
        lastActivity: new Date("2024-03-20")
    },
    {
        firstName: "David",
        lastName: "Brown",
        email: "david.brown@example.com",
        phone: "+61 435 901 234",
        address: {
            street: "55 Adelaide Street",
            city: "Perth",
            state: "WA",
            postcode: "6000",
            country: "Australia"
        },
        status: "active",
        source: "referral",
        tags: ["Residential", "Fortnightly"],
        notes: "Has security system. Code provided.",
        lastActivity: new Date("2024-03-19")
    }
];

const seedContacts = async () => {
    try {
        // Connect to database
        await connectDB();

        // Clear existing contacts
        await Contact.deleteMany({});
        console.log('Existing contacts cleared');

        // Insert new contacts
        const createdContacts = await Contact.insertMany(sampleContacts);
        console.log(`Inserted ${createdContacts.length} contacts`);

        // Disconnect from database
        await mongoose.disconnect();
        console.log('Database connection closed');

        process.exit(0);
    } catch (error) {
        console.error('Error seeding contacts:', error);
        process.exit(1);
    }
};

// Run the seed function
seedContacts(); 