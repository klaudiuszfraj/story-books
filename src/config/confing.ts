import dotenv from 'dotenv';

//load config
dotenv.config({ path: __dirname + '/.env' });

const {
    PORT,
    MONGO_URL
} = process.env;

console.log(PORT)

console.assert(PORT, 'PORT is require');
console.assert(MONGO_URL, 'MONGO_URL is require');

export default {
    PORT,
    MONGO_URL
}