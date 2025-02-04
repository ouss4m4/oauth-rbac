import { Schema, model, Document } from 'mongoose';
import { IUserDomain } from '../typings/user';

interface IUserDocument extends IUserDomain, Document {
  passwordHash: string;
}

const userSchema = new Schema<IUserDocument>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  avatar: String,
  role: { type: String, enum: ['Admin', 'Editor', 'User'], default: 'User' },
  googleId: { type: String, unique: true, sparse: true },
  githubId: { type: String, unique: true, sparse: true },
  passwordHash: { type: String },
});

const User = model<IUserDocument>('User', userSchema);
export { User, IUserDocument };
