import * as mongoose from 'mongoose';

// public userName: string,
// public fullName: string,
// public birthday: string,
// public gender: string[],
// public phoneNumber: string,
// public document: string,
// public email: string,

export const CustomerSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  birthday: {
    type: String,
    required: true,
    trim: true,
  },
  gender: [
    {
      type: String,
      required: true,
      enum: ['M', 'F'],
    },
  ],
  phoneNumber: {
    type: String,
    required: true,
    trim: true,
  },
  document: {
    type: String,
    required: true,
    trim: true,
    index: {
      unique: true,
    },
  },
  userName: {
    type: String,
    required: true,
    trim: true,
    index: {
      unique: true,
    },
  },
  email: {
    type: String,
    required: true,
    trim: true,
    index: {
      unique: true,
    },
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});
