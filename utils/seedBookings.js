const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Booking = require('../models/Booking');
const connectDB = require('../config/db');

dotenv.config();

const sampleBookings = [
    {
        customer: {
            name: "John Smith",
            email: "john@example.com",
            phone: "0412 345 678"
        },
        address: {
            street: "123 Main Street",
            suburb: "Bondi",
            state: "NSW",
            postcode: "2026"
        },
        schedule: {
            date: new Date("2024-03-20"),
            time: "09:00"
        },
        service: {
            type: "regular",
            hours: 3,
            amount: 120,
            extras: ["inside_fridge"]
        },
        status: "confirmed",
        tags: ["recurring", "pets"],
        notes: "Has a friendly dog"
    },
    {
        customer: {
            name: "Sarah Wilson",
            email: "sarah@example.com",
            phone: "0423 456 789"
        },
        address: {
            street: "45 Beach Road",
            suburb: "Manly",
            state: "NSW",
            postcode: "2095"
        },
        schedule: {
            date: new Date("2024-03-21"),
            time: "13:00"
        },
        service: {
            type: "deep",
            hours: 4,
            amount: 180,
            extras: ["inside_cabinets", "balcony"]
        },
        status: "pending",
        tags: ["new_customer"],
        notes: "Key under mat"
    },
    {
        customer: {
            name: "Michael Johnson",
            email: "michael@example.com",
            phone: "0434 567 890"
        },
        address: {
            street: "78 Park Avenue",
            suburb: "Chatswood",
            state: "NSW",
            postcode: "2067"
        },
        schedule: {
            date: new Date("2024-03-22"),
            time: "10:30"
        },
        service: {
            type: "end_of_lease",
            hours: 6,
            amount: 280,
            extras: ["windows", "carpet_cleaning"]
        },
        status: "confirmed",
        tags: ["end_of_lease", "carpet"],
        notes: "Carpet needs special attention"
    },
    {
        customer: {
            name: "Emma Davis",
            email: "emma@example.com",
            phone: "0445 678 901"
        },
        address: {
            street: "15 Ocean View",
            suburb: "Coogee",
            state: "NSW",
            postcode: "2034"
        },
        schedule: {
            date: new Date("2024-03-23"),
            time: "14:00"
        },
        service: {
            type: "regular",
            hours: 2,
            amount: 90,
            extras: []
        },
        status: "pending",
        tags: ["new_customer"],
        notes: "Apartment on level 3"
    }
];

const seedBookings = async () => {
    try {
        await connectDB();
        
        // Clear existing bookings
        await Booking.deleteMany({});
        console.log('Existing bookings cleared');

        // Insert new bookings one by one to ensure proper booking number generation
        for (const booking of sampleBookings) {
            await new Booking(booking).save();
        }
        
        console.log(`Inserted ${sampleBookings.length} bookings`);
        console.log('Database seeding completed!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedBookings(); 