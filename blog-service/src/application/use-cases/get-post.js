import { PostNotFoundError } from '../../domain/errors/post-errors.js';
import { postResponse } from '../dto/post-response.js';
export class GetPost { constructor({ postRepository }) { this.postRepository = postRepository; } async execute({ id }) { const post = await this.postRepository.findById(id); if (!post) throw new PostNotFoundError(); return postResponse(post); } }
