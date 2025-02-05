import { PostService, postsService } from '../services/posts.service';
import { IPost, IPostDTO } from '../typings/user';

class PostController {
  constructor(private postsService: PostService) {}
  async getPosts(): Promise<IPostDTO[]> {
    const posts = await this.postsService.getPosts();
    return posts;
  }

  async createPost({ userId, title, content }: IPost): Promise<IPostDTO> {
    if (!title || !content) {
      throw new Error('Title and Content are missing');
    }
    let result = await this.postsService.createPost({ userId, title, content });
    return result;
  }
}

const postController = new PostController(postsService);
export { postController };
