import { Schema, model, Types, ObjectId } from 'mongoose';
import { IPost } from '../typings/user';

interface IPostDocument extends IPost, Document {}

const postSchema = new Schema<IPostDocument>({
  userId: { type: Types.ObjectId, ref: 'User', required: true },
  title: { type: String },
  content: { type: String },
});

const Post = model<IPostDocument>('Post', postSchema);
export { Post, IPostDocument };
