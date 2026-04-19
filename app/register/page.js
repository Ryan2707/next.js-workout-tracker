'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Er is iets misgegaan.');
      } else {
        router.push('/login?registered=1');
      }
    } catch {
      setError('Kan geen verbinding maken met de server.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-brand">
        <span className="brand-mark">▲</span>
        <h1 className="brand-name">TRAINEN</h1>
        <p className="brand-tagline">Jouw workouts, bijgehouden.</p>
      </div>

      <div className="auth-card">
        <div className="auth-header">
          <h2>Account aanmaken</h2>
          <p>Start vandaag met bijhouden</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {error && <div className="form-error">{error}</div>}

          <div className="form-group">
            <label htmlFor="name">Naam</label>
            <input
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              placeholder="Jan Jansen"
              required
              autoComplete="name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">E-mailadres</label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="jij@voorbeeld.nl"
              required
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Wachtwoord</label>
            <input
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Minimaal 8 tekens"
              required
              minLength={8}
              autoComplete="new-password"
            />
          </div>

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Account aanmaken…' : 'Registreren →'}
          </button>
        </form>

        <p className="auth-switch">
          Al een account?{' '}
          <Link href="/login">Inloggen</Link>
        </p>
      </div>
    </div>
  );
}