import { ObjectId } from 'mongoose';
import { IPostDocument, Post } from '../db/Post.model';

import { IPost, IPostDTO } from '../typings/user';

export class PostService {
  async getPosts(): Promise<IPostDTO[]> {
    const posts = await Post.find({}).populate(
      'userId',
      'id name email avatar',
    );
    return posts.map(this.toDomain);
  }

  async createPost({ userId, title, content }: IPost): Promise<IPostDTO> {
    const newPost = new Post({ userId, title, content });
    const savedPost = await newPost.save();
    return this.toDomain(savedPost);
  }

  private toDomain(post: IPostDocument): IPostDTO {
    return {
      id: post._id as ObjectId,
      title: post.title,
      content: post.content,
      author: {
        id: post.userId._id,
        name: post.userId.name,
        email: post.userId.email,
        avatar: post.userId.avatar,
      },
    };
  }
}

const postsService = new PostService();
export { postsService };
