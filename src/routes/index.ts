import express from "express";
import {ensureAuth, ensureGuest} from "../middleware/auth";

const router = express.Router();

// login route
router.get('/', ensureGuest, ((req, res) => {
    res.render('login', {
        layout: 'login'
    });
}));

//dashboard route
router.get('/dashboard', ensureAuth, ((req, res) => {
    res.render('dashboard', {
        name: req.user.firstName
    });
}));

export default router;