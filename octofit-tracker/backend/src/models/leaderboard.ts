import mongoose from 'mongoose';

const leaderboardSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    team: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Team',
      required: true,
    },
    score: {
      type: Number,
      required: true,
      default: 0,
    },
    rank: {
      type: Number,
      required: true,
      default: 1,
    },
  },
  {
    timestamps: true,
  },
);

export const Leaderboard = mongoose.model('Leaderboard', leaderboardSchema);
