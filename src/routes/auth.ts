import express from "express";
import passport from "passport";
const router = express.Router();

// auth with google route
router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

//  google auth callback route
router.get(
    '/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        res.redirect('/dashboard');
    }
);

// logout route
router.get('/logout', ((req, res) => {
    req.logout();
    res.redirect('/');
}))

export default router;