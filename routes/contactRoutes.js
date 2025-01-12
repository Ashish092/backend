const express = require('express');
const router = express.Router();
const { 
    getContacts, 
    getContact, 
    createContact, 
    updateContact, 
    deleteContact,
    getContactStats
} = require('../controllers/contactController');
const { protect, admin } = require('../middleware/authMiddleware');
const Contact = require('../models/Contact');

// All routes are protected and require admin access
router.use(protect, admin);

// Search route must come before /:id route
router.get('/search', async (req, res) => {
    try {
        const searchTerm = req.query.q;
        const regex = new RegExp(searchTerm, 'i');

        const contacts = await Contact.find({
            $or: [
                { firstName: regex },
                { name: regex },
                { email: regex }
            ]
        })
        .sort({ firstName: 1 })
        .limit(10);

        res.json({ success: true, data: contacts });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

router.route('/')
    .get(getContacts)
    .post(createContact);

router.route('/stats')
    .get(getContactStats);

router.route('/:id')
    .get(getContact)
    .put(updateContact)
    .delete(deleteContact);

module.exports = router; 