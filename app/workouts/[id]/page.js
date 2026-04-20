// app/workouts/[id]/page.js
import { notFound } from 'next/navigation';
import Link from 'next/link';
import DeleteButton from '../../components/DeleteButton';

async function getWorkout(id) {
  const res = await fetch(`http://localhost:3000/api/workouts/${id}`, {
    cache: 'no-store',
  });

  if (res.status === 404) {
    notFound(); // Stopt de render en toont app/not-found.js
  }

  if (!res.ok) {
    throw new Error('Ophalen workout mislukt');
  }

  return res.json();
}

export default async function WorkoutDetailPage({ params }) {
  const { id } = await params;
  const workout = await getWorkout(id);

  return (
    <main>
      <Link href="/workouts">← Terug naar overzicht</Link>

      <h1>{workout.title}</h1>
      <p>Reps: {workout.reps}</p>
      <p>Gewicht: {workout.load}kg</p>
      <p>Aangemaakt: {new Date(workout.createdAt).toLocaleDateString('nl-NL')}</p>

      <DeleteButton id={workout._id} />
    </main>
  );
}