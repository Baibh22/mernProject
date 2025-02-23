import { Board, Player } from './types';

export const WINNING_COMBINATIONS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6] // Diagonals
];

export const checkWinner = (board: Board): Player | null => {
  for (const [a, b, c] of WINNING_COMBINATIONS) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
};

export const isBoardFull = (board: Board): boolean => {
  return board.every(cell => cell !== null);
};

export const getComputerMove = (board: Board): number => {
  // First try to win
  const move = findWinningMove(board, 'O');
  if (move !== -1) return move;

  // Then block player's winning move
  const blockMove = findWinningMove(board, 'X');
  if (blockMove !== -1) return blockMove;

  // Take center if available
  if (board[4] === null) return 4;

  // Take corners
  const corners = [0, 2, 6, 8];
  const availableCorners = corners.filter(i => board[i] === null);
  if (availableCorners.length > 0) {
    return availableCorners[Math.floor(Math.random() * availableCorners.length)];
  }

  // Take any available space
  const availableMoves = board.map((cell, index) => cell === null ? index : -1)
    .filter(index => index !== -1);
  return availableMoves[Math.floor(Math.random() * availableMoves.length)];
};

const findWinningMove = (board: Board, player: Player): number => {
  for (let i = 0; i < board.length; i++) {
    if (board[i] === null) {
      const newBoard = [...board];
      newBoard[i] = player;
      if (checkWinner(newBoard) === player) {
        return i;
      }
    }
  }
  return -1;
};