import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

// Register a new user
export const register = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation,
        } = req.body;

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random() * 10000),
            impressions: Math.floor(Math.random() * 10000),
        });

        const savedUser = await newUser.save();

        res.status(200).json(savedUser);
    } catch (error) {
        res.status(500).json(error.message);
    }
}

// Login an existing user
export const login = async (req, res) => {
    try {
        const {email, password} = req.body;

        const user = await User.findOne({email: email});
        if (!user) {
            return res.status(404).json('User not found');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json('Invalid credentials');
        }

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
        delete user.password;

        res.status(200).json({ token, user });
    } catch (error) {
        res.status(500).json(error.message);
    }
}