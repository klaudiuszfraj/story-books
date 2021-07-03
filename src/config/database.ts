import mongoose from 'mongoose';
import serverConfig from './confing';
import {optionsDB} from "./confing";

export const connectDB = async () => {
    try {
        const connectionDB = await mongoose.connect(serverConfig.MONGO_URL, optionsDB);
        console.log(`MongoDB connected: ${connectionDB.connection.host}`);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
};