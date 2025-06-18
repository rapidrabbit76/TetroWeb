import React from 'react';
import { Tetromino, TETROMINO_SHAPES, COLORS } from '../types/tetris';
import styles from './NextBlock.module.css';

interface NextBlockProps {
  piece: Tetromino | null;
}

export const NextBlock: React.FC<NextBlockProps> = ({ piece }) => {
  if (!piece) return null;

  const shape = TETROMINO_SHAPES[piece.type];

  return (
    <div className={styles.nextBlock}>
      {shape.map((row: number[], y: number) => (
        <div key={y} className={styles.row}>
          {row.map((cell, x) => (
            <div
              key={`${x}-${y}`}
              className={styles.cell}
              style={{
                backgroundColor: cell ? COLORS[piece.type] : 'transparent',
                borderColor: cell ? COLORS[piece.type] : 'transparent'
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}; 