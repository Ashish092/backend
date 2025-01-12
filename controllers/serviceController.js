const Service = require('../models/Service');

// Initial services data from your frontend
const initialServices = [
    {
        id: "residential-cleaning",
        title: "Residential Cleaning",
        description: "Professional home cleaning services tailored to your needs",
        image: "/images/residential-cleaning.jpg",
        features: [
            {
                title: "Deep Cleaning",
                description: "Thorough cleaning of all rooms including hard-to-reach areas"
            },
            {
                title: "Regular Maintenance",
                description: "Scheduled cleaning services to keep your home pristine"
            },
            {
                title: "Customized Plans",
                description: "Cleaning plans tailored to your specific requirements"
            }
        ],
        longDescription: "Our residential cleaning service provides comprehensive home cleaning solutions. We understand that every home is unique, and we tailor our services to meet your specific needs. From regular maintenance to deep cleaning, we ensure your living space remains spotless and comfortable."
    },
    {
        id: "commercial-cleaning",
        title: "Commercial Cleaning",
        description: "Keep your workplace clean and professional",
        image: "/images/commercial-cleaning.jpg",
        features: [
            {
                title: "Office Cleaning",
                description: "Complete cleaning solutions for office spaces"
            },
            {
                title: "Industrial Cleaning",
                description: "Specialized cleaning for industrial facilities"
            },
            {
                title: "Scheduled Maintenance",
                description: "Regular cleaning programs for businesses"
            }
        ],
        longDescription: "Our commercial cleaning service is designed to maintain the highest standards of cleanliness in your workplace. We offer comprehensive cleaning solutions for offices, industrial spaces, and commercial properties. Our team of professionals ensures minimal disruption to your business operations while delivering exceptional cleaning results."
    }
];

// Initialize services
const initializeServices = async (req, res) => {
    try {
        // Clear existing services
        await Service.deleteMany({});
        
        // Insert initial services
        const services = await Service.insertMany(initialServices);
        
        res.status(201).json({
            success: true,
            message: 'Services initialized successfully',
            data: services
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error initializing services',
            error: error.message
        });
    }
};

// Get all services
const getAllServices = async (req, res) => {
    try {
        const services = await Service.find();
        res.status(200).json({
            success: true,
            data: services
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching services',
            error: error.message
        });
    }
};

// Get single service by ID
const getServiceById = async (req, res) => {
    try {
        const service = await Service.findOne({ id: req.params.id });
        if (!service) {
            return res.status(404).json({
                success: false,
                message: 'Service not found'
            });
        }
        res.status(200).json({
            success: true,
            data: service
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching service',
            error: error.message
        });
    }
};

// Create new service
const createService = async (req, res) => {
    try {
        const service = await Service.create(req.body);
        res.status(201).json({
            success: true,
            data: service
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating service',
            error: error.message
        });
    }
};

// Update service
const updateService = async (req, res) => {
    try {
        const service = await Service.findOneAndUpdate(
            { id: req.params.id },
            req.body,
            { new: true, runValidators: true }
        );
        if (!service) {
            return res.status(404).json({
                success: false,
                message: 'Service not found'
            });
        }
        res.status(200).json({
            success: true,
            data: service
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating service',
            error: error.message
        });
    }
};

// Delete service
const deleteService = async (req, res) => {
    try {
        const service = await Service.findOneAndDelete({ id: req.params.id });
        if (!service) {
            return res.status(404).json({
                success: false,
                message: 'Service not found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Service deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting service',
            error: error.message
        });
    }
};

module.exports = {
    getAllServices,
    getServiceById,
    createService,
    updateService,
    deleteService,
    initializeServices
}; 