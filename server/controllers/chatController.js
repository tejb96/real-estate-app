import Chat from '../models/chatModel.js.js';
import User from '../models/userModel.js';
import Message from '../models/messageModel.js';

// Get all chats for the authenticated user
export const getChats = async (req, res) => {
  const tokenUserId = req.user.id;

  try {
    const chats = await Chat.find({ userIDs: tokenUserId }).populate('messages');

    for (const chat of chats) {
      const receiverId = chat.userIDs.find(id => id.toString() !== tokenUserId.toString());
      
      const receiver = await User.findById(receiverId).select('id username avatar');
      chat.receiver = receiver;
    }

    res.status(200).json(chats);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Failed to get chats!' });
  }
};

// Get a single chat by ID
export const getChat = async (req, res) => {
  const tokenUserId = req.user.id;

  try {
    const chat = await Chat.findOne({ 
      _id: req.params.id,
      userIDs: tokenUserId 
    }).populate('messages');

    if (!chat) {
      return res.status(404).json({ message: 'Chat not found!' });
    }

    chat.seenBy.push(tokenUserId);
    await chat.save();

    res.status(200).json(chat);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Failed to get chat!' });
  }
};

// Add a new chat
export const addChat = async (req, res) => {
  const tokenUserId = req.user.id;
  const { receiverId } = req.body;

  try {
    const newChat = new Chat({
      userIDs: [tokenUserId, receiverId],
      users: [tokenUserId, receiverId],
    });

    await newChat.save();
    res.status(200).json(newChat);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Failed to add chat!' });
  }
};

// Mark a chat as read
export const readChat = async (req, res) => {
  const tokenUserId = req.user.id;

  try {
    const chat = await Chat.findOneAndUpdate({
      _id: req.params.id,
      userIDs: tokenUserId
    }, {
      $addToSet: { seenBy: tokenUserId }
    }, { new: true });

    if (!chat) {
      return res.status(404).json({ message: 'Chat not found!' });
    }

    res.status(200).json(chat);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Failed to read chat!' });
  }
};
