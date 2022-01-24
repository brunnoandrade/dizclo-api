import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      index: {
        unique: true,
      },
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
    password: {
      type: String,
      required: true,
      trim: true,
    },
    roles: [
      {
        type: String,
        required: true,
        enum: ['customer', 'partner', 'admin'],
        default: 'customer',
      },
    ],
    active: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } },
);
