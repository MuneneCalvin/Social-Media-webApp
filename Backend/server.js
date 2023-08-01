import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use((cors));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.json({limit: "30mb", extended: true}));

mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.log(error.message);
    });

app.get('/', (req, res) => {
    res.send('Hello and welcome to the API');
});

app.listen(process.env.PORT, () => {
    console.log(`Server running on port: ${process.env.PORT}`)
});