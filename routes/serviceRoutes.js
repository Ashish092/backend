const express = require('express');
const router = express.Router();
const { 
    getAllServices, 
    getServiceById, 
    createService, 
    updateService, 
    deleteService,
    initializeServices 
} = require('../controllers/serviceController');

// Route to initialize services with default data
router.post('/initialize', initializeServices);

// CRUD routes
router.get('/', getAllServices);
router.get('/:id', getServiceById);
router.post('/', createService);
router.put('/:id', updateService);
router.delete('/:id', deleteService);

module.exports = router; 