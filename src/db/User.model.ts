import { Schema, model, Document } from 'mongoose';
import { IUserDomain } from '../typings/user';
import bcrypt from 'bcryptjs';
interface IUserDocument extends IUserDomain, Document {
  password: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUserDocument>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  avatar: { type: String },
  role: { type: String, enum: ['Admin', 'Editor', 'User'], default: 'User' },
  googleId: { type: String, unique: true, sparse: true },
  githubId: { type: String, unique: true, sparse: true },
  password: { type: String },
});

userSchema.methods.comparePassword = function (
  candidatePassword: string,
): Promise<boolean> {
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
      if (err) return reject(err);
      resolve(isMatch);
    });
  });
};

const User = model<IUserDocument>('User', userSchema);
export { User, IUserDocument };
