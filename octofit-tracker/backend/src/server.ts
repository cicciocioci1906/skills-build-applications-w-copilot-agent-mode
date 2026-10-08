import express from 'express';
import './config/database.js';
import { User } from './models/user.js';
import { Team } from './models/team.js';
import { Activity } from './models/activity.js';
import { Leaderboard } from './models/leaderboard.js';
import { Workout } from './models/workout.js';

const app = express();
const port = Number(process.env.PORT || 8000);
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

app.use(express.json());

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', apiBaseUrl });
});

app.get('/api/users/', async (_request, response) => {
  const users = await User.find().sort({ createdAt: -1 });
  response.json(users);
});

app.post('/api/users/', async (request, response) => {
  const user = await User.create(request.body);
  response.status(201).json(user);
});

app.get('/api/teams/', async (_request, response) => {
  const teams = await Team.find().populate('members').sort({ createdAt: -1 });
  response.json(teams);
});

app.post('/api/teams/', async (request, response) => {
  const team = await Team.create(request.body);
  response.status(201).json(team);
});

app.get('/api/activities/', async (_request, response) => {
  const activities = await Activity.find().populate('user').sort({ date: -1 });
  response.json(activities);
});

app.post('/api/activities/', async (request, response) => {
  const activity = await Activity.create(request.body);
  response.status(201).json(activity);
});

app.get('/api/leaderboard/', async (_request, response) => {
  const leaderboard = await Leaderboard.find().populate('user').populate('team').sort({ score: -1 });
  response.json(leaderboard);
});

app.post('/api/leaderboard/', async (request, response) => {
  const entry = await Leaderboard.create(request.body);
  response.status(201).json(entry);
});

app.get('/api/workouts/', async (_request, response) => {
  const workouts = await Workout.find().sort({ createdAt: -1 });
  response.json(workouts);
});

app.post('/api/workouts/', async (request, response) => {
  const workout = await Workout.create(request.body);
  response.status(201).json(workout);
});

export function startServer() {
  return app.listen(port, () => {
    console.log(`OctoFit Tracker API listening on port ${port}`);
    console.log(`API base URL: ${apiBaseUrl}`);
  });
}

export default app;
