import React from 'react';
import { Board as BoardType, Cell } from '../types';
import { Square } from './Square';

interface BoardProps {
  board: BoardType;
  onCellClick: (index: number) => void;
  disabled: boolean;
}

export const Board: React.FC<BoardProps> = ({ board, onCellClick, disabled }) => {
  return (
    <div className="grid grid-cols-3 gap-2 w-[300px]">
      {board.map((cell: Cell, index: number) => (
        <Square
          key={index}
          value={cell}
          onClick={() => onCellClick(index)}
          disabled={disabled || cell !== null}
        />
      ))}
    </div>
  );
};