/**
 * Routes
 */
import express from 'express';
import { getStats, getStatus } from '../controllers/AppController.js';

const router = express.Router();

router.get('/status', (req, res, next) => {
  res.send({
		"redis":  getStats,
		"db": getStatus
	});
});

module.exports = router;
