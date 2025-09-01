import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';
  className?: string;
  style?: React.CSSProperties;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  disabled = false,
  variant = 'primary',
  size = 'medium',
  className = '',
  style = {}
}) => {
  const getBaseStyles = (): React.CSSProperties => {
    const baseStyles: React.CSSProperties = {
      border: 'none',
      borderRadius: '8px',
      cursor: disabled ? 'not-allowed' : 'pointer',
      fontWeight: '600',
      transition: 'all 0.3s ease',
      textAlign: 'center',
      display: 'inline-block',
      textDecoration: 'none',
      opacity: disabled ? 0.5 : 1,
      ...style
    };

    // Size variants
    switch (size) {
      case 'small':
        baseStyles.padding = '0.5rem 1rem';
        baseStyles.fontSize = '0.85rem';
        break;
      case 'large':
        baseStyles.padding = '1rem 2rem';
        baseStyles.fontSize = '1.1rem';
        break;
      default:
        baseStyles.padding = '0.75rem 1.5rem';
        baseStyles.fontSize = '1rem';
    }

    // Color variants
    switch (variant) {
      case 'secondary':
        baseStyles.backgroundColor = '#4fc3f7';
        baseStyles.color = '#1a365d';
        baseStyles.border = '2px solid #4fc3f7';
        break;
      case 'danger':
        baseStyles.backgroundColor = '#ef4444';
        baseStyles.color = 'white';
        baseStyles.border = '2px solid #ef4444';
        break;
      default:
        baseStyles.backgroundColor = '#ff8c42';
        baseStyles.color = '#1a365d';
        baseStyles.border = '2px solid #ff8c42';
    }

    return baseStyles;
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={className}
      style={getBaseStyles()}
    >
      {children}
    </button>
  );
};