import express from "express";

const router = express.Router();

// login route
router.get('/', ((req, res) => {
    res.send('Login');
}));

//dashboard route
router.get('/dashboard', ((req, res) => {
    res.send('Dashboard');
}));

export default router;