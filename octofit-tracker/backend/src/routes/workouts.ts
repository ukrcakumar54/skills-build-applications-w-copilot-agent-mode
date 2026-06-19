import { Router } from 'express';
import Workout from '../models/workout';

const workoutsRouter = Router();

workoutsRouter.get('/', async (_req, res) => {
  try {
    const workouts = await Workout.find().sort({ createdAt: -1 }).lean();
    res.status(200).json({ resource: 'workouts', count: workouts.length, data: workouts });
  } catch {
    res.status(500).json({ resource: 'workouts', message: 'Failed to fetch workouts' });
  }
});

export default workoutsRouter;
