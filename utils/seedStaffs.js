const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Staff = require('../models/Staff');
const connectDB = require('../config/db');

// Load env vars
dotenv.config();

const sampleStaffs = [
    {
        firstName: "Ashish",
        lastName: "Dhakal",
        email: "ashish@example.com",
        phone: "+61 432 123 456",
        title: "CEO",
        department: ["Marketing", "Management", "Service"],
        status: "active",
        kioskCode: "8351",
        employmentStartDate: "2024-08-18",
        address: {
            street: "42 Park Avenue",
            city: "Sydney",
            state: "NSW",
            postcode: "2000"
        },
        lastLogin: "2024-01-10"
    },
    {
        firstName: "Adarsha",
        lastName: "Dhakal",
        email: "adarsha@example.com",
        phone: "+61 432 789 012",
        title: "Cleaner",
        department: ["Service", "Management"],
        status: "active",
        kioskCode: "7169",
        employmentStartDate: "2024-07-01",
        address: {
            street: "15 Beach Road",
            city: "Bondi",
            state: "NSW",
            postcode: "2026"
        },
        lastLogin: "2024-01-10"
    },
    {
        firstName: "Dipesh",
        lastName: "Panday",
        email: "dipesh@example.com",
        phone: "+61 433 345 678",
        title: "Cleaner",
        department: ["Service"],
        status: "active",
        kioskCode: "7514",
        employmentStartDate: "2024-08-18",
        address: {
            street: "78 Queen Street",
            city: "Brisbane",
            state: "QLD",
            postcode: "4000"
        },
        lastLogin: "2024-01-09"
    },
    {
        firstName: "Nischal",
        lastName: "Koirala",
        email: "nischal@example.com",
        phone: "+61 434 567 890",
        title: "Management",
        department: ["Management", "Marketing"],
        status: "active",
        kioskCode: "7324",
        employmentStartDate: "2024-08-18",
        address: {
            street: "23 Collins Street",
            city: "Melbourne",
            state: "VIC",
            postcode: "3000"
        },
        lastLogin: "2024-01-10"
    }
];

const seedStaffs = async () => {
    try {
        // Connect to database
        await connectDB();

        // Clear existing staffs
        await Staff.deleteMany({});
        console.log('Existing staffs cleared');

        // Insert new staffs
        const createdStaffs = await Staff.insertMany(sampleStaffs);
        console.log(`Inserted ${createdStaffs.length} staffs`);

        console.log('Database seeding completed!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

// Run the seed function
seedStaffs(); 