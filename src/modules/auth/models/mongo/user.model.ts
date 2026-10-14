import { model, Schema } from 'mongoose';

const userSchema = new Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
  },
  { timestamps: true, versionKey: false },
);

export const UserModel = model('User', userSchema);
