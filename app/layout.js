// app/layout.js
import './globals.css';
import AuthProvider from './components/AuthProvider';
import Navbar from './components/Navbar';

export const metadata = {
  title: 'Workout Tracker',
  description: 'Bijhouden van je workouts',
};

export default function RootLayout({ children }) {
  return (
    <html lang="nl">
      <body>
        <AuthProvider>
          <Navbar />
          <main>{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}