import passport from 'passport-google-oauth20';
import User from '../models/UserModel';
import serverConfig from './confing';
import UserModel from '../models/UserModel';

const GoogleStrategy = passport.Strategy;
//todo:: correct any types
export default (passport: { use: (arg0: passport.Strategy) => void; serializeUser: (arg0: (user: any, done: any) => void) => void; deserializeUser: (arg0: (id: any, done: any) => void) => void; }) => {
    passport.use(new GoogleStrategy({
        clientID: serverConfig.GOOGLE_CLIENT_ID,
        clientSecret: serverConfig.GOOGLE_CLIENT_SECRET,
        callbackURL: serverConfig.GOOGLE_CLIENT_CALLBACK
    },
        async (asyncToken, refreshToken, profile, done) => {

                const newUser = {
                googleID: profile.id,
                displayName: profile.displayName,
                firstName: profile.name?.givenName,
                lastName: profile.name?.familyName,
                image: profile.photos && profile.photos[0].value
            }
            try {
                let user = await UserModel.findOne({ googleID: profile.id});
                if (user) {
                    done(null, user);
                } else {
                    user = await UserModel.create(newUser);
                    done(null, user);
                }
            } catch (e) {
                console.error('passport config', e);
            }
        }))
    passport.serializeUser((user, done) => done(null, user.id));

    passport.deserializeUser((id, done) => {
        User.findById(id, (err: any, user: any) => done(err, user));
    });
}
