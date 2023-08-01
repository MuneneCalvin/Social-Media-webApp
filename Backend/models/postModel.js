import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema(
    {
    userId: {
        type: String,
        required: [true, 'Please enter userId'],
    },
    firstName: {
        type: String,
        required: [true, 'Please enter user first name'],
    },
    lastName: {
        type: String,
        required: [true, 'Please enter user last name'],
    },
    location: String,
    description: String,
    picturePath: String,
    userPicturePath: String,
    likes: {
        type: Map, //Typically we use an object but mongoDB saves it as Map. We're checking if the userId exists in this Map
        of: Boolean, //value of Boolean. It would look something like this: 'someId':true on our database in the "likes" object.
    },
    comments: {
        type: Array,
        default: [],
    },
    },
    { timestamps: true }
);

const Post = mongoose.model('Post', PostSchema);

export default Post;