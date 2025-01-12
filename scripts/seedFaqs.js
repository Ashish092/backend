const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Faq = require('../models/Faq');

dotenv.config();

const sampleFaqs = [
    {
        question: "What carpet cleaning services do you offer in Melbourne?",
        answer: "Cleaning Professionals provides comprehensive carpet cleaning solutions including stain removal, deep carpet cleaning, and regular maintenance for both residential and commercial properties. Our team uses eco-friendly and effective cleaning methods tailored to preserve the quality of your carpets.",
        category: "Services",
        order: 1
    },
    {
        question: "What types of office cleaning services do you offer?",
        answer: "Our office cleaning services include daily janitorial duties, deep cleaning sessions, carpet and floor care, and customizable cleaning plans to suit the specific needs of your office environment, ensuring a clean, productive workspace.",
        category: "Services",
        order: 2
    },
    // Add more FAQs as needed
];

mongoose.connect(process.env.MONGODB_URI)
    .then(async () => {
        console.log('Connected to MongoDB');
        await Faq.deleteMany({}); // Clear existing FAQs
        await Faq.insertMany(sampleFaqs);
        console.log('Sample FAQs added successfully');
        process.exit();
    })
    .catch((error) => {
        console.error('Error:', error);
        process.exit(1);
    }); 