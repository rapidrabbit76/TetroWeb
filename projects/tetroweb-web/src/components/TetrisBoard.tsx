import React from 'react';
import { TetrominoType, COLORS } from '../types/tetris';
import styles from './TetrisBoard.module.css';

interface TetrisBoardProps {
  board: (TetrominoType | null)[][];
}

export const TetrisBoard: React.FC<TetrisBoardProps> = ({ board }) => {
  return (
    <div className={styles.board}>
      {board.map((row, y) => (
        <div key={y} className={styles.row}>
          {row.map((cell, x) => (
            <div
              key={`${x}-${y}`}
              className={`${styles.cell} ${!cell ? styles.empty : ''} ${cell === 'ghost' ? styles.ghost : ''}`}
              style={{
                backgroundColor: cell && cell !== 'ghost' ? COLORS[cell] : '#000000',
                borderColor: cell && cell !== 'ghost' ? COLORS[cell] : '#333333'
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}; 