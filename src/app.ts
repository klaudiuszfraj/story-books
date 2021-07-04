import express from 'express';
import serverConfig from './config/confing';
import {connectDB} from "./config/database";
import morgan from "morgan";
import exphbs from "express-handlebars";
import mainRoute from './routes/';
import authRoute from './routes/auth';
import storiesRoute from './routes/stories';
import path from "path";
import passport from "passport";
import session from "express-session";
import passportConfig from './config/passport';
import MongoStore from 'connect-mongo';
import methodOverride from 'method-override';

// Passport config
passportConfig(passport);

connectDB();
const app = express();


// morgan logging
process.env.NODE_ENV === 'development' && app.use(morgan('dev'));

// handlebars helpers
import { formatDate, truncate, stripTags, editIcon, select } from "./helpers/hbs";

// handlebars
app.engine('.hbs', exphbs({
    helpers: {
        formatDate,
        truncate,
        stripTags,
        editIcon,
        select
    },
    defaultLayout: 'main',
    extname: '.hbs'
}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));

// body parser middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// method override middleware
app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        let method = req.body._method
        delete req.body._method
        return method
    }
}))


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

// set global variable middleware
app.use(((req, res, next) => {
    res.locals.user = req.user || null;
    next();
}))

//declare static folder
app.use(express.static(path.join(__dirname, 'public')));

//routes
app.use('/', mainRoute);
app.use('/auth', authRoute);
app.use('/stories', storiesRoute);

const PORT = serverConfig.PORT;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
})