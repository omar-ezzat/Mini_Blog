import { randomUUID } from 'node:crypto';
import { Post } from '../../domain/entities/post.js';
import { postEvent } from '../../domain/events/post-events.js';
import { postResponse } from '../dto/post-response.js';
export class CreatePost {
  constructor({ postRepository, eventPublisher }) { Object.assign(this, { postRepository, eventPublisher }); }
  async execute({ authorId, title, content }) {
    const post = Post.create({ id: randomUUID(), authorId, title, content });
    await this.postRepository.save(post);
    await this.eventPublisher.publish(postEvent('PostCreated', { postId: post.id.value, authorId: post.authorId, title: post.title }));
    return postResponse(post);
  }
}
