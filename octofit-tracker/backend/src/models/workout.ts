import mongoose from 'mongoose';

const workoutSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    durationMinutes: {
      type: Number,
      required: true,
      min: 10,
    },
    difficulty: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced'],
      default: 'Beginner',
    },
    focus: {
      type: String,
      required: true,
      trim: true,
    },
    coach: {
      type: String,
      default: 'OctoFit Team',
    },
  },
  {
    timestamps: true,
  },
);

export const Workout = mongoose.model('Workout', workoutSchema);
