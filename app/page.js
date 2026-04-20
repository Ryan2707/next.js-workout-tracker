// app/page.js
import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <h1>Workout Tracker</h1>
      <p>
        <Link href="/workouts">Bekijk alle workouts</Link>
      </p>
    </main>
  );
}