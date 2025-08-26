import React from 'react';

interface CardProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
  style?: React.CSSProperties;
  headerStyle?: React.CSSProperties;
}

export const Card: React.FC<CardProps> = ({
  children,
  title,
  className = '',
  style = {},
  headerStyle = {}
}) => {
  const cardStyle: React.CSSProperties = {
    backgroundColor: 'rgba(26, 54, 93, 0.95)',
    borderRadius: '15px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
    border: '2px solid #ff8c42',
    padding: '1.5rem',
    margin: '1rem 0',
    ...style
  };

  const titleStyle: React.CSSProperties = {
    color: '#ff8c42',
    fontSize: '1.5rem',
    fontWeight: '700',
    margin: '0 0 1rem 0',
    textAlign: 'center',
    borderBottom: '1px solid rgba(255, 140, 66, 0.3)',
    paddingBottom: '1rem',
    ...headerStyle
  };

  return (
    <div className={className} style={cardStyle}>
      {title && <h2 style={titleStyle}>{title}</h2>}
      {children}
    </div>
  );
};