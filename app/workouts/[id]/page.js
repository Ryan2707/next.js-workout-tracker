// app/workouts/[id]/page.js

import { auth } from '@/auth';
import { redirect, notFound } from 'next/navigation';
import Link from 'next/link';
import DeleteWorkoutButton from '@/components/DeleteWorkoutButton';

// Vervang dit met je echte data-ophaal logica
async function getWorkout(id, userId) {
  // Voorbeeld: return await Workout.findOne({ _id: id, userId });
  return null;
}

function formatDate(date) {
  return new Date(date).toLocaleDateString('nl-NL', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default async function WorkoutDetailPage({ params }) {
  const session = await auth();
  if (!session) redirect('/login');

  const workout = await getWorkout(params.id, session.user.id);
  if (!workout) notFound();

  const totalSets = workout.exercises?.reduce(
    (sum, ex) => sum + (ex.sets?.length ?? 0),
    0
  ) ?? 0;

  return (
    <div className="app-layout">
      {/* Navigatie */}
      <nav className="app-nav">
        <Link href="/workouts" className="nav-brand">
          <span className="nav-brand-mark">▲</span>
          TRAINEN
        </Link>

        <div className="nav-right">
          <span className="nav-greeting">
            <strong>{session.user.name?.split(' ')[0]}</strong>
          </span>
        </div>
      </nav>

      <main className="app-main">
        {/* Terug knop */}
        <Link href="/workouts" className="detail-back">
          ← Terug naar overzicht
        </Link>

        {/* Workout header */}
        <div className="detail-header">
          <span className="detail-date-badge">{formatDate(workout.date)}</span>
          <h1 className="detail-title">{workout.name}</h1>

          <div className="detail-stats">
            <span className="detail-stat">
              <span className="detail-stat-icon">💪</span>
              {workout.exercises?.length ?? 0} oefeningen
            </span>
            <span className="detail-stat">
              <span className="detail-stat-icon">📋</span>
              {totalSets} sets totaal
            </span>
            {workout.duration && (
              <span className="detail-stat">
                <span className="detail-stat-icon">⏱</span>
                {workout.duration} min
              </span>
            )}
          </div>
        </div>

        {/* Notities */}
        {workout.notes && (
          <div className="notes-card" style={{ marginBottom: '2rem' }}>
            <p className="notes-label">Notities</p>
            <p className="notes-text">{workout.notes}</p>
          </div>
        )}

        {/* Oefeningen */}
        <div className="exercises-section">
          <p className="exercises-section-title">Oefeningen</p>

          {(!workout.exercises || workout.exercises.length === 0) ? (
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem' }}>
              Geen oefeningen gevonden.
            </p>
          ) : (
            <div className="exercises-list">
              {workout.exercises.map((exercise, i) => (
                <div key={i} className="exercise-card">
                  <div className="exercise-card-header">
                    <span className="exercise-name">{exercise.name}</span>
                    <span className="exercise-set-count">
                      {exercise.sets?.length ?? 0} sets
                    </span>
                  </div>

                  {exercise.sets && exercise.sets.length > 0 && (
                    <table className="sets-table">
                      <thead>
                        <tr>
                          <th>Set</th>
                          <th>Gewicht</th>
                          <th>Reps</th>
                          {exercise.sets[0]?.rpe && <th>RPE</th>}
                        </tr>
                      </thead>
                      <tbody>
                        {exercise.sets.map((set, j) => (
                          <tr key={j}>
                            <td>
                              <span className="set-number">{j + 1}</span>
                            </td>
                            <td>{set.weight ? `${set.weight} kg` : '—'}</td>
                            <td>{set.reps ?? '—'}</td>
                            {set.rpe && <td>{set.rpe}</td>}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Acties */}
        <div className="detail-actions">
          <Link href={`/workouts/${workout._id}/bewerken`} className="btn-secondary">
            ✏️ Bewerken
          </Link>
          <DeleteWorkoutButton workoutId={workout._id.toString()} />
        </div>
      </main>
    </div>
  );
}