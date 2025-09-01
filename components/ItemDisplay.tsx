import React from 'react';
import type { InventoryItem, Rarity } from '../types';

interface ItemDisplayProps {
  item: InventoryItem;
  onClick?: () => void;
  onEquip?: () => void;
  onUnequip?: () => void;
  isEquipped?: boolean;
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

const getItemWorld = (itemId: number): { world: number, emoji: string, color: string } => {
  if (itemId < 43) {
    return { world: 1, emoji: '🌱', color: '#22c55e' };
  } else {
    return { world: 2, emoji: '🌌', color: '#8b5cf6' };
  }
};

export const ItemDisplay: React.FC<ItemDisplayProps> = ({
  item,
  onClick,
  onEquip,
  onUnequip,
  isEquipped = false,
  showQuantity = false,
  showMultipliers = true,
  className = '',
  style = {}
}) => {
  const itemStyle: React.CSSProperties = {
    border: `2px solid ${isEquipped ? '#22c55e' : getRarityColor(item.rarity)}`,
    borderRadius: '12px',
    padding: '1rem',
    paddingBottom: (onEquip || onUnequip) ? '3rem' : '1rem',
    backgroundColor: isEquipped 
      ? 'rgba(34, 197, 94, 0.15)' 
      : 'rgba(45, 90, 135, 0.7)',
    cursor: onClick ? 'pointer' : 'default',
    transition: 'all 0.3s ease',
    boxShadow: isEquipped 
      ? '0 0 15px rgba(34, 197, 94, 0.4)' 
      : getRarityGlow(item.rarity),
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

  const worldInfo = getItemWorld(item.id);
  const worldBadgeStyle: React.CSSProperties = {
    position: 'absolute',
    top: item.mutations && item.mutations.length > 0 ? '2.5rem' : '0.5rem',
    right: '0.5rem',
    backgroundColor: `${worldInfo.color}CC`,
    color: 'white',
    padding: '0.25rem 0.5rem',
    borderRadius: '12px',
    fontSize: '0.7rem',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem',
    border: `1px solid ${worldInfo.color}`
  };

  const formatMultiplier = (num: number): string => {
    if (num >= 1e66) return (num / 1e66).toFixed(1) + 'UVi';   // Unvigintillion
    if (num >= 1e63) return (num / 1e63).toFixed(1) + 'Vi';    // Vigintillion
    if (num >= 1e60) return (num / 1e60).toFixed(1) + 'NoD';   // Novemdecillion
    if (num >= 1e57) return (num / 1e57).toFixed(1) + 'OcD';   // Octodecillion
    if (num >= 1e54) return (num / 1e54).toFixed(1) + 'SpD';   // Septendecillion
    if (num >= 1e51) return (num / 1e51).toFixed(1) + 'SxD';   // Sexdecillion
    if (num >= 1e48) return (num / 1e48).toFixed(1) + 'QuiD';  // Quindecillion
    if (num >= 1e45) return (num / 1e45).toFixed(1) + 'QuaD';  // Quattuordecillion
    if (num >= 1e42) return (num / 1e42).toFixed(1) + 'Td';    // Tredecillion
    if (num >= 1e39) return (num / 1e39).toFixed(1) + 'Dd';    // Duodecillion
    if (num >= 1e36) return (num / 1e36).toFixed(1) + 'Ud';    // Undecillion
    if (num >= 1e33) return (num / 1e33).toFixed(1) + 'Dc';    // Decillion
    if (num >= 1e30) return (num / 1e30).toFixed(1) + 'No';    // Nonillion
    if (num >= 1e27) return (num / 1e27).toFixed(1) + 'Oc';    // Octillion
    if (num >= 1e24) return (num / 1e24).toFixed(1) + 'Sp';    // Septillion
    if (num >= 1e21) return (num / 1e21).toFixed(1) + 'Sx';    // Sextillion
    if (num >= 1e18) return (num / 1e18).toFixed(1) + 'Qi';    // Quintillion
    if (num >= 1e15) return (num / 1e15).toFixed(1) + 'Qa';    // Quadrillion
    if (num >= 1e12) return (num / 1e12).toFixed(1) + 'T';     // Trillion
    if (num >= 1e9) return (num / 1e9).toFixed(1) + 'B';       // Billion
    if (num >= 1e6) return (num / 1e6).toFixed(1) + 'M';       // Million
    if (num >= 1e3) return (num / 1e3).toFixed(1) + 'K';       // Thousand
    if (num >= 100) return num.toFixed(0);
    return num.toFixed(2);
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
      
      {/* World Indicator */}
      <div style={worldBadgeStyle}>
        <span>{worldInfo.emoji}</span>
        <span>W{worldInfo.world}</span>
      </div>
      
      {/* Equipped Badge */}
      {isEquipped && (
        <div style={{
          position: 'absolute',
          bottom: '0.5rem',
          left: '0.5rem',
          backgroundColor: 'rgba(34, 197, 94, 0.9)',
          color: 'white',
          padding: '0.25rem 0.5rem',
          borderRadius: '12px',
          fontSize: '0.7rem',
          fontWeight: '600'
        }}>
          ✅ EQUIPPED
        </div>
      )}
      
      <div style={categoryStyle}>{item.category} • {item.rarity}</div>
      <div style={titleStyle}>{item.name}</div>
      <div style={descriptionStyle}>{item.description}</div>
      
      {showMultipliers && (
        <div style={statsStyle}>
          <span>⚡ {formatMultiplier(item.energyMultiplier)}x</span>
          <span>💎 {formatMultiplier(item.gemMultiplier)}x</span>
        </div>
      )}
      
      {/* Equip Button */}
      {(onEquip || onUnequip) && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            isEquipped ? onUnequip?.() : onEquip?.();
          }}
          style={{
            position: 'absolute',
            bottom: '0.5rem',
            right: '0.5rem',
            padding: '0.25rem 0.75rem',
            backgroundColor: isEquipped ? '#ef4444' : '#22c55e',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            fontSize: '0.7rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = '0.8';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = '1';
          }}
        >
          {isEquipped ? '❌ Unequip' : '✅ Equip'}
        </button>
      )}
    </div>
  );
};