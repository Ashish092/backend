const mongoose = require('mongoose');
const dotenv = require('dotenv');
const AdminService = require('../models/AdminService');
const connectDB = require('../config/db');

dotenv.config();

const sampleServices = [
    {
        name: "Regular House Cleaning",
        description: "Standard cleaning service for homes",
        duration: 2,
        basePrice: 80,
        priceType: "hourly",
        category: "regular",
        extras: [
            {
                name: "Inside Fridge",
                price: 30,
                description: "Deep clean inside refrigerator"
            },
            {
                name: "Inside Oven",
                price: 40,
                description: "Deep clean inside oven"
            }
        ]
    },
    {
        name: "Deep Cleaning",
        description: "Thorough cleaning of all areas",
        duration: 4,
        basePrice: 200,
        priceType: "fixed",
        category: "deep",
        extras: [
            {
                name: "Walls Cleaning",
                price: 50,
                description: "Clean all walls and remove marks"
            }
        ]
    },
    {
        name: "End of Lease Clean",
        description: "Complete cleaning for end of tenancy",
        duration: 6,
        basePrice: 350,
        priceType: "fixed",
        category: "end_of_lease",
        extras: [
            {
                name: "Carpet Steam Clean",
                price: 100,
                description: "Professional carpet cleaning"
            }
        ]
    }
];

const seedAdminServices = async () => {
    try {
        await connectDB();
        
        await AdminService.deleteMany({});
        console.log('Existing admin services cleared');

        const createdServices = await AdminService.insertMany(sampleServices);
        console.log(`Created ${createdServices.length} admin services`);

        console.log('Database seeding completed!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedAdminServices(); 