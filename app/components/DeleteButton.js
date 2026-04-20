// app/components/DeleteButton.js
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DeleteButton({ id }) {
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    setDeleting(true);

    const res = await fetch(`/api/workouts/${id}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      router.push('/workouts'); // Stuur terug naar overzicht
    } else {
      setDeleting(false); // Fout — zet knop terug
    }
  }

  return (
    <button onClick={handleDelete} disabled={deleting} style={{ color: 'red' }}>
      {deleting ? 'Verwijderen...' : 'Verwijder Workout'}
    </button>
  );
}