// app/workouts/[id]/page.js
import { notFound } from 'next/navigation';
import Link from 'next/link';
import DeleteButton from '../../components/DeleteButton';

async function getWorkout(id) {
  const res = await fetch(`http://localhost:3000/api/workouts/${id}`, {
    cache: 'no-store',
  });

  if (res.status === 404) {
    notFound();
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
    <div className="app-main">
      <Link href="/workouts" className="detail-back">
        ← Terug naar overzicht
      </Link>

      <div className="detail-header">
        <span className="detail-date-badge">
          {new Date(workout.createdAt).toLocaleDateString('nl-NL')}
        </span>
        <h1 className="detail-title">{workout.title}</h1>
        <div className="detail-stats">
          <span className="detail-stat">
            <span className="detail-stat-icon">🔁</span>
            {workout.reps} reps
          </span>
          <span className="detail-stat">
            <span className="detail-stat-icon">⚖️</span>
            {workout.load} kg
          </span>
        </div>
      </div>

      <div className="detail-actions">
        <Link href="/workouts" className="btn-secondary">
          ← Terug
        </Link>
        <DeleteButton id={workout._id} />
      </div>
    </div>
  );
}