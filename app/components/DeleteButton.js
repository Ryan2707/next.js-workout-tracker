// components/DeleteButton.js
'use client';
 
import { useRouter } from 'next/navigation';
import { useState } from 'react';
 
export default function DeleteButton({ workoutId }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
 
  async function handleDelete() {
    if (!confirm('Weet je zeker dat je deze workout wilt verwijderen?')) return;
 
    setLoading(true);
 
    try {
      const res = await fetch(`/api/workouts/${workoutId}`, {
        method: 'DELETE',
      });
 
      if (res.ok) {
        router.push('/workouts');
        router.refresh();
      } else {
        alert('Verwijderen mislukt. Probeer het opnieuw.');
        setLoading(false);
      }
    } catch {
      alert('Kan geen verbinding maken met de server.');
      setLoading(false);
    }
  }
 
  return (
    <button
      className="btn-danger"
      onClick={handleDelete}
      disabled={loading}
    >
      {loading ? 'Verwijderen…' : '🗑 Verwijderen'}
    </button>
  );
}