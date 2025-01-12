const Contact = require('../models/Contact');

// Get all contacts with filtering and pagination
exports.getContacts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const search = req.query.search || '';
        const status = req.query.status;
        const tag = req.query.tag;

        let query = {};

        // Search functionality
        if (search) {
            query.$or = [
                { firstName: { $regex: search, $options: 'i' } },
                { lastName: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } },
                { phone: { $regex: search, $options: 'i' } }
            ];
        }

        // Status filter
        if (status) {
            query.status = status;
        }

        // Tag filter
        if (tag) {
            query.tags = tag;
        }

        const contacts = await Contact.find(query)
            .sort({ lastActivity: -1 })
            .skip((page - 1) * limit)
            .limit(limit)
            .populate('bookingHistory');

        const total = await Contact.countDocuments(query);

        res.json({
            success: true,
            data: contacts,
            pagination: {
                total,
                pages: Math.ceil(total / limit),
                page,
                limit
            }
        });
    } catch (error) {
        console.error('Error fetching contacts:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching contacts',
            error: error.message
        });
    }
};

// Get single contact
exports.getContact = async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id)
            .populate('bookingHistory');

        if (!contact) {
            return res.status(404).json({
                success: false,
                message: 'Contact not found'
            });
        }

        res.json({
            success: true,
            data: contact
        });
    } catch (error) {
        console.error('Error fetching contact:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching contact',
            error: error.message
        });
    }
};

// Create new contact
exports.createContact = async (req, res) => {
    try {
        const contact = new Contact(req.body);
        await contact.save();

        res.status(201).json({
            success: true,
            data: contact
        });
    } catch (error) {
        console.error('Error creating contact:', error);
        res.status(500).json({
            success: false,
            message: 'Error creating contact',
            error: error.message
        });
    }
};

// Update contact
exports.updateContact = async (req, res) => {
    try {
        const contact = await Contact.findByIdAndUpdate(
            req.params.id,
            { 
                ...req.body,
                lastActivity: Date.now()
            },
            { new: true, runValidators: true }
        );

        if (!contact) {
            return res.status(404).json({
                success: false,
                message: 'Contact not found'
            });
        }

        res.json({
            success: true,
            data: contact
        });
    } catch (error) {
        console.error('Error updating contact:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating contact',
            error: error.message
        });
    }
};

// Delete contact
exports.deleteContact = async (req, res) => {
    try {
        const contact = await Contact.findByIdAndDelete(req.params.id);

        if (!contact) {
            return res.status(404).json({
                success: false,
                message: 'Contact not found'
            });
        }

        res.json({
            success: true,
            message: 'Contact deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting contact:', error);
        res.status(500).json({
            success: false,
            message: 'Error deleting contact',
            error: error.message
        });
    }
};

// Get contact statistics
exports.getContactStats = async (req, res) => {
    try {
        const stats = await Contact.aggregate([
            {
                $facet: {
                    'statusStats': [
                        { $group: { _id: '$status', count: { $sum: 1 } } }
                    ],
                    'sourceStats': [
                        { $group: { _id: '$source', count: { $sum: 1 } } }
                    ],
                    'tagStats': [
                        { $unwind: '$tags' },
                        { $group: { _id: '$tags', count: { $sum: 1 } } }
                    ]
                }
            }
        ]);

        res.json({
            success: true,
            data: stats[0]
        });
    } catch (error) {
        console.error('Error fetching contact stats:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching contact statistics',
            error: error.message
        });
    }
}; 