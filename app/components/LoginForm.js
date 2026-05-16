// app/components/LoginForm.js
'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false, // Wij handelen de redirect zelf af
    });

    if (result?.error) {
      setError('Ongeldig e-mailadres of wachtwoord');
      return;
    }

    // Ingelogd! Stuur door naar workouts
    router.push('/workouts');
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto' }}>
      <h1>Inloggen</h1>

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
          placeholder="Jouw wachtwoord"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <button type="submit">InloggeN</button>

      <p>Nog geen account? <Link href="/register">Registreren</Link></p>
    </form>
  );
}