// app/api/register/route.js
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectDB from '../../../lib/mongodb';
import User from '../../../models/User';

export async function POST(request) {
  const { name, email, password } = await request.json();

  // Validatie
  if (!name || !email || !password) {
    return NextResponse.json(
      { error: 'Vul alle velden in' },
      { status: 400 }
    );
  }

  if (password.length < 6) {
    return NextResponse.json(
      { error: 'Wachtwoord moet minimaal 6 tekens zijn' },
      { status: 400 }
    );
  }

  await connectDB();

  // Check of email al bestaat
  const exists = await User.findOne({ email });
  if (exists) {
    return NextResponse.json(
      { error: 'Dit e-mailadres is al in gebruik' },
      { status: 400 }
    );
  }

  // Wachtwoord hashen voor opslag
  const hashedPassword = await bcrypt.hash(password, 10);

  await User.create({ name, email, password: hashedPassword });

  return NextResponse.json(
    { message: 'Account aangemaakt' },
    { status: 201 }
  );
}