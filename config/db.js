const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log('\n🌿 MongoDB Connection:');
        console.log(`✅ Database Connected: ${conn.connection.host}`);
        console.log(`📁 Database Name: ${conn.connection.name}`);
        console.log(`🔌 Connection State: ${conn.connection.readyState === 1 ? 'Connected' : 'Disconnected'}\n`);
    } catch (error) {
        console.error('\n❌ MongoDB Connection Error:');
        console.error(`🔴 Error: ${error.message}\n`);
        process.exit(1);
    }
};

module.exports = connectDB; 