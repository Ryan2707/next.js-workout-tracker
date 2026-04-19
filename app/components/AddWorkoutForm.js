// app/components/AddWorkoutForm.js
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddWorkoutForm() {
  const [title, setTitle] = useState('');
  const [reps, setReps] = useState('');
  const [load, setLoad] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    const workout = { title, reps: Number(reps), load: Number(load) };

    const res = await fetch('/api/workouts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(workout),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error);
      return;
    }

    // Reset form
    setTitle('');
    setReps('');
    setLoad('');

    router.refresh(); // ← ververs de server data
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Workout Toevoegen</h3>

      <input
        type="text"
        placeholder="Oefening (bijv. Push Day)"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="number"
        placeholder="Reps"
        value={reps}
        onChange={(e) => setReps(e.target.value)}
      />
      <input
        type="number"
        placeholder="Gewicht (kg)"
        value={load}
        onChange={(e) => setLoad(e.target.value)}
      />

      <button type="submit">Toevoegen</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

    </form>
  );
}