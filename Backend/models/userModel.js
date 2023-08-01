import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
    {
    firstName: {
        type: String,
        required: [true, 'Please enter your first name'],
        min: [3, 'Please enter a first name greater than 2 characters'],
        max: [50, 'First name should not exceed 50 characters'],
    },
    lastName: {
        type: String,
        required: [true, 'Please enter your last name'],
        min: [3, 'Please enter a last name greater than 2 characters'],
        max: [50, 'Last name should not exceed 50 characters'],
    },
    email: {
        type: String,
        required: [true, 'Please provide an email address'],
        max: [50, 'Email address should not exceed 50 characters'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please enter password'],
        min: [6, 'Password should not be less than 6 characters'],
    },
    picturePath: {
        type: String,
        default: '',
    },
    friends: {
        type: Array,
        default: [],
    },
    location: String,
    occupation: String,
    viewedProfile: Number,
    impressions: Number,
    },
    { timestamps: true }
);

const User = mongoose.model('User', UserSchema);
export default User;