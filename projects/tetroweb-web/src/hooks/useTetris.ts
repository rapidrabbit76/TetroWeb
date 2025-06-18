import { useState, useCallback, useEffect } from 'react';
import { TetrominoType, GameState, GameActions, Tetromino, User } from '../types/tetris';
import {
  createBoard,
  createRandomPiece,
  isValidMove,
  calculateDropPosition,
  getRotatedShape,
  checkGameOver,
  calculateScore,
  calculateLevel,
  calculateGameSpeed,
} from '../utils/tetrisUtils';
import { submitScore } from '../utils/ranking';

export const useTetris = (user: User): GameState & GameActions => {
  const [gameState, setGameState] = useState<GameState>({
    board: createBoard(),
    currentPiece: createRandomPiece(),
    nextPiece: createRandomPiece(),
    isGameOver: false,
    score: 0,
    level: 1,
  });

  const updateGameState = useCallback((updates: Partial<GameState>) => {
    setGameState(prev => ({ ...prev, ...updates }));
  }, []);

  const getCurrentBoard = useCallback((): (TetrominoType | null)[][] => {
    const { board, currentPiece } = gameState;
    if (!currentPiece) return board;

    const newBoard = board.map(row => [...row]);
    const shape = getRotatedShape(currentPiece);
    const ghostPosition = calculateDropPosition(currentPiece, board);

    // Draw ghost piece
    shape.forEach((row, dy) => {
      row.forEach((cell, dx) => {
        if (cell === 1) {
          const y = ghostPosition.y + dy;
          const x = ghostPosition.x + dx;
          if (y >= 0 && y < board.length && x >= 0 && x < board[0].length && !newBoard[y][x]) {
            newBoard[y][x] = 'ghost';
          }
        }
      });
    });

    // Draw current piece
    shape.forEach((row, dy) => {
      row.forEach((cell, dx) => {
        if (cell === 1) {
          const y = currentPiece.position.y + dy;
          const x = currentPiece.position.x + dx;
          if (y >= 0 && y < board.length && x >= 0 && x < board[0].length) {
            newBoard[y][x] = currentPiece.type;
          }
        }
      });
    });

    return newBoard;
  }, [gameState]);

  const mergePieceToBoard = useCallback((piece: Tetromino) => {
    const { board, nextPiece, score, level } = gameState;
    const newBoard = board.map(row => [...row]);
    const shape = getRotatedShape(piece);

    shape.forEach((row, dy) => {
      row.forEach((cell, dx) => {
        if (cell === 1) {
          const y = piece.position.y + dy;
          const x = piece.position.x + dx;
          if (y >= 0 && y < board.length) {
            newBoard[y][x] = piece.type;
          }
        }
      });
    });

    if (checkGameOver(newBoard)) {
      updateGameState({ isGameOver: true, board: newBoard });
      submitScore({ ...user, score });

      return;
    }

    // Clear completed lines
    const completedLines = newBoard.filter(row => row.every(cell => cell !== null));
    if (completedLines.length > 0) {
      const remainingLines = newBoard.filter(row => !row.every(cell => cell !== null));
      const newLines = Array(completedLines.length).fill(null)
        .map(() => Array(board[0].length).fill(null));
      
      const newScore = score + calculateScore(completedLines.length, level);
      const newLevel = calculateLevel(newScore);

      updateGameState({
        board: [...newLines, ...remainingLines],
        score: newScore,
        level: newLevel,
      });
    } else {
      updateGameState({ board: newBoard });
    }

    // Set up next piece
    updateGameState({
      currentPiece: nextPiece,
      nextPiece: createRandomPiece(),
    });
  }, [gameState, updateGameState, user]);

  const movePiece = useCallback((dx: number, dy: number) => {
    const { currentPiece, board, isGameOver } = gameState;
    if (!currentPiece || isGameOver) return;

    const newPiece = {
      ...currentPiece,
      position: {
        x: currentPiece.position.x + dx,
        y: currentPiece.position.y + dy
      }
    };

    if (isValidMove(newPiece, board)) {
      updateGameState({ currentPiece: newPiece });
    } else if (dy > 0) {
      mergePieceToBoard(currentPiece);
    }
  }, [gameState, updateGameState, mergePieceToBoard]);

  const moveDown = useCallback(() => movePiece(0, 1), [movePiece]);
  const moveLeft = useCallback(() => movePiece(-1, 0), [movePiece]);
  const moveRight = useCallback(() => movePiece(1, 0), [movePiece]);

  const rotate = useCallback(() => {
    const { currentPiece, board, isGameOver } = gameState;
    if (!currentPiece || isGameOver) return;

    const newPiece = {
      ...currentPiece,
      rotation: (currentPiece.rotation + 1) % 4
    };

    if (isValidMove(newPiece, board)) {
      updateGameState({ currentPiece: newPiece });
    }
  }, [gameState, updateGameState]);

  const hardDrop = useCallback(() => {
    const { currentPiece, board, isGameOver } = gameState;
    if (!currentPiece || isGameOver) return;

    const dropPosition = calculateDropPosition(currentPiece, board);
    const droppedPiece = {
      ...currentPiece,
      position: dropPosition
    };

    updateGameState({ currentPiece: droppedPiece });
    mergePieceToBoard(droppedPiece);
  }, [gameState, updateGameState, mergePieceToBoard]);

  const resetGame = useCallback(() => {
    updateGameState({
      board: createBoard(),
      currentPiece: createRandomPiece(),
      nextPiece: createRandomPiece(),
      isGameOver: false,
      score: 0,
      level: 1,
    });
  }, [updateGameState]);

  // Game loop
  useEffect(() => {
    const { isGameOver, currentPiece, score } = gameState;
    if (!isGameOver && currentPiece) {
      const gameLoop = setInterval(moveDown, calculateGameSpeed(score));
      return () => clearInterval(gameLoop);
    }
  }, [gameState, moveDown]);

  return {
    ...gameState,
    board: getCurrentBoard(),
    moveDown,
    moveLeft,
    moveRight,
    rotate,
    hardDrop,
    resetGame,
  };
}; 