// models/Workout.js
import mongoose from 'mongoose';

const workoutSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    reps: {
      type: Number,
      required: true,
    },
    load: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

// Voorkom dat Mongoose het model opnieuw aanmaakt bij hot reload
const Workout = mongoose.models.Workout || mongoose.model('Workout', workoutSchema);

export default Workout;