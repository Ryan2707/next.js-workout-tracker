// app/workouts/page.js
// Server component — haal workouts op via jouw eigen API/db logica

import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import LogoutButton from '../components/LogoutButton';

// Vervang dit met je echte data-ophaal logica
async function getWorkouts(userId) {
  // Voorbeeld: return await Workout.find({ userId }).sort({ date: -1 });
  return [];
}

function formatDate(date) {
  return new Date(date).toLocaleDateString('nl-NL', {
    day: 'numeric',
    month: 'long',
  });
}

const WORKOUT_ICONS = ['🏋️', '💪', '🔥', '⚡', '🎯', '🚀'];
function getIcon(index) {
  return WORKOUT_ICONS[index % WORKOUT_ICONS.length];
}

export default async function WorkoutsPage() {
  const session = await auth();
  if (!session) redirect('/login');

  const workouts = await getWorkouts(session.user.id);

  const thisWeek = workouts.filter((w) => {
    const d = new Date(w.date);
    const now = new Date();
    const weekAgo = new Date(now - 7 * 24 * 60 * 60 * 1000);
    return d >= weekAgo;
  });

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
            Hoi, <strong>{session.user.name?.split(' ')[0]}</strong>
          </span>
          <LogoutButton />
        </div>
      </nav>

      <main className="app-main">
        {/* Paginaheader */}
        <div className="page-header">
          <div className="page-header-row">
            <div>
              <p className="page-eyebrow">Overzicht</p>
              <h1 className="page-title">Mijn workouts</h1>
              <p className="page-subtitle">
                {workouts.length === 0
                  ? 'Voeg je eerste workout toe om te beginnen'
                  : `${workouts.length} workout${workouts.length !== 1 ? 's' : ''} bijgehouden`}
              </p>
            </div>

            <Link href="/workouts/nieuw" className="btn-add">
              + Workout toevoegen
            </Link>
          </div>
        </div>

        {/* Statistieken */}
        {workouts.length > 0 && (
          <div className="stats-row">
            <div className="stat-card">
              <p className="stat-label">Totaal</p>
              <p className="stat-value">{workouts.length}</p>
              <p className="stat-sub">workouts</p>
            </div>
            <div className="stat-card">
              <p className="stat-label">Deze week</p>
              <p className="stat-value">{thisWeek.length}</p>
              <p className="stat-sub">keer getraind</p>
            </div>
            <div className="stat-card">
              <p className="stat-label">Oefeningen</p>
              <p className="stat-value">
                {workouts.reduce((sum, w) => sum + (w.exercises?.length ?? 0), 0)}
              </p>
              <p className="stat-sub">in totaal</p>
            </div>
          </div>
        )}

        {/* Workout lijst */}
        <div className="section-header">
          <span className="section-label">Recente workouts</span>
        </div>

        {workouts.length === 0 ? (
          <div className="empty-state">
            <span className="empty-icon">🏋️</span>
            <h2 className="empty-title">Nog geen workouts</h2>
            <p className="empty-text">
              Voeg je eerste workout toe en begin met het bijhouden van je vooruitgang.
            </p>
            <Link href="/workouts/nieuw" className="btn-add">
              + Eerste workout toevoegen
            </Link>
          </div>
        ) : (
          <div className="workout-list">
            {workouts.map((workout, i) => (
              <Link
                key={workout._id}
                href={`/workouts/${workout._id}`}
                className="workout-card"
              >
                <div className="workout-card-left">
                  <div className="workout-icon">{getIcon(i)}</div>
                  <div className="workout-info">
                    <p className="workout-name">{workout.name}</p>
                    <p className="workout-meta">
                      {formatDate(workout.date)} · {workout.exercises?.length ?? 0} oefening
                      {(workout.exercises?.length ?? 0) !== 1 ? 'en' : ''}
                    </p>
                  </div>
                </div>

                {workout.exercises?.length > 0 && (
                  <span className="workout-badge">
                    {workout.exercises[0].name}
                    {workout.exercises.length > 1 && ` +${workout.exercises.length - 1}`}
                  </span>
                )}

                <span className="workout-arrow">›</span>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}