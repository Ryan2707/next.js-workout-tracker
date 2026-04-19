// app/components/RegisterForm.js
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error);
      return;
    }

    // Account aangemaakt — stuur door naar inlogpagina
    router.push('/login');
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto' }}>
      <h1>Account aanmaken</h1>

      <div>
        <label>Naam</label>
        <input
          type="text"
          placeholder="Jouw naam"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div>
        <label>E-mailadres</label>
        <input
          type="email"
          placeholder="naam@voorbeeld.nl"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Wachtwoord</label>
        <input
          type="password"
          placeholder="Minimaal 6 tekens"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <button type="submit">Account aanmaken</button>

      <p>Al een account? <Link href="/login">Inloggen</Link></p>
    </form>
  );
}