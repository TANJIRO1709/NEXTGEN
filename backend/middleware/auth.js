const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

exports.verifyToken = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "No token found"
            });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
            next();
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: "Invalid token"
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong while verifying token"
        });
    }
};

exports.isAdmin = async (req, res, next) => {
    try {
        const admin = await Admin.findById(req.user.id);
        if (!admin || !admin.active) {
            return res.status(403).json({
                success: false,
                message: "Access denied. Only active admins are allowed."
            });
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error while verifying admin status"
        });
    }
};
