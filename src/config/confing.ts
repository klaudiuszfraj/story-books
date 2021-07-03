import dotenv from 'dotenv';

//load config
dotenv.config({ path: `${__dirname}/.env` });

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

export default {
    PORT,
    MONGO_URL
}