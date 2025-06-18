import { TETROMINO_SHAPES as TetrominoShapes } from '@/constants/tetris';

export type BlockType = keyof typeof TetrominoShapes;
export type TetrominoType = BlockType | 'ghost' | null;

export interface Position {
  x: number;
  y: number;
}

export interface Tetromino {
  type: BlockType;
  position: Position;
  rotation: number;
}

export interface GameState {
  board: TetrominoType[][];
  currentPiece: Tetromino | null;
  nextPiece: Tetromino | null;
  isGameOver: boolean;
  score: number;
  level: number;
}

export interface GameActions {
  moveDown: () => void;
  moveLeft: () => void;
  moveRight: () => void;
  rotate: () => void;
  hardDrop: () => void;
  resetGame: () => void;
}

export interface User {
  id: string;
  name: string;
}

export interface RankingEntry extends User {
  score: number;
  date: string | number;
}

export const BOARD_WIDTH = 10;
export const BOARD_HEIGHT = 20;
export const TETROMINO_SHAPES: Record<BlockType, number[][]> = {
  I: [[1, 1, 1, 1]],
  J: [[1, 0, 0], [1, 1, 1]],
  L: [[0, 0, 1], [1, 1, 1]],
  O: [[1, 1], [1, 1]],
  S: [[0, 1, 1], [1, 1, 0]],
  T: [[0, 1, 0], [1, 1, 1]],
  Z: [[1, 1, 0], [0, 1, 1]],
};

export const COLORS: Record<BlockType, string> = {
  I: '#00f0f0',
  J: '#0000f0',
  L: '#f0a000',
  O: '#f0f000',
  S: '#00f000',
  T: '#a000f0',
  Z: '#f00000'
};