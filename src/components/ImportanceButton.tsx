import React from 'react';

interface ImportanceButtonProps {
  onClick: () => void;
}

export const ImportanceButton: React.FC<ImportanceButtonProps> = ({
  onClick,
}) => {
  return (
    <button
      className="abovesaid-importance-button"
      onClick={onClick}
      title="Analyze importance"
    >
      <img
        src="https://hnkjoorxkfuopcjuktsk.supabase.co/storage/v1/object/public/images/Abovesaid.gif"
        alt="Abovesaid"
        className="abovesaid-button-icon"
      />
    </button>
  );
};

