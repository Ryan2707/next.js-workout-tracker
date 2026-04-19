// app/api/workouts/route.js
import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import connectDB from '../../../lib/mongodb';
import Workout from '../../../models/Workout';

// GET /api/workouts — alle workouts ophalen
export async function GET() {
  await connectDB();

  const workouts = await Workout.find({}).sort({ createdAt: -1 });

  return NextResponse.json(workouts, { status: 200 });
}

// POST /api/workouts — nieuwe workout aanmaken
export async function POST(request) {
  await connectDB();

  const body = await request.json();
  const { title, reps, load } = body;

  // Validatie
  if (!title || !reps || !load) {
    return NextResponse.json(
      { error: 'Vul alle velden in' },
      { status: 400 }
    );
  }

  const workout = await Workout.create({ title, reps, load });

  revalidatePath('/workouts'); // ← cache legen na toevoegen

  return NextResponse.json(workout, { status: 201 });
}