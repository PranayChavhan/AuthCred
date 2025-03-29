import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import employeeRoutes from "./routes/employeeRoutes.js";
import path from 'path';
import { fileURLToPath } from 'url';
import nodemailer from"nodemailer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use("/api/auth", authRoutes);

app.use("/api/users", userRoutes);

app.use('/api/employees', employeeRoutes);

// Add a root route for welcome message
app.get("/", (req, res) => {
  res.send("Welcome to AuthCred API! 🚀");
});




const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "saijadhav1723@gmail.com",
    pass: "lcqf qech toba yzng"
  },
});

app.post("/send-email", (req, res) => {
  const { email } = req.body;

  const mailOptions = {
    from: "ben10.official777@gmail.com",
    to: email,
    subject: `Status Update`,
    text: `Your current status is`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('====================================');
      console.log(error);
      console.log('====================================');
      return res.status(500).send("Failed to send email");
    }
    res.status(200).send("Email sent successfully");
  });
});




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} and live url is: https://authcred.onrender.com`));

// https://authcred.onrender.com
