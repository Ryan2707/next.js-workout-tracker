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
      router.push('/workouts');
    } else {
      setDeleting(false);
    }
  }

  return (
    <button className="btn-danger" onClick={handleDelete} disabled={deleting}>
      {deleting ? 'Verwijderen…' : 'Verwijder workout'}
    </button>
  );
}