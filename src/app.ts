import express from 'express';
import serverConfig from './config/confing';


const app = express();

const PORT = serverConfig.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
})