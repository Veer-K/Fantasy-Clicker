import React from 'react';
import type { Area } from '../types';

interface MiniInfoBoxProps {
  username: string;
  gems: number;
  energy: number;
  energyMultiplier: number;
  gemMultiplier: number;
  currentArea: Area;
}

export const MiniInfoBox: React.FC<MiniInfoBoxProps> = ({
  username,
  gems,
  energy,
  energyMultiplier,
  gemMultiplier,
  currentArea
}) => {
  // Determine world and theme based on area ID
  const getWorldInfo = (areaId: number) => {
    if (areaId <= 20) {
      return {
        world: "Basic World",
        emoji: "🌱",
        primaryColor: "#22c55e",
        secondaryColor: "#4ade80",
        backgroundColor: "rgba(34, 197, 94, 0.15)",
        borderColor: "#22c55e",
        textColor: "#dcfce7"
      };
    } else {
      return {
        world: "Ethereal Realms",
        emoji: "🌌",
        primaryColor: "#8b5cf6",
        secondaryColor: "#a78bfa",
        backgroundColor: "rgba(139, 92, 246, 0.15)",
        borderColor: "#8b5cf6",
        textColor: "#ede9fe"
      };
    }
  };

  const worldInfo = getWorldInfo(currentArea.id);

  const formatNumber = (num: number): string => {
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
    return num.toLocaleString();
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

  const miniBoxStyle: React.CSSProperties = {
    backgroundColor: `rgba(15, 23, 42, 0.95)`,
    border: `2px solid ${worldInfo.borderColor}`,
    borderRadius: '12px',
    padding: '1rem',
    boxShadow: `0 4px 16px rgba(0, 0, 0, 0.3), 0 0 10px ${worldInfo.primaryColor}20`,
    backdropFilter: 'blur(10px)'
  };

  const headerStyle: React.CSSProperties = {
    color: worldInfo.primaryColor,
    fontSize: '0.9rem',
    fontWeight: '600',
    marginBottom: '0.75rem',
    textAlign: 'center',
    borderBottom: `1px solid ${worldInfo.primaryColor}30`,
    paddingBottom: '0.5rem'
  };

  const statRowStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '0.5rem',
    fontSize: '0.8rem'
  };

  const labelStyle: React.CSSProperties = {
    color: worldInfo.textColor,
    fontWeight: '500',
    opacity: 0.8
  };

  const valueStyle: React.CSSProperties = {
    color: worldInfo.textColor,
    fontWeight: '600'
  };

  const multiplierStyle: React.CSSProperties = {
    color: worldInfo.secondaryColor,
    fontWeight: '600'
  };

  return (
    <div style={miniBoxStyle}>
      <div style={headerStyle}>{worldInfo.emoji} {username}</div>
      
      {/* Resources */}
      <div style={statRowStyle}>
        <span style={labelStyle}>💎 Gems:</span>
        <span style={valueStyle}>{formatNumber(gems)}</span>
      </div>
      
      <div style={statRowStyle}>
        <span style={labelStyle}>⚡ Energy:</span>
        <span style={valueStyle}>{formatNumber(energy)}</span>
      </div>

      {/* Multipliers */}
      <div style={statRowStyle}>
        <span style={labelStyle}>Energy Mult:</span>
        <span style={multiplierStyle}>{formatMultiplier(energyMultiplier)}x</span>
      </div>
      
      <div style={statRowStyle}>
        <span style={labelStyle}>Gem Mult:</span>
        <span style={multiplierStyle}>{formatMultiplier(gemMultiplier)}x</span>
      </div>
    </div>
  );
};