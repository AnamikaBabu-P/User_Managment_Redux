import express from "express";
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/dbConfig.js";
import userRoutes from './routes/userRoutes.js'
import adminRoutes from './routes/adminRoutes.js'
import cors from 'cors';
dotenv.config();

connectDB();
const port = process.env.PORT || 3001;
const app= express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cookieParser());

app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
app.get('/',(req,res) => res.send('Server is ready'));

app.use(notFound);
app.use(errorHandler);


app.listen(port, ()=> console.log(`Server started on port ${port}`))