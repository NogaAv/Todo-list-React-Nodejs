import mongoose from 'mongoose';
import environments from '../../config/environments.js';

const connectToMongoDB = async () => {
    try {
        await mongoose.connect(environments.MONGODB_URL);

        console.log('MongoDB database connected!');
    } catch (err) {
        console.log('MongoDB database connection error!');

        process.exit(1);
    }
};

export default connectToMongoDB;
