import { PostNotFoundError } from '../../domain/errors/post-errors.js';
import { postEvent } from '../../domain/events/post-events.js';
import { postResponse } from '../dto/post-response.js';
export class UpdatePost { constructor({ postRepository, eventPublisher }) { Object.assign(this, { postRepository, eventPublisher }); } async execute({ id, actorId, title, content }) { const post = await this.postRepository.findById(id); if (!post) throw new PostNotFoundError(); post.update({ title, content }, actorId); await this.postRepository.save(post); await this.eventPublisher.publish(postEvent('PostUpdated', { postId: post.id.value, authorId: post.authorId, title: post.title })); return postResponse(post); } }
