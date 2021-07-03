import passport from 'passport-google-oauth20'
import User from '../models/User';
import serverConfig from './confing'

const GoogleStrategy = passport.Strategy;
//todo:: correct any types
export default (passport: { use: (arg0: passport.Strategy) => void; serializeUser: (arg0: (user: any, done: any) => void) => void; deserializeUser: (arg0: (id: any, done: any) => void) => void; }) => {
    passport.use(new GoogleStrategy({
        clientID: serverConfig.GOOGLE_CLIENT_ID,
        clientSecret: serverConfig.GOOGLE_CLIENT_SECRET,
        callbackURL: serverConfig.GOOGLE_CLIENT_CALLBACK
    },
        async (asyncToken, refreshToken, profile, done) => {
            console.log(profile)
        }))
    passport.serializeUser((user, done) => done(null, user.id));

    passport.deserializeUser((id, done) => {
        User.findById(id, (err: any, user: any) => done(err, user));
    });
}
