// app/page.js
import Link from 'next/link';

export default function Home() {
  return (
    <div className="app-layout">
      <main className="app-main">
        <div className="page-header">
          <p className="page-eyebrow">Welkom terug</p>
          <h1 className="page-title">Workout Tracker</h1>
          <p className="page-subtitle">Houd je trainingen bij en bereik je fitnessdoelen</p>
        </div>

        <div className="stats-row">
          <div className="stat-card">
            <p className="stat-label">Totaal workouts</p>
            <p className="stat-value">—</p>
            <p className="stat-sub">Nog geen data</p>
          </div>
          <div className="stat-card">
            <p className="stat-label">Deze week</p>
            <p className="stat-value">—</p>
            <p className="stat-sub">Start vandaag</p>
          </div>
          <div className="stat-card">
            <p className="stat-label">Oefeningen</p>
            <p className="stat-value">—</p>
            <p className="stat-sub">Voeg je eerste toe</p>
          </div>
        </div>

        <div className="section-header">
          <span className="section-label">Snelle acties</span>
        </div>

        <div className="workout-list">
          <Link href="/workouts" className="workout-card">
            <div className="workout-card-left">
              <div className="workout-icon">🏋️</div>
              <div className="workout-info">
                <p className="workout-name">Bekijk alle workouts</p>
                <p className="workout-meta">Je trainingsgeschiedenis</p>
              </div>
            </div>
            <span className="workout-arrow">→</span>
          </Link>

          <Link href="/login" className="workout-card">
            <div className="workout-card-left">
              <div className="workout-icon">🔐</div>
              <div className="workout-info">
                <p className="workout-name">Inloggen</p>
                <p className="workout-meta">Toegang tot je account</p>
              </div>
            </div>
            <span className="workout-arrow">→</span>
          </Link>

          <Link href="/register" className="workout-card">
            <div className="workout-card-left">
              <div className="workout-icon">✨</div>
              <div className="workout-info">
                <p className="workout-name">Account aanmaken</p>
                <p className="workout-meta">Start met tracken</p>
              </div>
            </div>
            <span className="workout-arrow">→</span>
          </Link>
        </div>
      </main>
    </div>
  );
}