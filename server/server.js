import express from 'express';
import dotenv from 'dotenv';
import authRoute from "./routes/auth.route.js";
import cookieParser from 'cookie-parser';


dotenv.config();

const port = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use("/api/auth",authRoute)
app.use(cookieParser())



app.listen(port, () => console.log(`Server started on port ${port}`));
