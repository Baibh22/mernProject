import React, { useState, useEffect } from 'react';
import { Board as BoardComponent } from './components/Board';
import { Board, GameState, Player } from './types';
import { checkWinner, getComputerMove, isBoardFull } from './utils';
import { Trophy, RotateCcw } from 'lucide-react';

function App() {
  const [board, setBoard] = useState<Board>(Array(9).fill(null));
  const [gameState, setGameState] = useState<GameState>('playing');
  const [winner, setWinner] = useState<Player | null>(null);
  const [isComputerTurn, setIsComputerTurn] = useState(false);

  useEffect(() => {
    if (isComputerTurn && gameState === 'playing') {
      const timer = setTimeout(() => {
        const moveIndex = getComputerMove(board);
        handleMove(moveIndex);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isComputerTurn, board, gameState]);

  const handleMove = (index: number) => {
    if (board[index] !== null || gameState !== 'playing') return;

    const newBoard = [...board];
    newBoard[index] = isComputerTurn ? 'O' : 'X';
    setBoard(newBoard);

    const winner = checkWinner(newBoard);
    if (winner) {
      setGameState('won');
      setWinner(winner);
    } else if (isBoardFull(newBoard)) {
      setGameState('draw');
    } else {
      setIsComputerTurn(!isComputerTurn);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setGameState('playing');
    setWinner(null);
    setIsComputerTurn(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-2 text-gray-800">
          Tic Tac Toe
        </h1>
        <p className="text-center text-gray-600 mb-6">
          {gameState === 'playing' 
            ? `Current turn: ${isComputerTurn ? 'Computer (O)' : 'You (X)'}`
            : gameState === 'won'
            ? `${winner === 'X' ? 'You won!' : 'Computer won!'}`
            : 'It\'s a draw!'}
        </p>

        <div className="flex justify-center mb-8">
          <BoardComponent
            board={board}
            onCellClick={handleMove}
            disabled={isComputerTurn || gameState !== 'playing'}
          />
        </div>

        {gameState !== 'playing' && (
          <div className="flex justify-center">
            <button
              onClick={resetGame}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg
                hover:bg-blue-700 transition-colors duration-200 font-semibold"
            >
              <RotateCcw size={20} />
              Play Again
            </button>
          </div>
        )}

        {gameState === 'won' && (
          <div className="mt-6 flex justify-center">
            <Trophy className="text-yellow-500 w-12 h-12 animate-bounce" />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;