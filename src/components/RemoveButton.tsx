import React from 'react';

interface RemoveButtonProps {
  onClick: () => void;
}

export const RemoveButton: React.FC<RemoveButtonProps> = ({ onClick }) => {
  return (
    <button className="abovesaid-remove-button" onClick={onClick}>
      Remove Highlights
    </button>
  );
};

