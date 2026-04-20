// app/page.js
import Link from 'next/link';

export default function Home() {
  return (
    <div className="app-main">
      <div className="page-header">
        <p className="page-eyebrow">Welkom</p>
        <h1 className="page-title">Workout Tracker</h1>
        <p className="page-subtitle">
          Houd je trainingen bij en monitor je voortgang.
        </p>
      </div>
      <Link href="/workouts" className="btn-add">
        Bekijk alle workouts →
      </Link>
    </div>
  );
}