import express from 'express';
import dotenv from 'dotenv';
import authRoute from "./routes/authRoute.js";
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';


dotenv.config();

connectDB();

const port = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use("/api/auth",authRoute)
app.use(cookieParser())



app.listen(port, () => console.log(`Server started on port ${port}`));
