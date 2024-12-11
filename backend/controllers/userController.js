const User = require("../models/User");
const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
    try {
        const {
            fullName,
            phoneNumber,
            email,
            password,
            gender,
            dob,
            address,
            pinCode,
            postOffice,
            occupation,
            incomeCategory,
            acresOfLand
        } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Find admins based on post office
        const matchingAdmins = await Admin.find({ postOffice: postOffice });

        // Create new user
        const user = await User.create({
            fullName,
            phoneNumber,
            email,
            password: hashedPassword,
            gender,
            dob,
            address,
            pinCode,
            postOffice,
            occupation,
            incomeCategory,
            acresOfLand,
            admins: matchingAdmins.map(admin => admin._id) // Add admin references to user
        });

        // Add user reference to each matching admin
        await Promise.all(matchingAdmins.map(admin => 
            Admin.findByIdAndUpdate(
                admin._id,
                { $push: { users: user._id } },
                { new: true }
            )
        ));

        // Generate JWT token
        const token = jwt.sign(
            { id: user._id, email: user.email },
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
            message: "User created successfully",
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                pincode: user.pinCode,
                userType: "user"
            },
            token
        });

    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({
            success: false,
            message: "Error in user registration",
            error: error.message
        });
    }
};

exports.login = async (req, res) => {
    try {
        const { emailOrPhone, password } = req.body;

        // Find user by email or phone
        const user = await User.findOne({
            $or: [
                { email: emailOrPhone },
                { phoneNumber: emailOrPhone }
            ]
        }).populate('admins', 'fullName department');

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        // Check password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        // Find admins based on user's post office
        const matchingAdmins = await Admin.find({ postOffice: user.postOffice });

        // Generate JWT token
        const token = jwt.sign(
            { id: user._id, email: user.email },
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
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                pincode: user.pinCode,
                userType: "user"
            },
            token
        });

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({
            success: false,
            message: "Error during login",
            error: error.message
        });
    }
};

exports.logout = async (req, res) => {
    try {
        // Clear the token cookie
        res.cookie('token', '', {
            expires: new Date(0),
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/'
        });

        res.status(200).json({
            success: true,
            message: "Logged out successfully"
        });
    } catch (error) {
        console.error("Logout error:", error);
        res.status(500).json({
            success: false,
            message: "Error during logout",
            error: error.message
        });
    }
};
