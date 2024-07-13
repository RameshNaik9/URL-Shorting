const mongoose = require('mongoose');
mongoose.set("strictQuery", true);

async function connectToMongoDB(url) {
    try {
        await mongoose.connect(url);
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        process.exit(1); 
    }
}

module.exports = {
    connectToMongoDB,
};
