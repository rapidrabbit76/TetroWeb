import React, { useEffect, useCallback } from 'react';
import { TetrisBoard } from './TetrisBoard';
import { NextBlock } from './NextBlock';
import { GameOver } from './GameOver';
import { Controls } from './Controls';
import { useTetris } from '../hooks/useTetris';
import styles from './Tetris.module.css';
import { User } from '../types/tetris';

interface TetrisProps {
  user: User;
}

export const Tetris: React.FC<TetrisProps> = ({ user }) => {
  const {
    board,
    score,
    level,
    isGameOver,
    nextPiece,
    moveLeft,
    moveRight,
    moveDown,
    rotate,
    hardDrop,
    resetGame,
  } = useTetris(user);

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (isGameOver) return;

    switch (event.key) {
      case 'ArrowLeft':
        moveLeft();
        break;
      case 'ArrowRight':
        moveRight();
        break;
      case 'ArrowDown':
        moveDown();
        break;
      case 'ArrowUp':
        rotate();
        break;
      case ' ':
        event.preventDefault();
        hardDrop();
        break;
    }
  }, [moveLeft, moveRight, moveDown, rotate, hardDrop, isGameOver]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  useEffect(() => {
    if (!isGameOver) {
      const gameLoop = setInterval(() => {
        moveDown();
      }, 1000);

      return () => {
        clearInterval(gameLoop);
      };
    }
  }, [moveDown, isGameOver]);

  return (
    <div className={styles.container}>
      <div className={styles.gameInfo}>
        <h1>{user.name}님의 테트리스</h1>
        <p>점수: {score}</p>
        <p>레벨: {level}</p>
      </div>
      <div className={styles.gameArea}>
        <div className={styles.nextBlockArea}>
          <h2>다음 블록</h2>
          <NextBlock piece={nextPiece} />
        </div>
        <TetrisBoard board={board} />
      </div>
      <div className={styles.keyboardControls}>
        <p>조작 방법:</p>
        <ul>
          <li>← → : 좌우 이동</li>
          <li>↓ : 아래로 이동</li>
          <li>↑ : 회전</li>
          <li>스페이스바 : 즉시 떨어뜨리기</li>
        </ul>
      </div>
      {isGameOver && <GameOver score={score} onRestart={resetGame} />}
      <Controls 
        moveLeft={moveLeft}
        moveRight={moveRight}
        moveDown={moveDown}
        rotate={rotate}
        hardDrop={hardDrop}
      />
    </div>
  );
}; 