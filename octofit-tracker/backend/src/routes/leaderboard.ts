import { Router } from 'express';
import Leaderboard from '../models/leaderboard';

const leaderboardRouter = Router();

leaderboardRouter.get('/', async (_req, res) => {
  try {
    const leaderboard = await Leaderboard.find()
      .populate('entries.user', 'name email')
      .sort({ generatedAt: -1 })
      .lean();
    res.status(200).json({
      resource: 'leaderboard',
      count: leaderboard.length,
      data: leaderboard,
    });
  } catch {
    res.status(500).json({ resource: 'leaderboard', message: 'Failed to fetch leaderboard' });
  }
});

export default leaderboardRouter;
