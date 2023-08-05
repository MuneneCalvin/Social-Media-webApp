import sql from 'mssql';
import config from '../Db/config.js';

// Create a Post
export const createPost = async (req, res) => {
    try {
        const { userId, description, picturePath} = req.body;
        const user = await user.findBy(userId);

        const post = await post.create ({
            userId,
            description,
            picturePath
        });

        res.status(200).json(post);

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// READ
export const getFeedPosts = async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 });
        res.status(200).json(posts);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// Get Post by ID
export const getUserPosts = async (req, res) => {
    try {
        const { userId } = req.params;
        const posts = await Post.find({ userId }).sort({ createdAt: -1 });
        res.status(200).json(posts);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// UPDATE
export const likePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;
    
        const post = await Post.findById(id);
    
        const isLiked = post.likes.get(userId);
    
        if (isLiked) {
            post.likes.delete(userId);
        } else {
            post.likes.set(userId, true);
        }
    
        const updatedPost = await Post.findByIdAndUpdate(
            id,
            { likes: post.likes },
            { new: true }
        );
    
        res.status(200).json(updatedPost);
        } catch (error) {
        res.status(404).json({ message: error.message });
    }
};