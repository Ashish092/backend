const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Invoice = require('../models/Invoice');
const Booking = require('../models/Booking');
const connectDB = require('../config/db');

dotenv.config();

const seedInvoices = async () => {
    try {
        await connectDB();
        
        // Clear existing invoices
        await Invoice.deleteMany({});
        console.log('Existing invoices cleared');

        // Get some bookings to reference
        const bookings = await Booking.find().limit(4);
        
        for (const booking of bookings) {
            const invoice = new Invoice({
                bookingId: booking._id,
                customer: {
                    name: booking.customer.name,
                    email: booking.customer.email,
                    phone: booking.customer.phone,
                    address: booking.address
                },
                service: {
                    description: `${booking.service.type} Cleaning Service`,
                    hours: booking.service.hours,
                    rate: 40,
                    amount: booking.service.amount,
                    extras: booking.service.extras.map(extra => ({
                        name: extra,
                        amount: 30
                    }))
                },
                dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
                status: ['draft', 'sent', 'paid', 'overdue'][Math.floor(Math.random() * 4)]
            });

            invoice.subtotal = invoice.service.amount + 
                invoice.service.extras.reduce((sum, extra) => sum + extra.amount, 0);
            invoice.gst = invoice.subtotal * 0.1;
            invoice.total = invoice.subtotal + invoice.gst;

            if (invoice.status === 'paid') {
                invoice.paidAt = new Date();
            }

            await invoice.save();
        }

        console.log(`Created ${bookings.length} invoices`);
        console.log('Database seeding completed!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedInvoices(); 