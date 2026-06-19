import { Router } from 'express';
import Activity from '../models/activity';

const activitiesRouter = Router();

activitiesRouter.get('/', async (_req, res) => {
  try {
    const activities = await Activity.find()
      .populate('user', 'name email')
      .sort({ performedAt: -1 })
      .lean();
    res.status(200).json({
      resource: 'activities',
      count: activities.length,
      data: activities,
    });
  } catch {
    res.status(500).json({ resource: 'activities', message: 'Failed to fetch activities' });
  }
});

export default activitiesRouter;
