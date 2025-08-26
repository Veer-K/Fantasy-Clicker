import React from 'react';

interface InputProps {
  type?: 'text' | 'password' | 'number';
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const Input: React.FC<InputProps> = ({
  type = 'text',
  value,
  onChange,
  onKeyPress,
  placeholder = '',
  disabled = false,
  className = '',
  style = {}
}) => {
  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.75rem',
    margin: '0.5rem 0',
    backgroundColor: 'rgba(45, 90, 135, 0.8)',
    border: '2px solid #4fc3f7',
    borderRadius: '8px',
    color: '#e2e8f0',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
    ...style
  };

  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      onKeyPress={onKeyPress}
      placeholder={placeholder}
      disabled={disabled}
      className={className}
      style={inputStyle}
    />
  );
};