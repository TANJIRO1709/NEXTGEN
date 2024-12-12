const Admin = require("../models/Admin");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
    try {
        const {
            fullName,
            employeeId,
            email,
            password,
            department,
            state,
            district,
            pinCode,
            postOffice
        } = req.body;

        // Check if admin already exists
        const existingAdmin = await Admin.findOne({ 
            $or: [{ email }, { employeeId }]
        });
        if (existingAdmin) {
            return res.status(400).json({
                success: false,
                message: existingAdmin.email === email ? 
                    "Email already registered" : 
                    "Employee ID already exists"
            });
        }

        // Validate department from employeeId
        const deptCode = employeeId.substring(0, 2).toUpperCase();
        if (deptCode !== department) {
            return res.status(400).json({
                success: false,
                message: "Employee ID must start with the selected department code"
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Find users based on post office
        const matchingUsers = await User.find({ postOffice: postOffice });

        // Create new admin
        const admin = await Admin.create({
            fullName,
            employeeId,
            email,
            password: hashedPassword,
            department,
            state,
            district,
            pinCode,
            postOffice,
            users: matchingUsers.map(user => user._id)
        });

        // Add admin reference to each matching user
        await Promise.all(matchingUsers.map(user => 
            User.findByIdAndUpdate(
                user._id,
                { $push: { admins: admin._id } },
                { new: true }
            )
        ));

        // Generate JWT token
        const token = jwt.sign(
            { 
                id: admin._id, 
                email: admin.email, 
                department: admin.department 
            },
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
        );

        // Set cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000 // 24 hours
        });

        // Send response
        res.status(201).json({
            success: true,
            message: "Admin created successfully",
            admin: {
                id: admin._id,
                fullName: admin.fullName,
                email: admin.email,
                employeeId: admin.employeeId,
                department: admin.department,
                pinCode: admin.pinCode,
                userType: "admin"
            },
            token
        });

    } catch (error) {
        console.error("Admin signup error:", error);
        res.status(500).json({
            success: false,
            message: "Error in admin registration",
            error: error.message
        });
    }
};

exports.signin = async (req, res) => {
    try {
        const { employeeId, password } = req.body;

        // Find admin
        const admin = await Admin.findOne({ employeeId });
        if (!admin) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        // Check password
        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        // Validate department from employeeId
        const deptCode = employeeId.substring(0, 2).toUpperCase();
        if (deptCode !== admin.department) {
            return res.status(401).json({
                success: false,
                message: "Invalid employee ID format"
            });
        }

        // Generate JWT token
        const token = jwt.sign(
            { 
                id: admin._id, 
                email: admin.email, 
                department: admin.department 
            },
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
        );

        // Set cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000 // 24 hours
        });

        // Send response
        res.status(200).json({
            success: true,
            message: "Login successful",
            admin: {
                id: admin._id,
                fullName: admin.fullName,
                email: admin.email,
                employeeId: admin.employeeId,
                department: admin.department,
                pinCode: admin.pinCode,
                userType: "admin"
            },
            token
        });

    } catch (error) {
        console.error("Admin signin error:", error);
        res.status(500).json({
            success: false,
            message: "Error in admin login",
            error: error.message
        });
    }
};

exports.logout = async (req, res) => {
    try {
        // Clear the token cookie
        res.cookie('token', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            expires: new Date(0)
        });

        res.status(200).json({
            success: true,
            message: "Logged out successfully"
        });
    } catch (error) {
        console.error("Admin logout error:", error);
        res.status(500).json({
            success: false,
            message: "Error in logout",
            error: error.message
        });
    }
};