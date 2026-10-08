import mongoose from 'mongoose';
import { Activity } from '../models/activity.js';
import { Leaderboard } from '../models/leaderboard.js';
import { Team } from '../models/team.js';
import { User } from '../models/user.js';
import { Workout } from '../models/workout.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');
    console.log('Seed the octofit_db database with test data');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.insertMany([
      {
        username: 'maria_fit',
        email: 'maria@example.com',
        name: 'Maria Chen',
        fitnessLevel: 'Advanced',
        goals: ['Marathon prep', 'Mobility'],
      },
      {
        username: 'liam_runs',
        email: 'liam@example.com',
        name: 'Liam Brooks',
        fitnessLevel: 'Intermediate',
        goals: ['5K improvement', 'Strength'],
      },
      {
        username: 'noah_cycle',
        email: 'noah@example.com',
        name: 'Noah Patel',
        fitnessLevel: 'Beginner',
        goals: ['Cycling endurance', 'Cardio'],
      },
    ]);

    const team = await Team.create({
      name: 'Velocity Squad',
      description: 'Competitive fitness training team',
      members: users.map((user) => user._id),
    });

    await Activity.insertMany([
      {
        user: users[0]._id,
        type: 'Running',
        durationMinutes: 45,
        caloriesBurned: 540,
        date: new Date('2026-10-01T07:00:00Z'),
      },
      {
        user: users[1]._id,
        type: 'Strength',
        durationMinutes: 50,
        caloriesBurned: 620,
        date: new Date('2026-10-02T18:30:00Z'),
      },
      {
        user: users[2]._id,
        type: 'Cycling',
        durationMinutes: 35,
        caloriesBurned: 410,
        date: new Date('2026-10-03T06:15:00Z'),
      },
    ]);

    await Leaderboard.insertMany([
      {
        user: users[0]._id,
        team: team._id,
        score: 980,
        rank: 1,
      },
      {
        user: users[1]._id,
        team: team._id,
        score: 920,
        rank: 2,
      },
      {
        user: users[2]._id,
        team: team._id,
        score: 860,
        rank: 3,
      },
    ]);

    await Workout.insertMany([
      {
        name: 'HIIT Burn',
        category: 'Cardio',
        durationMinutes: 30,
        difficulty: 'Intermediate',
        focus: 'Interval conditioning',
        coach: 'Coach Rivera',
      },
      {
        name: 'Core Stability Flow',
        category: 'Strength',
        durationMinutes: 25,
        difficulty: 'Beginner',
        focus: 'Core control and posture',
        coach: 'Coach Lee',
      },
      {
        name: 'Hill Sprint Challenge',
        category: 'Endurance',
        durationMinutes: 40,
        difficulty: 'Advanced',
        focus: 'Explosive acceleration',
        coach: 'Coach Thompson',
      },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
