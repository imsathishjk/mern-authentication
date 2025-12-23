import express, { urlencoded } from 'express';
import dotenv from 'dotenv/config';
import authRouter from './routes/authRoute.js';
import { connectDB } from './config/db.js';
import userRouter from './routes/userRoute.js';
import cookieParser from 'cookie-parser';
import cors from 'cors'

// Initiating express App
const app = express();

const PORT = process.env.PORT || 8000
const BACKEND_URL = process.env.BACKEND_URL;




// Middileware to access token


const allowedOrigins = [process.env.CLIENT_URL, 'https://mern-authentication-client-beta.vercel.app'];

const corsOptions = {
    origin: allowedOrigins,
    credentials: true, // ✅ Important for sending cookies
};

app.use(express.json());
app.use(urlencoded({ extended: true }))
app.use(cors(corsOptions));



// Middleware to extract token
app.use(cookieParser());


// app.listen(PORT, () => {
//     console.log(`Server running on ${BACKEND_URL}${PORT}...`)
// });
// Connect Database
await connectDB();

app.get('/', (req, res) => {
    res.send('API Working..')
});
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);


export default app;
