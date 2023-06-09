/**
 * Routes
 */
import express from 'express';
import { getStats, getStatus } from '../controllers/AppController';
import UsersController from '../controllers/UsersController';
import AuthController from '../controllers/AuthController';
import FilesController from '../controllers/FilesController';
import { xTokenAuthenticate, basicAuthenticate } from '../middlewares/auth';

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
  const { users, files } = await getStats();
  res.status(200);
  res.json({
    users,
    files,
  });
});

router.post('/users', UsersController.postNew);
router.get('/connect', basicAuthenticate, AuthController.getConnect);

router.get('/users/me', xTokenAuthenticate, UsersController.getMe);

router.get('/disconnect', xTokenAuthenticate, AuthController.getDisconnect);
router.post('/files', xTokenAuthenticate, FilesController.postUpload);

module.exports = router;
