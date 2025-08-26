import React from 'react';
import type { InventoryItem, Rarity } from '../types';

interface ItemDisplayProps {
  item: InventoryItem;
  onClick?: () => void;
  showQuantity?: boolean;
  showMultipliers?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const getRarityColor = (rarity: Rarity): string => {
  switch (rarity) {
    case 'Common': return '#9ca3af';
    case 'Uncommon': return '#10b981';
    case 'Rare': return '#3b82f6';
    case 'Epic': return '#8b5cf6';
    case 'Legendary': return '#f59e0b';
    case 'Mythic': return '#ef4444';
    case 'Secret': return '#ec4899';
    default: return '#9ca3af';
  }
};

const getRarityGlow = (rarity: Rarity): string => {
  const color = getRarityColor(rarity);
  return `0 0 10px ${color}40`;
};

export const ItemDisplay: React.FC<ItemDisplayProps> = ({
  item,
  onClick,
  showQuantity = false,
  showMultipliers = true,
  className = '',
  style = {}
}) => {
  const itemStyle: React.CSSProperties = {
    border: `2px solid ${getRarityColor(item.rarity)}`,
    borderRadius: '12px',
    padding: '1rem',
    backgroundColor: 'rgba(45, 90, 135, 0.7)',
    cursor: onClick ? 'pointer' : 'default',
    transition: 'all 0.3s ease',
    boxShadow: getRarityGlow(item.rarity),
    position: 'relative',
    ...style
  };

  const titleStyle: React.CSSProperties = {
    color: getRarityColor(item.rarity),
    fontSize: '1.1rem',
    fontWeight: '600',
    marginBottom: '0.5rem',
    textShadow: item.rarity === 'Secret' ? `0 0 10px ${getRarityColor(item.rarity)}` : 'none'
  };

  const categoryStyle: React.CSSProperties = {
    color: '#94a3b8',
    fontSize: '0.8rem',
    marginBottom: '0.25rem'
  };

  const descriptionStyle: React.CSSProperties = {
    color: '#e2e8f0',
    fontSize: '0.85rem',
    marginBottom: '0.75rem',
    lineHeight: '1.4'
  };

  const statsStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '0.8rem',
    color: '#4fc3f7'
  };

  const mutationBadgeStyle: React.CSSProperties = {
    position: 'absolute',
    top: '0.5rem',
    right: '0.5rem',
    backgroundColor: 'rgba(236, 72, 153, 0.8)',
    color: 'white',
    padding: '0.25rem 0.5rem',
    borderRadius: '12px',
    fontSize: '0.7rem',
    fontWeight: '600'
  };

  const goldBadgeStyle: React.CSSProperties = {
    position: 'absolute',
    top: '0.5rem',
    left: '0.5rem',
    backgroundColor: 'rgba(245, 158, 11, 0.8)',
    color: 'white',
    padding: '0.25rem 0.5rem',
    borderRadius: '12px',
    fontSize: '0.7rem',
    fontWeight: '600'
  };

  const rainbowBadgeStyle: React.CSSProperties = {
    position: 'absolute',
    top: item.isGold ? '2.5rem' : '0.5rem',
    left: '0.5rem',
    background: 'linear-gradient(45deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #9400d3)',
    color: 'white',
    padding: '0.25rem 0.5rem',
    borderRadius: '12px',
    fontSize: '0.7rem',
    fontWeight: '600'
  };

  const quantityBadgeStyle: React.CSSProperties = {
    position: 'absolute',
    bottom: '0.5rem',
    right: '0.5rem',
    backgroundColor: 'rgba(79, 195, 247, 0.8)',
    color: 'white',
    padding: '0.25rem 0.5rem',
    borderRadius: '12px',
    fontSize: '0.7rem',
    fontWeight: '600'
  };

  return (
    <div
      className={className}
      style={itemStyle}
      onClick={onClick}
    >
      {item.isGold && <div style={goldBadgeStyle}>GOLD</div>}
      {item.isRainbow && <div style={rainbowBadgeStyle}>🌈</div>}
      {item.mutations && item.mutations.length > 0 && (
        <div style={mutationBadgeStyle}>⚡ {item.mutations.length}</div>
      )}
      {showQuantity && item.quantity > 1 && (
        <div style={quantityBadgeStyle}>x{item.quantity}</div>
      )}
      
      <div style={categoryStyle}>{item.category} • {item.rarity}</div>
      <div style={titleStyle}>{item.name}</div>
      <div style={descriptionStyle}>{item.description}</div>
      
      {showMultipliers && (
        <div style={statsStyle}>
          <span>⚡ {item.energyMultiplier.toFixed(2)}x</span>
          <span>💎 {item.gemMultiplier.toFixed(2)}x</span>
        </div>
      )}
    </div>
  );
};