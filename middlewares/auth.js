/**
 * Auth middlewares
 */

import { getUserFromAuthHeader, getUserFromXToken } from '../utils/auth';

export const basicAuthenticate = async (req, res, next) => {
  const user = await getUserFromAuthHeader(req);
  if (!user) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }
  req.user = user;
  next();
};

export const xTokenAuthenticate = async (req, res, next) => {
  const user = await getUserFromXToken(req);
  if (!user) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }
  req.user = user;
  next();
};
