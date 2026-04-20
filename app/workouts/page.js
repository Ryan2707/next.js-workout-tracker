// app/workouts/page.js
import { auth } from '../../auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import AddWorkoutForm from '../components/AddWorkoutForm';

async function getWorkouts() {
  const res = await fetch('http://localhost:3000/api/workouts', {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Ophalen workouts mislukt');
  }

  return res.json();
}

export default async function WorkoutsPage() {
  const session = await auth();

  // Niet ingelogd → redirect
  if (!session) {
    redirect('/login');
  }

  // Data ophalen (alleen als user ingelogd is)
  const workouts = await getWorkouts();

  return (
    <main>
      <h1>Welkom, {session.user.name}!</h1>

      <AddWorkoutForm />

      {workouts.length === 0 ? (
        <p>Nog geen workouts. Voeg er een toe!</p>
      ) : (
        <ul>
          {workouts.map((workout) => (
            <li key={workout._id}>
              <Link href={`/workouts/${workout._id}`}>
                <strong>{workout.title}</strong>
              </Link>
              {' '}— {workout.reps} reps @ {workout.load}kg
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}