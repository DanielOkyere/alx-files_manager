/**
 * Routes
 */
import express from 'express';
import { getStats, getStatus } from '../controllers/AppController';

const router = express.Router();

router.get('/status', (req, res) => {
  const { redis, mongo } = getStatus();
  res.status(200);
  res.json({
    redis,
    db: mongo,
  });
});

router.get('/stats', async (req, res) => {
  const { users, files} = await getStats();
  res.status(200);
  res.json({
    "users": users,
    "files": files,
  });
});

module.exports = router;
