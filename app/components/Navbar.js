// app/components/Navbar.js
'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

export default function Navbar() {
  const { data: session, status } = useSession();

  // Wacht tot de sessie geladen is — anders zie je een lege navbar
  if (status === 'loading') {
    return (
      <nav style={{ display: 'flex', gap: '16px', padding: '12px 24px', background: 'white', borderBottom: '1px solid #e5e7eb' }}>
        <Link href="/"><strong>Workout Tracker</strong></Link>
      </nav>
    );
  }

  return (
    <nav style={{ display: 'flex', gap: '16px', padding: '12px 24px', background: 'white', borderBottom: '1px solid #e5e7eb' }}>
      <Link href="/"><strong>Workout Tracker</strong></Link>

      {session ? (
        // Ingelogd
        <>
          <Link href="/workouts">Workouts</Link>
          <button onClick={() => signOut({ callbackUrl: '/login' })}>
            Uitloggen
          </button>
        </>
      ) : (
        // Niet ingelogd
        <>
          <Link href="/login">Inloggen</Link>
          <Link href="/register">Registreren</Link>
        </>
      )}
    </nav>
  );
}