const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
const Invoice = require('../models/Invoice');
const Booking = require('../models/Booking');
const PDFDocument = require('pdfkit');

// Get all invoices
router.get('/', protect, admin, async (req, res) => {
    try {
        const invoices = await Invoice.find()
            .sort({ createdAt: -1 })
            .populate('bookingId', 'bookingNo');
        res.json({ success: true, data: invoices });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Create invoice from booking
router.post('/', protect, admin, async (req, res) => {
    try {
        const booking = await Booking.findById(req.body.bookingId);
        if (!booking) {
            return res.status(404).json({ success: false, error: 'Booking not found' });
        }

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
                rate: 40, // Base rate per hour
                amount: booking.service.amount,
                extras: booking.service.extras.map(extra => ({
                    name: extra,
                    amount: 30 // Standard extra service rate
                }))
            },
            dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000) // 14 days from now
        });

        // Calculate totals
        invoice.subtotal = invoice.service.amount + 
            invoice.service.extras.reduce((sum, extra) => sum + extra.amount, 0);
        invoice.gst = invoice.subtotal * 0.1; // 10% GST
        invoice.total = invoice.subtotal + invoice.gst;

        await invoice.save();
        res.status(201).json({ success: true, data: invoice });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

// Get single invoice
router.get('/:id', protect, admin, async (req, res) => {
    try {
        const invoice = await Invoice.findById(req.params.id)
            .populate('bookingId', 'bookingNo');
        if (!invoice) {
            return res.status(404).json({ success: false, error: 'Invoice not found' });
        }
        res.json({ success: true, data: invoice });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Update invoice
router.put('/:id', protect, admin, async (req, res) => {
    try {
        const invoice = await Invoice.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!invoice) {
            return res.status(404).json({ success: false, error: 'Invoice not found' });
        }
        res.json({ success: true, data: invoice });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

// Send invoice
router.post('/:id/send', protect, admin, async (req, res) => {
    try {
        const invoice = await Invoice.findById(req.params.id);
        if (!invoice) {
            return res.status(404).json({ success: false, error: 'Invoice not found' });
        }

        // Update status to sent
        invoice.status = 'sent';
        await invoice.save();

        // Here you would typically send an email with the invoice
        // For now, we'll just return success
        res.json({ success: true, message: 'Invoice sent successfully' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Download invoice as PDF
router.get('/:id/download', protect, admin, async (req, res) => {
    try {
        const invoice = await Invoice.findById(req.params.id)
            .populate('bookingId', 'bookingNo');
        if (!invoice) {
            return res.status(404).json({ success: false, error: 'Invoice not found' });
        }

        // Create PDF
        const doc = new PDFDocument();
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=invoice-${invoice.invoiceNo}.pdf`);
        doc.pipe(res);

        // Add content to PDF
        doc.fontSize(25).text('INVOICE', { align: 'center' });
        doc.moveDown();
        doc.fontSize(12).text(`Invoice No: ${invoice.invoiceNo}`);
        doc.text(`Date: ${new Date(invoice.createdAt).toLocaleDateString()}`);
        doc.moveDown();
        // Add more PDF content...

        doc.end();
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router; 