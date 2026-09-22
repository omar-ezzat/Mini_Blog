import { queryIssue } from '../validators/activity-validators.js';
export const activityController = ({ getActivities }) => ({ list: async (req, res, next) => { const issue = queryIssue(req.query); if (issue) return res.status(400).json({ error: issue }); try { return res.json(await getActivities.execute(req.query)); } catch (error) { return next(error); } } });
