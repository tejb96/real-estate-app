import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
      },
    ],
    savedPosts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SavedPost',
      },
    ],
    chats: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chat',
      },
    ],
    chatIDs: [
      {
        type: mongoose.Schema.Types.ObjectId,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = model('User', userSchema);

export default User;
