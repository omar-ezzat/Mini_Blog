export class InvalidPostDataError extends Error { constructor(message = 'Post title and content are required') { super(message); this.name = 'InvalidPostDataError'; } }
export class PostNotFoundError extends Error { constructor() { super('Post was not found'); this.name = 'PostNotFoundError'; } }
export class UnauthorizedPostModificationError extends Error { constructor() { super('Only the author may modify this post'); this.name = 'UnauthorizedPostModificationError'; } }
