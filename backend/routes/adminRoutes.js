const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { verifyToken, isAdmin } = require('../middleware/auth');

// Auth routes
router.post('/signup', adminController.signup);
router.post('/signin', adminController.signin);


// Protected routes
router.use(verifyToken, isAdmin);

module.exports = router;
