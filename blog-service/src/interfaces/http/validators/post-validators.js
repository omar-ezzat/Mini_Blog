const object = (body) => body && typeof body === 'object';
export const createIssue = (body) => !object(body) || typeof body.title !== 'string' || typeof body.content !== 'string' ? 'Title and content are required strings' : null;
export const updateIssue = (body) => !object(body) || (body.title === undefined && body.content === undefined) || (body.title !== undefined && typeof body.title !== 'string') || (body.content !== undefined && typeof body.content !== 'string') ? 'Provide title and/or content as strings' : null;
