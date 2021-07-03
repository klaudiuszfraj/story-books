import express from 'express';
import serverConfig from './config/confing';
import {connectDB} from "./config/database";
import morgan from "morgan";

connectDB();
const app = express();
process.env.NODE_ENV === 'development' && app.use(morgan('dev'));

const PORT = serverConfig.PORT;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
})