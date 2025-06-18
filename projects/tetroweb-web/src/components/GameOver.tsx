'use client';

import React from 'react';
import styles from './GameOver.module.css';

interface GameOverProps {
  score: number;
  onRestart: () => void;
}

export const GameOver: React.FC<GameOverProps> = ({ score, onRestart }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <h2>게임 오버!</h2>
        <p>최종 점수: {score}</p>
        <button onClick={onRestart} className={styles.button}>
          다시 시작
        </button>
      </div>
    </div>
  );
}; 