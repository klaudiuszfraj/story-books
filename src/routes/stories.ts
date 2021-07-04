import express from "express";
import {ensureAuth} from "../middleware/auth";
import StoryModel from "../models/StoryModel";

const router = express.Router();

// add story route
router.get('/add', ensureAuth, ((req, res) => {
    res.render('stories/add');
}));

// post story route
router.post('/', ensureAuth, async (req, res) => {
    try {
        req.body.user = req.user.id;
        await StoryModel.create(req.body);
        res.redirect('/dashboard')
    } catch (e) {
        console.error(e);
        res.render('error/500')
    }
});

// show all story route
router.get('/', ensureAuth, async (req, res) => {
    try {
        const stories = await StoryModel.find({ status: 'public' })
            .populate('user')
            .sort({ createdAt: 'desc' })
            .lean();
        res.render('stories/index', {
            stories
        });
    } catch (e) {
        console.error(e);
        res.render('error/500');
    }
});

// edit story route
router.get('/edit/:id', ensureAuth, async (req, res) => {
    try {
        const story = await StoryModel.findOne({ _id: req.params.id }).lean();
        if (!story) {
            return res.render('error/404');
        }
        if (story.user != req.user.id) {
            res.render('/stories')
        } else {
            res.render('stories/edit', { story })
        }
    } catch (e) {
        console.error(e);
    }
});


export default router;