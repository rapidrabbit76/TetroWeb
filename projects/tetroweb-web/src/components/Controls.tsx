'use client';

import React from 'react';
import styles from './Controls.module.css';

interface ControlsProps {
  moveLeft: () => void;
  moveRight: () => void;
  moveDown: () => void;
  rotate: () => void;
  hardDrop: () => void;
}

export const Controls: React.FC<ControlsProps> = ({ moveLeft, moveRight, moveDown, rotate, hardDrop }) => {
  /**
   * 터치 및 클릭 이벤트를 모두 처리합니다.
   * e.preventDefault()를 호출하여 더블 탭으로 인한 확대 등 불필요한 브라우저 기본 동작을 막습니다.
   */
  const handleInteraction = (e: React.SyntheticEvent, action: () => void) => {
    e.preventDefault();
    action();
  };

  return (
    <div className={styles.controlsContainer}>
      <div className={styles.dPad}>
        <button onTouchStart={(e) => handleInteraction(e, moveLeft)} onClick={(e) => handleInteraction(e, moveLeft)} className={styles.button}>좌</button>
        <button onTouchStart={(e) => handleInteraction(e, moveDown)} onClick={(e) => handleInteraction(e, moveDown)} className={styles.button}>하</button>
        <button onTouchStart={(e) => handleInteraction(e, moveRight)} onClick={(e) => handleInteraction(e, moveRight)} className={styles.button}>우</button>
      </div>
      <div className={styles.actionButtons}>
        <button onTouchStart={(e) => handleInteraction(e, hardDrop)} onClick={(e) => handleInteraction(e, hardDrop)} className={`${styles.button} ${styles.hardDrop}`}>즉시 내리기</button>
        <button onTouchStart={(e) => handleInteraction(e, rotate)} onClick={(e) => handleInteraction(e, rotate)} className={`${styles.button} ${styles.rotate}`}>회전</button>
      </div>
    </div>
  );
}; 