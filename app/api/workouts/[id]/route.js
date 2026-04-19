// app/api/workouts/[id]/route.js
import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import connectDB from '../../../../lib/mongodb';
import Workout from '../../../../models/Workout';

// GET /api/workouts/:id — één workout ophalen
export async function GET(request, { params }) {
  await connectDB();

  const { id } = await params;
  const workout = await Workout.findById(id);

  if (!workout) {
    return NextResponse.json(
      { error: 'Workout niet gevonden' },
      { status: 404 }
    );
  }

  return NextResponse.json(workout, { status: 200 });
}

// DELETE /api/workouts/:id — workout verwijderen
export async function DELETE(request, { params }) {
  await connectDB();

  const { id } = await params;
  const workout = await Workout.findByIdAndDelete(id);

  if (!workout) {
    return NextResponse.json(
      { error: 'Workout niet gevonden' },
      { status: 404 }
    );
  }

  revalidatePath('/workouts'); // ← cache legen na verwijderen

  return NextResponse.json(
    { message: 'Workout verwijderd' },
    { status: 200 }
  );
}