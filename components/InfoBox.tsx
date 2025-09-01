import React from 'react';
import type { WeatherEvent, Area } from '../types';

interface InfoBoxProps {
  username: string;
  gems: number;
  energy: number;
  energyMultiplier: number;
  gemMultiplier: number;
  activeWeatherEvents: WeatherEvent[];
  currentArea: Area;
  onSave?: () => void;
  onLogout?: () => void;
}

export const InfoBox: React.FC<InfoBoxProps> = ({
  username,
  gems,
  energy,
  energyMultiplier,
  gemMultiplier,
  activeWeatherEvents,
  currentArea,
  onSave,
  onLogout
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

  // Function to determine if background is light or dark for adaptive text colors
  const isLightBackground = (background: string): boolean => {
    // Extract colors from gradient or solid color
    const colorMatch = background.match(/#[0-9a-f]{6}/gi);
    if (!colorMatch || colorMatch.length === 0) return false;
    
    // Use the first color in the gradient to determine lightness
    const hex = colorMatch[0];
    const r = parseInt(hex.substr(1, 2), 16);
    const g = parseInt(hex.substr(3, 2), 16);
    const b = parseInt(hex.substr(5, 2), 16);
    
    // Calculate relative luminance
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.6;
  };

  const isLight = isLightBackground(currentArea.background);
  const adaptiveTextColor = isLight ? '#1f2937' : '#f8fafc';
  const adaptiveLabelColor = isLight ? '#374151' : '#e2e8f0';

  const infoBoxStyle: React.CSSProperties = {
    position: 'fixed',
    top: '5rem', // Moved down to avoid overlapping with notifications
    right: '1rem',
    background: currentArea.background,
    border: `2px solid ${worldInfo.borderColor}`,
    borderRadius: '12px',
    padding: '1rem',
    minWidth: '300px',
    maxWidth: '350px',
    boxShadow: `0 8px 32px rgba(0, 0, 0, 0.4), 0 0 20px ${worldInfo.primaryColor}30`,
    backdropFilter: 'blur(15px)',
    zIndex: 999 // Lower than notifications
  };

  const headerStyle: React.CSSProperties = {
    color: worldInfo.primaryColor,
    fontSize: '1rem',
    fontWeight: '600',
    marginBottom: '0.75rem',
    textAlign: 'center',
    borderBottom: `1px solid ${worldInfo.primaryColor}40`,
    paddingBottom: '0.5rem'
  };

  const worldHeaderStyle: React.CSSProperties = {
    color: adaptiveTextColor,
    fontSize: '0.8rem',
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: '0.5rem',
    opacity: 0.9
  };

  const statRowStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '0.5rem',
    fontSize: '0.85rem'
  };

  const labelStyle: React.CSSProperties = {
    color: adaptiveLabelColor,
    fontWeight: '500',
    opacity: 0.8
  };

  const valueStyle: React.CSSProperties = {
    color: adaptiveTextColor,
    fontWeight: '600'
  };

  const multiplierStyle: React.CSSProperties = {
    color: worldInfo.secondaryColor,
    fontWeight: '600'
  };

  const weatherSectionStyle: React.CSSProperties = {
    marginTop: '1rem',
    paddingTop: '0.75rem',
    borderTop: `1px solid ${worldInfo.primaryColor}40`
  };

  const weatherTitleStyle: React.CSSProperties = {
    color: worldInfo.primaryColor,
    fontSize: '0.85rem',
    fontWeight: '600',
    marginBottom: '0.5rem'
  };

  const weatherEventStyle: React.CSSProperties = {
    backgroundColor: `${worldInfo.backgroundColor}`,
    borderRadius: '6px',
    padding: '0.4rem 0.6rem',
    marginBottom: '0.4rem',
    fontSize: '0.75rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    border: `1px solid ${worldInfo.primaryColor}30`
  };

  const weatherEmojiStyle: React.CSSProperties = {
    fontSize: '0.9rem'
  };

  const weatherNameStyle: React.CSSProperties = {
    color: adaptiveTextColor,
    flex: 1,
    opacity: 0.9
  };

  const weatherBonusStyle: React.CSSProperties = {
    color: worldInfo.secondaryColor,
    fontWeight: '600'
  };

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

  const getTimeRemaining = (event: WeatherEvent): string => {
    const remaining = Math.max(0, (event.startTime + event.duration) - Date.now());
    const minutes = Math.floor(remaining / 60000);
    const seconds = Math.floor((remaining % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div style={infoBoxStyle}>
      {/* World Information */}
      <div style={worldHeaderStyle}>
        {worldInfo.emoji} {worldInfo.world}
      </div>
      
      <div style={headerStyle}>👤 {username}</div>
      
      {/* Current Area */}
      <div style={{
        ...statRowStyle,
        marginBottom: '1rem',
        padding: '0.5rem',
        backgroundColor: worldInfo.backgroundColor,
        borderRadius: '6px',
        border: `1px solid ${worldInfo.primaryColor}30`
      }}>
        <div style={{ flex: 1 }}>
          <div style={{ 
            color: worldInfo.primaryColor, 
            fontSize: '0.8rem', 
            fontWeight: '600',
            marginBottom: '0.2rem'
          }}>
            Current Area
          </div>
          <div style={{ 
            color: adaptiveTextColor, 
            fontSize: '0.75rem',
            opacity: 0.9
          }}>
            {currentArea.name}
          </div>
        </div>
        <div style={{ 
          color: worldInfo.secondaryColor, 
          fontSize: '0.7rem',
          fontWeight: '600'
        }}>
          #{currentArea.id}
        </div>
      </div>
      
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

      {/* Weather Events */}
      {activeWeatherEvents.length > 0 && (
        <div style={weatherSectionStyle}>
          <div style={weatherTitleStyle}>🌟 Active Weather</div>
          {activeWeatherEvents.map(event => (
            <div key={event.id} style={weatherEventStyle}>
              <span style={weatherEmojiStyle}>{event.emoji}</span>
              <span style={weatherNameStyle}>{event.name}</span>
              <span style={weatherBonusStyle}>
                {event.multiplierBonus.toFixed(1)}x
              </span>
              <span style={{ color: '#94a3b8', fontSize: '0.7rem' }}>
                {getTimeRemaining(event)}
              </span>
            </div>
          ))}
        </div>
      )}

      {activeWeatherEvents.length === 0 && (
        <div style={weatherSectionStyle}>
          <div style={weatherTitleStyle}>🌤️ Weather</div>
          <div style={{ 
            color: adaptiveTextColor, 
            fontSize: '0.75rem', 
            textAlign: 'center',
            opacity: 0.7
          }}>
            Clear skies
          </div>
        </div>
      )}

      {/* Action Buttons */}
      {(onSave || onLogout) && (
        <div style={{
          marginTop: '1rem',
          paddingTop: '1rem',
          borderTop: `1px solid ${worldInfo.primaryColor}30`,
          display: 'flex',
          justifyContent: 'center',
          gap: '0.5rem'
        }}>
          {onSave && (
            <button
              onClick={onSave}
              style={{
                backgroundColor: 'rgba(34, 197, 94, 0.2)',
                border: '1px solid #22c55e',
                borderRadius: '6px',
                color: '#22c55e',
                fontSize: '0.75rem',
                fontWeight: '600',
                padding: '0.4rem 0.8rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(34, 197, 94, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(34, 197, 94, 0.2)';
              }}
            >
              💾 Save
            </button>
          )}
          {onLogout && (
            <button
              onClick={onLogout}
              style={{
                backgroundColor: 'rgba(239, 68, 68, 0.2)',
                border: '1px solid #ef4444',
                borderRadius: '6px',
                color: '#ef4444',
                fontSize: '0.75rem',
                fontWeight: '600',
                padding: '0.4rem 0.8rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.2)';
              }}
            >
              🚪 Logout
            </button>
          )}
        </div>
      )}
    </div>
  );
};