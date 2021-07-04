import express from "express";
import {ensureAuth, ensureGuest} from "../middleware/auth";
import StoryModel from "../models/StoryModel";

const router = express.Router();

// login route
router.get('/', ensureGuest, ((req, res) => {
    res.render('login', {
        layout: 'login'
    });
}));

//dashboard route
router.get('/dashboard', ensureAuth, async (req, res) => {
    try {
        const stories = await StoryModel.find({ user: req.user.id }).lean();


        res.render('dashboard', {
            name: req.user.firstName,
            stories
        });
    } catch (e) {
        console.error(e);
        res.render('error/500')
    }
});

export default router;