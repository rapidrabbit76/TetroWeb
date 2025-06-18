'use client';

import { useState } from 'react';
import { Tetris } from '../components/Tetris';
import { Login } from '../components/Login';
import { User } from '../types/tetris';
import Link from 'next/link';

export default function Home() {
  const [user, setUser] = useState<User | null>(null);

  const handleStartGame = (id: string, name: string) => {
    setUser({ id, name });
  };

  if (!user) {
    return <Login onStartGame={handleStartGame} />;
  }

  return (
    <div>
      <Tetris user={user} />
      <div style={{ position: 'absolute', top: 20, right: 20 }}>
        <Link href="/dashboard" style={{ color: '#61dafb', textDecoration: 'none' }}>
          랭킹 보기
        </Link>
      </div>
    </div>
  );
}
