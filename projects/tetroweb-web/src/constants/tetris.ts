export const GAME_SETTINGS = {
  BOARD_WIDTH: 10,
  BOARD_HEIGHT: 20,
  BASE_SPEED: 1000,
  MIN_SPEED: 100,
  SPEED_FACTOR: 50,
  POINTS_PER_LINE: 100,
  LINES_PER_LEVEL: 10,
} as const;

export const TETROMINO_SHAPES = {
  I: [[1, 1, 1, 1]],
  J: [[1, 0, 0], [1, 1, 1]],
  L: [[0, 0, 1], [1, 1, 1]],
  O: [[1, 1], [1, 1]],
  S: [[0, 1, 1], [1, 1, 0]],
  T: [[0, 1, 0], [1, 1, 1]],
  Z: [[1, 1, 0], [0, 1, 1]],
} as const;

export const COLORS = {
  I: '#00f0f0',
  J: '#0000f0',
  L: '#f0a000',
  O: '#f0f000',
  S: '#00f000',
  T: '#a000f0',
  Z: '#f00000',
  ghost: 'rgba(255, 255, 255, 0.2)',
} as const;

export const INITIAL_POSITION = {
  x: Math.floor(GAME_SETTINGS.BOARD_WIDTH / 2) - 1,
  y: 0,
} as const; 