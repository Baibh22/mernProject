import React from 'react';
import { Cell } from '../types';

interface SquareProps {
  value: Cell;
  onClick: () => void;
  disabled: boolean;
}

export const Square: React.FC<SquareProps> = ({ value, onClick, disabled }) => {
  return (
    <button
      className={`
        w-24 h-24 text-4xl font-bold rounded-lg
        transition-all duration-200
        ${disabled ? 'cursor-not-allowed' : 'hover:bg-gray-200 cursor-pointer'}
        ${value === 'X' ? 'text-blue-600' : 'text-red-600'}
        bg-white shadow-md
      `}
      onClick={onClick}
      disabled={disabled}
    >
      {value}
    </button>
  );
};