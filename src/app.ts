import express from 'express';
import serverConfig from './config/confing';
import {connectDB} from "./config/database";
import morgan from "morgan";
import exphbs from "express-handlebars";
import mainRoute from './routes/';
import path from "path";

connectDB();
const app = express();
// morgan logging
process.env.NODE_ENV === 'development' && app.use(morgan('dev'));

// handlebars
app.engine('.hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));

//declare static folder
app.use(express.static(path.join(__dirname, 'public')));

//routes
app.use('/', mainRoute);

const PORT = serverConfig.PORT;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
})