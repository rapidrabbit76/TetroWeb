import { BlockType, TetrominoType, Position, Tetromino } from '../types/tetris';
import { GAME_SETTINGS, TETROMINO_SHAPES, INITIAL_POSITION } from '../constants/tetris';

export const createBoard = (): TetrominoType[][] => (
  Array(GAME_SETTINGS.BOARD_HEIGHT).fill(null)
    .map(() => Array(GAME_SETTINGS.BOARD_WIDTH).fill(null))
);

export const createRandomPiece = (): Tetromino => {
  const types = Object.keys(TETROMINO_SHAPES) as BlockType[];
  return {
    type: types[Math.floor(Math.random() * types.length)],
    position: { ...INITIAL_POSITION },
    rotation: 0
  };
};

export const rotateMatrix = (matrix: readonly (readonly number[])[]): number[][] => {
  const N = matrix.length;
  const M = matrix[0].length;
  const rotated = Array(M).fill(0).map(() => Array(N).fill(0));

  for (let y = 0; y < N; y++) {
    for (let x = 0; x < M; x++) {
      rotated[x][N - 1 - y] = matrix[y][x];
    }
  }

  return rotated;
};

export const getRotatedShape = (piece: Tetromino): number[][] => {
  const shape = TETROMINO_SHAPES[piece.type];
  let rotated = shape.map(row => [...row]);
  for (let i = 0; i < piece.rotation; i++) {
    rotated = rotateMatrix(rotated) as (0 | 1)[][];
  }

  return rotated;
};

export const isValidMove = (
  piece: Tetromino,
  board: TetrominoType[][],
): boolean => {
  const shape = getRotatedShape(piece);
  return shape.every((row, dy) =>
    row.every((cell, dx) => {
      if (cell === 0) return true;
      const newX = piece.position.x + dx;
      const newY = piece.position.y + dy;
      return (
        newX >= 0 &&
        newX < GAME_SETTINGS.BOARD_WIDTH &&
        newY >= 0 &&
        newY < GAME_SETTINGS.BOARD_HEIGHT &&
        !board[newY][newX]
      );
    })
  );
};

export const calculateDropPosition = (
  piece: Tetromino,
  board: TetrominoType[][],
): Position => {
  let ghostY = piece.position.y;

  while (isValidMove(
    { ...piece, position: { ...piece.position, y: ghostY + 1 } },
    board
  )) {
    ghostY++;
  }

  return { x: piece.position.x, y: ghostY };
};

export const calculateGameSpeed = (score: number): number => {
  return Math.max(
    GAME_SETTINGS.MIN_SPEED,
    GAME_SETTINGS.BASE_SPEED - Math.floor(score / 1000) * GAME_SETTINGS.SPEED_FACTOR
  );
};

export const checkGameOver = (board: TetrominoType[][]): boolean => {
  return board[0].some(cell => cell !== null) || board[1].some(cell => cell !== null);
};

export const calculateScore = (clearedLines: number, level: number): number => {
  return clearedLines * GAME_SETTINGS.POINTS_PER_LINE * level;
};

export const calculateLevel = (score: number): number => {
  return Math.floor(score / (GAME_SETTINGS.POINTS_PER_LINE * GAME_SETTINGS.LINES_PER_LEVEL)) + 1;
}; 