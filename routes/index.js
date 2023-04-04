/**
 * Routes
 */
import express from 'express';
import { getStats, getStatus } from '../controllers/AppController';
import postNew from '../controllers/UsersController';

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

router.post('/users', async (req, res) => {
  const {email, password } = req.body;
  if (!email) {
    res.status(400);
    res.json({"error": "Missing email"});
  }
  if (!password){
    res.status(400);
    res.json({"error": "Missing password"});
  }
  const data = await postNew(req.body);
  if (data.status === 400) {
    res.status(data.status);
    res.json({"error": "Already exist"})
  }
  if (data.status === 201){
    res.status(data.status);
    console.log(data.message)
    res.json({"email": email, "id": data.id});
  }
})

module.exports = router;
