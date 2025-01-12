const mongoose = require('mongoose');
const config = require('./config');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(config.mongodbUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 10000, // Increased timeout
            retryWrites: true,
            w: 'majority'
        });

        console.log('\n🌿 MongoDB Connection:');
        console.log(`✅ Database Connected: ${conn.connection.host}`);
        console.log(`📁 Database Name: ${conn.connection.name}`);
        console.log(`🔌 Connection State: ${conn.connection.readyState === 1 ? 'Connected' : 'Disconnected'}\n`);

        // Handle connection events
        mongoose.connection.on('error', err => {
            console.error('MongoDB connection error:', err);
        });

        mongoose.connection.on('disconnected', () => {
            console.log('MongoDB disconnected');
            // Attempt to reconnect
            setTimeout(connectDB, 5000);
        });

        mongoose.connection.on('reconnected', () => {
            console.log('MongoDB reconnected');
        });

        return conn;

    } catch (error) {
        console.error('\n❌ MongoDB Connection Error:');
        console.error(`🔴 Error: ${error.message}\n`);
        
        // Retry connection in production
        if (process.env.NODE_ENV === 'production') {
            console.log('Retrying connection in 5 seconds...');
            setTimeout(connectDB, 5000);
        } else {
            process.exit(1);
        }
    }
};

module.exports = connectDB; 