'use client';

import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import styles from './Login.module.css';

interface LoginProps {
  onStartGame: (id: string, name: string) => void;
}

export const Login: React.FC<LoginProps> = ({ onStartGame }) => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    setId(nanoid(48));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {

    e.preventDefault();
    if (name.trim()) {
      localStorage.setItem('userId', id);
      localStorage.setItem('userName', name);
      onStartGame(id, name);
    }


  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h1>테트리스</h1>
        <div className={styles.field}>
          <label htmlFor="id">ID</label>
          <input type="text" id="id" value={id} readOnly />
        </div>
        <div className={styles.field}>
          <label htmlFor="name">닉네임</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="닉네임을 입력하세요"
            required
          />
        </div>
        <button type="submit" className={styles.button}>
          게임 시작
        </button>
      </form>
    </div>
  );
}; 