import express from "express";
import {ensureAuth} from "../middleware/auth";
import StoryModel from "../models/StoryModel";

const router = express.Router();

// add story route
router.get('/add', ensureAuth, ((req, res) => {
    res.render('stories/add');
}));



export default router;