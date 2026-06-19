import { Router } from 'express';
import Team from '../models/team';

const teamsRouter = Router();

teamsRouter.get('/', async (_req, res) => {
  try {
    const teams = await Team.find()
      .populate('captain', 'name email')
      .populate('members', 'name email')
      .lean();
    res.status(200).json({ resource: 'teams', count: teams.length, data: teams });
  } catch {
    res.status(500).json({ resource: 'teams', message: 'Failed to fetch teams' });
  }
});

export default teamsRouter;
