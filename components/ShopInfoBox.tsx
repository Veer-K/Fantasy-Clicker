import React from 'react';
import type { WeatherEvent, Area } from '../types';

interface ShopInfoBoxProps {
  username: string;
  gems: number;
  energy: number;
  energyMultiplier: number;
  gemMultiplier: number;
  activeWeatherEvents: WeatherEvent[];
  currentArea: Area;
}

export const ShopInfoBox: React.FC<ShopInfoBoxProps> = ({
  username,
  gems,
  energy,
  energyMultiplier,
  gemMultiplier,
  activeWeatherEvents,
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

  const shopBoxStyle: React.CSSProperties = {
    backgroundColor: `rgba(15, 23, 42, 0.95)`,
    border: `2px solid ${worldInfo.borderColor}`,
    borderRadius: '16px',
    padding: '1.5rem',
    height: '100%',
    boxShadow: `0 8px 32px rgba(0, 0, 0, 0.4), 0 0 20px ${worldInfo.primaryColor}30`,
    backdropFilter: 'blur(15px)',
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto'
  };

  const headerStyle: React.CSSProperties = {
    color: worldInfo.primaryColor,
    fontSize: '1.2rem',
    fontWeight: '600',
    marginBottom: '1rem',
    textAlign: 'center',
    borderBottom: `2px solid ${worldInfo.primaryColor}40`,
    paddingBottom: '0.75rem'
  };

  const worldHeaderStyle: React.CSSProperties = {
    color: worldInfo.textColor,
    fontSize: '1rem',
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: '1rem',
    opacity: 0.9
  };

  const sectionStyle: React.CSSProperties = {
    marginBottom: '1.5rem',
    padding: '1rem',
    backgroundColor: worldInfo.backgroundColor,
    borderRadius: '10px',
    border: `1px solid ${worldInfo.primaryColor}30`
  };

  const sectionTitleStyle: React.CSSProperties = {
    color: worldInfo.primaryColor,
    fontSize: '1rem',
    fontWeight: '600',
    marginBottom: '0.75rem',
    borderBottom: `1px solid ${worldInfo.primaryColor}30`,
    paddingBottom: '0.5rem'
  };

  const statRowStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '0.75rem',
    fontSize: '1rem'
  };

  const labelStyle: React.CSSProperties = {
    color: worldInfo.textColor,
    fontWeight: '500',
    opacity: 0.9
  };

  const valueStyle: React.CSSProperties = {
    color: worldInfo.textColor,
    fontWeight: '600',
    fontSize: '1.1rem'
  };

  const multiplierStyle: React.CSSProperties = {
    color: worldInfo.secondaryColor,
    fontWeight: '600',
    fontSize: '1.1rem'
  };

  const weatherEventStyle: React.CSSProperties = {
    backgroundColor: `${worldInfo.backgroundColor}80`,
    borderRadius: '8px',
    padding: '0.75rem',
    marginBottom: '0.75rem',
    fontSize: '0.9rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    border: `1px solid ${worldInfo.primaryColor}40`
  };

  const weatherEmojiStyle: React.CSSProperties = {
    fontSize: '1.5rem',
    minWidth: '2rem'
  };

  const weatherInfoStyle: React.CSSProperties = {
    flex: 1
  };

  const weatherNameStyle: React.CSSProperties = {
    color: worldInfo.textColor,
    fontWeight: '600',
    fontSize: '1rem',
    marginBottom: '0.25rem'
  };

  const weatherDescStyle: React.CSSProperties = {
    color: worldInfo.textColor,
    fontSize: '0.8rem',
    opacity: 0.8,
    marginBottom: '0.25rem'
  };

  const weatherStatsStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '0.8rem'
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
    <div style={shopBoxStyle}>
      {/* Header */}
      <div style={worldHeaderStyle}>
        {worldInfo.emoji} {worldInfo.world}
      </div>
      
      <div style={headerStyle}>👤 {username}</div>
      
      {/* Current Area */}
      <div style={{
        ...sectionStyle,
        marginBottom: '1.5rem'
      }}>
        <div style={sectionTitleStyle}>📍 Current Location</div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <div style={{ 
              color: worldInfo.textColor, 
              fontSize: '1rem',
              fontWeight: '600',
              marginBottom: '0.25rem'
            }}>
              {currentArea.name}
            </div>
            <div style={{ 
              color: worldInfo.textColor, 
              fontSize: '0.8rem',
              opacity: 0.7
            }}>
              {currentArea.description}
            </div>
          </div>
          <div style={{ 
            color: worldInfo.secondaryColor, 
            fontSize: '1.2rem',
            fontWeight: '600',
            minWidth: 'fit-content',
            marginLeft: '1rem'
          }}>
            #{currentArea.id}
          </div>
        </div>
      </div>

      {/* Resources */}
      <div style={sectionStyle}>
        <div style={sectionTitleStyle}>💰 Resources</div>
        <div style={statRowStyle}>
          <span style={labelStyle}>💎 Gems:</span>
          <span style={valueStyle}>{formatNumber(gems)}</span>
        </div>
        <div style={statRowStyle}>
          <span style={labelStyle}>⚡ Energy:</span>
          <span style={valueStyle}>{formatNumber(energy)}</span>
        </div>
      </div>

      {/* Multipliers */}
      <div style={sectionStyle}>
        <div style={sectionTitleStyle}>⚡ Multipliers</div>
        <div style={statRowStyle}>
          <span style={labelStyle}>Energy Mult:</span>
          <span style={multiplierStyle}>{formatMultiplier(energyMultiplier)}x</span>
        </div>
        <div style={statRowStyle}>
          <span style={labelStyle}>Gem Mult:</span>
          <span style={multiplierStyle}>{formatMultiplier(gemMultiplier)}x</span>
        </div>
      </div>

      {/* Weather Events */}
      <div style={{ ...sectionStyle, flex: 1 }}>
        <div style={sectionTitleStyle}>
          🌟 Weather Events
          {activeWeatherEvents.length > 0 && (
            <span style={{ 
              fontSize: '0.8rem', 
              color: worldInfo.secondaryColor,
              marginLeft: '0.5rem'
            }}>
              ({activeWeatherEvents.length} active)
            </span>
          )}
        </div>
        
        <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
          {activeWeatherEvents.length > 0 ? (
            activeWeatherEvents.map(event => (
              <div key={event.id} style={weatherEventStyle}>
                <div style={weatherEmojiStyle}>{event.emoji}</div>
                <div style={weatherInfoStyle}>
                  <div style={weatherNameStyle}>{event.name}</div>
                  <div style={weatherDescStyle}>{event.description}</div>
                  <div style={weatherStatsStyle}>
                    <span style={weatherBonusStyle}>
                      +{((event.multiplierBonus - 1) * 100).toFixed(0)}% bonus
                    </span>
                    <span style={{ 
                      color: worldInfo.textColor, 
                      opacity: 0.7,
                      fontSize: '0.75rem'
                    }}>
                      ⏱️ {getTimeRemaining(event)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div style={{
              textAlign: 'center',
              padding: '2rem',
              color: worldInfo.textColor,
              opacity: 0.7
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🌤️</div>
              <div style={{ fontSize: '1rem' }}>Clear Skies</div>
              <div style={{ fontSize: '0.8rem', marginTop: '0.5rem' }}>
                Weather events provide temporary bonuses to your multipliers
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};