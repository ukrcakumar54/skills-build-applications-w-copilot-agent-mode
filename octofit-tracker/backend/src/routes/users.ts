import { Router } from 'express';
import User from '../models/user';

const usersRouter = Router();

usersRouter.get('/', async (_req, res) => {
  try {
    const users = await User.find().populate('team', 'name city').lean();
    res.status(200).json({ resource: 'users', count: users.length, data: users });
  } catch {
    res.status(500).json({ resource: 'users', message: 'Failed to fetch users' });
  }
});

export default usersRouter;
