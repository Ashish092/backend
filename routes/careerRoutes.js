const express = require('express');
const router = express.Router();
const {
    getCareers,
    getAllCareers,
    createCareer,
    updateCareer,
    deleteCareer
} = require('../controllers/careerController');
const { protect } = require('../middleware/authMiddleware');

// Public routes
router.get('/', getCareers);

// Protected routes
router.get('/all', protect, getAllCareers);
router.post('/', protect, createCareer);
router.put('/:id', protect, updateCareer);
router.delete('/:id', protect, deleteCareer);

module.exports = router; 