import express from 'express';
import activitiesRouter from './routes/activities';
import { connectDatabase } from './database';
import leaderboardRouter from './routes/leaderboard';
import teamsRouter from './routes/teams';
import usersRouter from './routes/users';
import workoutsRouter from './routes/workouts';

const app = express();
const port = 8000;
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;

app.use(express.json());

app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);

app.get('/api/health', (_req, res) => {
  res.status(200).json({ status: 'ok', baseUrl });
});

async function startServer() {
  try {
    await connectDatabase();
    app.listen(port, () => {
      console.log(`Backend running on ${baseUrl}`);
    });
  } catch (error) {
    console.error('Failed to start backend:', error);
    process.exit(1);
  }
}

startServer();
