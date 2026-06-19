import { Schema, model, models } from 'mongoose';

const workoutSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    focus: { type: String, required: true, trim: true },
    difficulty: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      required: true,
    },
    durationMinutes: { type: Number, required: true, min: 1 },
    equipment: { type: [String], default: [] },
    recommendedFor: { type: [String], default: [] },
  },
  { timestamps: true }
);

const Workout = models.Workout ?? model('Workout', workoutSchema);

export default Workout;
