const jwt = require('jsonwebtoken');
const Faq = require('../models/Faq');
const Job = require('../models/Job');
// Import other models as needed

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log('Login attempt:', { email, password });

        // Compare with environment variables
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(
                { 
                    role: 'admin',
                    isAdmin: true,
                    email,
                },
                process.env.JWT_SECRET,
                { expiresIn: '24h' }
            );
            
            console.log('Login successful');
            res.json({ 
                success: true,
                token,
                message: 'Login successful'
            });
        } else {
            console.log('Invalid credentials');
            res.status(401).json({ 
                success: false,
                message: 'Invalid credentials'
            });
        }
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ 
            success: false,
            message: error.message 
        });
    }
};

const getStats = async (req, res) => {
    try {
        const [
            totalBookings,
            pendingBookings,
            completedBookings,
            recentBookings
        ] = await Promise.all([
            Job.countDocuments(),
            Job.countDocuments({ status: 'pending' }),
            Job.countDocuments({ status: 'completed' }),
            Job.find()
                .sort({ createdAt: -1 })
                .limit(10)
                .select('reference customer service schedule status')
        ]);

        // Calculate total revenue
        const totalRevenue = await Job.aggregate([
            { $match: { status: 'completed' } },
            { $group: { _id: null, total: { $sum: '$service.price' } } }
        ]);

        res.json({
            success: true,
            data: {
                totalBookings,
                pendingBookings,
                completedBookings,
                totalRevenue: totalRevenue[0]?.total || 0,
                recentBookings
            }
        });
    } catch (error) {
        console.error('Stats Error:', error);
        res.status(500).json({ 
            success: false,
            message: 'Failed to fetch stats' 
        });
    }
};

const verifyAdmin = async (req, res) => {
    try {
        // req.user is set by the protect middleware
        if (req.user && req.user.isAdmin) {
            res.json({
                success: true,
                message: 'Admin verified'
            });
        } else {
            res.status(403).json({
                success: false,
                message: 'Not authorized as admin'
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error verifying admin status'
        });
    }
};

module.exports = {
    login,
    getStats,
    verifyAdmin
}; 