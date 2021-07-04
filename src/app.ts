import express from 'express';
import serverConfig from './config/confing';
import {connectDB} from "./config/database";
import morgan from "morgan";
import exphbs from "express-handlebars";
import mainRoute from './routes/';
import authRoute from './routes/auth';
import path from "path";
import passport from "passport";
import session from "express-session";
import passportConfig from './config/passport';
import MongoStore from 'connect-mongo';

// Passport config
passportConfig(passport);

connectDB();
const app = express();
// morgan logging
process.env.NODE_ENV === 'development' && app.use(morgan('dev'));

// handlebars
app.engine('.hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));

// session middleware
app.use(session({
    secret: 'secret session',
    resave: false,
    saveUninitialized: false,
    store:  MongoStore.create({
        mongoUrl: serverConfig.MONGO_URL
    })
}))

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

//declare static folder
app.use(express.static(path.join(__dirname, 'public')));

//routes
app.use('/', mainRoute);
app.use('/auth', authRoute);

const PORT = serverConfig.PORT;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
})