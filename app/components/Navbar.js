// app/components/Navbar.js
'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

export default function Navbar() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <nav className="app-nav">
        <Link href="/" className="nav-brand">
          <span className="nav-brand-mark">▲</span>
          TRAINEN
        </Link>
      </nav>
    );
  }

  return (
    <nav className="app-nav">
      <Link href="/" className="nav-brand">
        <span className="nav-brand-mark">▲</span>
        TRAINEN
      </Link>

      <div className="nav-right">
        {session ? (
          <>
            <span className="nav-greeting">
              Hallo, <strong>{session.user.name}</strong>
            </span>
            <Link href="/workouts" className="btn-secondary" style={{ padding: '0.375rem 0.875rem', fontSize: '0.875rem' }}>
              Workouts
            </Link>
            <button className="nav-logout" onClick={() => signOut({ callbackUrl: '/login' })}>
              Uitloggen
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="btn-secondary" style={{ padding: '0.375rem 0.875rem', fontSize: '0.875rem' }}>
              Inloggen
            </Link>
            <Link href="/register" className="btn-add" style={{ padding: '0.375rem 0.875rem', fontSize: '0.875rem' }}>
              Registreren
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}