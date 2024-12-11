const express  = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");

 const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
// const contactRoutes = require("./routes/Contact");
// const courseRoutes = require("./routes/Course");
//const paymentRoutes = require("./routes/Payment");
// const profileRoutes = require("./routes/Profile");

const {dbConnect} = require("./config/database");
//const {connectToCloudinary} = require("./config/cloudinary");
// const fileUpload = require("express-fileupload");

require("dotenv").config();
const PORT = process.env.PORT || 5000;

dbConnect();
app.use(express.json());
app.use(cookieParser());

// Configure CORS
app.use(
    cors({
        origin: 'http://localhost:3000', // Your frontend URL
        credentials: true, // Allow credentials (cookies)
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    })
);

app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/auth/admin", adminRoutes);
// app.use("/api/v1/profile", profileRoutes);
// app.use("/api/v1/course", courseRoutes);
// app.use("/api/v1/reach", contactRoutes);

app.listen(PORT, () => {
	console.log(`App is running at ${PORT}`)
})

app.get("/", (req, res) => {
	res.send("<h1>Hello please</h1>")
});
