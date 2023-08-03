import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

// Import routes
// import { register } from './routes/authController.js';
import authRouter from './routes/authRoutes.js';

// Initialize express
const app = express();
app.use((cors));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.json({limit: "30mb", extended: true}));

// Routes
app.use('/auth', authRouter);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('Connected successfully to MongoDB');
    })
    .catch((error) => {
        console.log(error.message);
    });


// Default route
app.get('/', (req, res) => {
    res.send('Hello and welcome to the API');
});

// Start server
app.listen(process.env.PORT, () => {
    console.log(`Server running on port: ${process.env.PORT}`)
});