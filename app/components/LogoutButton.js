// components/LogoutButton.js
'use client';
 
import { signOut } from 'next-auth/react';
 
export default function LogoutButton() {
  return (
    <button
      className="nav-logout"
      onClick={() => signOut({ callbackUrl: '/login' })}
    >
      Uitloggen
    </button>
  );
}