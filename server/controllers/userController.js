import User from '../models/User.js';
import Post from '../models/Post.js';
import SavedPost from '../models/SavedPost.js';


// Get all users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Failed to get users' });
  }
};

// Get a single user by ID
export const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Failed to get user' });
  }
};

// Update a user by ID
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, email, password, avatar } = req.body;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.username = username || user.username;
    user.email = email || user.email;
    user.password = password ? await bcrypt.hash(password, 10) : user.password;
    user.avatar = avatar || user.avatar;

    const updatedUser = await user.save();
    res.status(200).json(updatedUser);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Failed to update user' });
  }
};

// Delete a user by ID
export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await user.remove();
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Failed to delete user' });
  }
};

// Save a post
export const savePost = async (req, res) => {
  const { userId, postId } = req.body;

  try {
    const user = await User.findById(userId);
    const post = await Post.findById(postId);

    if (!user || !post) {
      return res.status(404).json({ message: 'User or Post not found' });
    }

    const newSavedPost = new SavedPost({
      user: userId,
      post: postId,
    });

    await newSavedPost.save();
    res.status(201).json({ message: 'Post saved successfully' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Failed to save post' });
  }
};

// Get profile posts
export const profilePosts = async (req, res) => {
  const { userId } = req.query;

  try {
    const user = await User.findById(userId).populate('posts');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user.posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Failed to get profile posts' });
  }
};

// Get notification number
export const getNotificationNumber = async (req, res) => {
  const { userId } = req.query;

  try {
    // For demonstration, we'll assume notifications are related to new messages
    const user = await User.findById(userId).populate('chats');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    let notificationCount = 0;
    user.chats.forEach(chat => {
      if (chat.lastMessage) {
        notificationCount++;
      }
    });

    res.status(200).json({ notificationCount });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Failed to get notifications' });
  }
};
