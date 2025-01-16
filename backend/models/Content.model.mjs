import mongoose from 'mongoose';

const contentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    accessType: {
      type: String,
      enum: ['public', 'branch', 'private'],
      default: 'public',
    },
    course: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Course', 
    }, 
    uploadBy: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', 
    },
    fileUrl: {
      type: String,
      required: true, 
    },
    fileName: {
      type: String,
      required: true,  
    },
    uploadedAt: {
      type: Date,
      default: Date.now,  
    },
  },
  {
    timestamps: true,  
  }
);

const Content = mongoose.model('Content', contentSchema);
export default Content;
