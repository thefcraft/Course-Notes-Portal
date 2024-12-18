import mongoose from 'mongoose';

// Define the schema for Notes
const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true } // Automatically includes createdAt and updatedAt
);

// Create the Note model based on the schema
const Note = mongoose.model('Note', noteSchema);

export default Note;
