export const queryIssue = ({ page, limit, userId, action, eventType }) => {
  if (page !== undefined && (!/^\d+$/.test(page) || Number(page) < 1)) return 'page must be a positive integer';
  if (limit !== undefined && (!/^\d+$/.test(limit) || Number(limit) < 1 || Number(limit) > 100)) return 'limit must be an integer between 1 and 100';
  for (const value of [userId, action, eventType]) if (value !== undefined && typeof value !== 'string') return 'filters must be strings';
  return null;
};
