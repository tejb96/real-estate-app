import Message from '../models/messageModel.js';
import Chat from '../models/chatModel.js';

// Add a new message to a chat
export const addMessage = async (req, res) => {
  const tokenUserId = req.user.id;
  const { chatId } = req.params;
  const { text } = req.body;

  try {
    // Check if the chat exists and the user is part of the chat
    const chat = await Chat.findOne({ _id: chatId, userIDs: tokenUserId });

    if (!chat) {
      return res.status(404).json({ message: 'Chat not found!' });
    }

    // Create a new message
    const newMessage = new Message({
      text,
      userId: tokenUserId,
      chat: chatId,
    });

    // Save the message to the database
    await newMessage.save();

    // Add the message to the chat's messages array
    chat.messages.push(newMessage._id);
    chat.lastMessage = text;
    await chat.save();

    res.status(201).json(newMessage);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Failed to add message!' });
  }
};
