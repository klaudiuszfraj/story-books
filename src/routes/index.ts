import express from "express";

const router = express.Router();

// login route
router.get('/', ((req, res) => {
    res.render('login');
}));

//dashboard route
router.get('/dashboard', ((req, res) => {
    res.render('dashboard');
}));

export default router;