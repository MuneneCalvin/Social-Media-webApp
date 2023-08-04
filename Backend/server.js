import express from 'express';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

// Middleware
const app = express();
app.use((cors));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.json());

// Enable CORS middleware
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,');
    next();
});

// Jwt middleware
app.use((req, res, next) => {
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
        jwt.verify(req.headers.authorization.split(' ')[1], config.jwt_secret, (err, decode) => {
            if (err) req.user = undefined;
            req.user = decode;
            next();
        });
    } else {
        req.user = undefined;
        next();
    }
});

// Routes
// Routes(app);

// Default route
app.get('/', (req, res) => {
    res.send('Hello from Social WebApp!!!');
});

// Start server
app.listen(process.env.PORT, () => {
    console.log(`Server running on port: ${process.env.PORT}`)
});