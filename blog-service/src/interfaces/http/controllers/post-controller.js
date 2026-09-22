import { createIssue, updateIssue } from '../validators/post-validators.js';
export const postController = ({ createPost, getPost, listPosts, updatePost, deletePost }) => ({
  create: async (req, res, next) => { const issue = createIssue(req.body); if (issue) return res.status(400).json({ error: issue }); try { return res.status(201).json(await createPost.execute({ ...req.body, authorId: req.auth.sub })); } catch (error) { return next(error); } },
  get: async (req, res, next) => { try { return res.json(await getPost.execute({ id: req.params.id })); } catch (error) { return next(error); } },
  list: async (req, res, next) => { try { return res.json(await listPosts.execute(req.query)); } catch (error) { return next(error); } },
  update: async (req, res, next) => { const issue = updateIssue(req.body); if (issue) return res.status(400).json({ error: issue }); try { return res.json(await updatePost.execute({ ...req.body, id: req.params.id, actorId: req.auth.sub })); } catch (error) { return next(error); } },
  delete: async (req, res, next) => { try { await deletePost.execute({ id: req.params.id, actorId: req.auth.sub }); return res.status(204).end(); } catch (error) { return next(error); } }
});
