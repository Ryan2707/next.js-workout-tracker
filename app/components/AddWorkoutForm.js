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

    setTitle('');
    setReps('');
    setLoad('');
    router.refresh();
  }

  return (
    <div style={{
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-lg)',
      padding: '1.75rem',
      marginBottom: '2rem',
      boxShadow: 'var(--shadow-sm)',
    }}>
      <h3 style={{
        fontFamily: 'var(--font-display)',
        fontSize: '1.5rem',
        fontWeight: 500,
        color: 'var(--text)',
        marginBottom: '1.25rem',
        lineHeight: 1.1,
      }}>
        Workout toevoegen
      </h3>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {error && <div className="form-error">{error}</div>}

        <div className="form-row">
          <div className="form-group">
            <label>Oefening</label>
            <input
              type="text"
              placeholder="bijv. Push Day"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Reps</label>
            <input
              type="number"
              placeholder="10"
              value={reps}
              onChange={(e) => setReps(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Gewicht (kg)</label>
            <input
              type="number"
              placeholder="50"
              value={load}
              onChange={(e) => setLoad(e.target.value)}
            />
          </div>
        </div>

        <div>
          <button type="submit" className="btn-add">
            + Toevoegen
          </button>
        </div>
      </form>
    </div>
  );
}