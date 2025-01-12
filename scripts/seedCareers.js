const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Career = require('../models/Career');

dotenv.config();

const sampleCareers = [
    {
        title: "Professional Cleaner",
        location: "Melbourne CBD",
        type: "Full-time",
        description: "Join our team of professional cleaners providing top-quality cleaning services to commercial and residential clients.",
        requirements: [
            "Previous cleaning experience (minimum 1 year)",
            "Strong attention to detail",
            "Excellent communication skills",
            "Reliable and punctual",
            "Must have own transport"
        ],
        responsibilities: [
            "Perform general cleaning duties",
            "Follow cleaning schedules and checklists",
            "Maintain cleaning equipment",
            "Report any maintenance issues",
            "Ensure customer satisfaction"
        ],
        benefits: [
            "Competitive salary",
            "Flexible working hours",
            "Training provided",
            "Career advancement opportunities"
        ],
        salary: "$25-$30 per hour",
        isActive: true
    },
    {
        title: "Cleaning Team Leader",
        location: "South Melbourne",
        type: "Full-time",
        description: "We're seeking an experienced Team Leader to supervise cleaning operations and ensure high-quality service delivery.",
        requirements: [
            "3+ years cleaning experience",
            "Previous leadership experience",
            "Strong organizational skills",
            "Valid driver's license",
            "Excellent problem-solving abilities"
        ],
        responsibilities: [
            "Supervise cleaning team",
            "Create and manage cleaning schedules",
            "Train new team members",
            "Handle customer inquiries",
            "Maintain inventory of cleaning supplies"
        ],
        benefits: [
            "Above-award salary",
            "Company vehicle",
            "Health insurance",
            "Professional development"
        ],
        salary: "$55,000-$65,000 per annum",
        isActive: true
    }
];

const seedCareers = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        await Career.deleteMany({});
        console.log('Cleared existing careers');

        await Career.insertMany(sampleCareers);
        console.log('Sample careers added successfully');

        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

seedCareers(); 