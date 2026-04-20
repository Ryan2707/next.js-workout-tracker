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

  if (!session) {
    redirect('/login');
  }

  const workouts = await getWorkouts();

  return (
    <div className="app-main">
      <div className="page-header">
        <div className="page-header-row">
          <div>
            <p className="page-eyebrow">Dashboard</p>
            <h1 className="page-title">Welkom, {session.user.name}!</h1>
            <p className="page-subtitle">Hier zijn al jouw trainingen.</p>
          </div>
        </div>
      </div>

      <div className="stats-row">
        <div className="stat-card">
          <p className="stat-label">Totaal workouts</p>
          <p className="stat-value">{workouts.length}</p>
          <p className="stat-sub">bijgehouden</p>
        </div>
        {workouts.length > 0 && (
          <div className="stat-card">
            <p className="stat-label">Laatste workout</p>
            <p className="stat-value" style={{ fontSize: '1.5rem' }}>
              {workouts[0].title.slice(0, 12)}{workouts[0].title.length > 12 ? '…' : ''}
            </p>
            <p className="stat-sub">
              {new Date(workouts[0].createdAt).toLocaleDateString('nl-NL')}
            </p>
          </div>
        )}
      </div>

      <AddWorkoutForm />

      <div className="section-header">
        <span className="section-label">Workouts ({workouts.length})</span>
      </div>

      {workouts.length === 0 ? (
        <div className="empty-state">
          <span className="empty-icon">🏋️</span>
          <h2 className="empty-title">Nog geen workouts</h2>
          <p className="empty-text">
            Voeg je eerste workout toe met het formulier hierboven.
          </p>
        </div>
      ) : (
        <ul className="workout-list" style={{ listStyle: 'none', padding: 0 }}>
          {workouts.map((workout) => (
            <li key={workout._id}>
              <Link href={`/workouts/${workout._id}`} className="workout-card">
                <div className="workout-card-left">
                  <div className="workout-icon">🏋️</div>
                  <div className="workout-info">
                    <div className="workout-name">{workout.title}</div>
                    <div className="workout-meta">
                      {workout.reps} reps @ {workout.load}kg
                    </div>
                  </div>
                </div>
                <span className="workout-badge">{workout.load}kg</span>
                <span className="workout-arrow">→</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}