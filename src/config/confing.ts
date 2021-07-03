import dotenv from 'dotenv';
import path from "path";

//load config
dotenv.config({ path: path.join(__dirname, '.env') });

// server options
const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL || 'default database URL';

console.assert(PORT, 'PORT is require');
console.assert(MONGO_URL, 'MONGO_URL is require');

// db options
export const optionsDB = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}

// authorization config
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || 'defaultClientId';
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || 'defaultSecretKey';
const GOOGLE_CLIENT_CALLBACK = process.env.GOOGLE_CLIENT_CALLBACK || 'defaultCallback';


export default {
    PORT,
    MONGO_URL,
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    GOOGLE_CLIENT_CALLBACK
}