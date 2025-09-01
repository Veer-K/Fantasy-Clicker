import type { WeatherEvent, WeatherMutation, Rarity, InventoryItem } from '../types';

export const weatherEvents: Omit<WeatherEvent, 'id' | 'startTime' | 'duration'>[] = [
  // Common Weather (60% chance)
  { name: 'Sunny Skies', emoji: '☀️', type: 'light', rarity: 'Common', mutationChance: 1, multiplierBonus: 1.1, rarityBonus: 1.0, description: 'Bright sunshine energizes all equipment' },
  { name: 'Light Rain', emoji: '🌧️', type: 'water', rarity: 'Common', mutationChance: 1, multiplierBonus: 1.15, rarityBonus: 1.0, description: 'Gentle rain cleanses and refreshes gear' },
  { name: 'Cloudy Weather', emoji: '☁️', type: 'wind', rarity: 'Common', mutationChance: 1, multiplierBonus: 1.1, rarityBonus: 1.0, description: 'Overcast skies create mysterious energy' },
  
  // Uncommon Weather (25% chance)
  { name: 'Thunderstorm', emoji: '⛈️', type: 'lightning', rarity: 'Uncommon', mutationChance: 2, multiplierBonus: 1.25, rarityBonus: 1.1, description: 'Lightning charges your equipment with power' },
  { name: 'Heavy Snow', emoji: '🌨️', type: 'ice', rarity: 'Uncommon', mutationChance: 2, multiplierBonus: 1.2, rarityBonus: 1.1, description: 'Frigid air crystallizes magical energy' },
  { name: 'Dense Fog', emoji: '🌫️', type: 'water', rarity: 'Uncommon', mutationChance: 2, multiplierBonus: 1.22, rarityBonus: 1.1, description: 'Mystical mists enhance enchantments' },
  
  // Rare Weather (10% chance)
  { name: 'Aurora Storm', emoji: '🌌', type: 'light', rarity: 'Rare', mutationChance: 5, multiplierBonus: 1.4, rarityBonus: 1.2, description: 'Celestial lights infuse items with cosmic power' },
  { name: 'Solar Flare', emoji: '🌞', type: 'fire', rarity: 'Rare', mutationChance: 4, multiplierBonus: 1.35, rarityBonus: 1.2, description: 'Solar radiation supercharges all equipment' },
  { name: 'Lunar Eclipse', emoji: '🌙', type: 'dark', rarity: 'Rare', mutationChance: 6, multiplierBonus: 1.45, rarityBonus: 1.2, description: 'Dark lunar energy transforms equipment properties' },
  
  // Epic Weather (3% chance)
  { name: 'Meteor Shower', emoji: '☄️', type: 'fire', rarity: 'Epic', mutationChance: 10, multiplierBonus: 1.8, rarityBonus: 1.4, description: 'Cosmic debris grants otherworldly enhancements' },
  { name: 'Dimensional Rift', emoji: '🌀', type: 'dark', rarity: 'Epic', mutationChance: 12, multiplierBonus: 1.9, rarityBonus: 1.4, description: 'Reality tears open, warping item properties' },
  { name: 'Time Distortion', emoji: '⏰', type: 'light', rarity: 'Epic', mutationChance: 8, multiplierBonus: 1.75, rarityBonus: 1.4, description: 'Temporal anomalies accelerate item evolution' },
  
  // Legendary Weather (1.5% chance)
  { name: 'Divine Blessing', emoji: '✨', type: 'light', rarity: 'Legendary', mutationChance: 20, multiplierBonus: 2.5, rarityBonus: 1.8, description: 'Holy radiance blesses all equipment with divine power' },
  { name: 'Void Convergence', emoji: '🕳️', type: 'dark', rarity: 'Legendary', mutationChance: 25, multiplierBonus: 2.8, rarityBonus: 1.8, description: 'The endless void grants items forbidden power' },
  
  // Mythic Weather (0.5% chance)
  { name: 'Reality Storm', emoji: '🌪️', type: 'wind', rarity: 'Mythic', mutationChance: 35, multiplierBonus: 4.0, rarityBonus: 2.5, description: 'The fabric of existence itself reshapes your equipment' },
  { name: 'Genesis Wind', emoji: '💨', type: 'wind', rarity: 'Mythic', mutationChance: 40, multiplierBonus: 4.5, rarityBonus: 2.5, description: 'Primordial forces of creation enhance all items' }
];

export const getWeatherRarityChance = (): Rarity => {
  const rand = Math.random() * 100;
  if (rand < 0.5) return 'Mythic';
  if (rand < 2) return 'Legendary';
  if (rand < 5) return 'Epic';
  if (rand < 15) return 'Rare';
  if (rand < 40) return 'Uncommon';
  return 'Common';
};

export const generateRandomWeatherEvent = (): WeatherEvent => {
  const targetRarity = getWeatherRarityChance();
  const possibleEvents = weatherEvents.filter(event => event.rarity === targetRarity);
  const selectedEvent = possibleEvents[Math.floor(Math.random() * possibleEvents.length)];
  
  return {
    id: Math.random().toString(36).substr(2, 9),
    startTime: Date.now(),
    duration: 300000, // 5 minutes
    ...selectedEvent
  };
};

export const generateWeatherForecast = (count: number = 3): Omit<WeatherEvent, 'id' | 'startTime' | 'duration'>[] => {
  const forecast: Omit<WeatherEvent, 'id' | 'startTime' | 'duration'>[] = [];
  
  for (let i = 0; i < count; i++) {
    const targetRarity = getWeatherRarityChance();
    const possibleEvents = weatherEvents.filter(event => event.rarity === targetRarity);
    const selectedEvent = possibleEvents[Math.floor(Math.random() * possibleEvents.length)];
    forecast.push(selectedEvent);
  }
  
  return forecast;
};

export const getWeatherAreaEffects = (activeWeatherEvents: WeatherEvent[]) => {
  let totalEnergyBonus = 1;
  let totalGemBonus = 1;
  const backgroundEffects: string[] = [];
  
  activeWeatherEvents.forEach(weather => {
    // Apply weather bonuses to area multipliers
    totalEnergyBonus *= weather.multiplierBonus;
    totalGemBonus *= weather.multiplierBonus;
    
    // Add visual effects based on weather type
    switch (weather.rarity) {
      case 'Mythic':
        backgroundEffects.push('drop-shadow(0 0 20px rgba(239, 68, 68, 0.8))');
        break;
      case 'Legendary':
        backgroundEffects.push('drop-shadow(0 0 15px rgba(245, 158, 11, 0.6))');
        break;
      case 'Epic':
        backgroundEffects.push('drop-shadow(0 0 10px rgba(139, 92, 246, 0.5))');
        break;
      case 'Rare':
        backgroundEffects.push('drop-shadow(0 0 8px rgba(59, 130, 246, 0.4))');
        break;
      default:
        backgroundEffects.push('drop-shadow(0 0 5px rgba(255, 255, 255, 0.2))');
    }
  });
  
  return {
    energyBonus: totalEnergyBonus,
    gemBonus: totalGemBonus,
    filter: backgroundEffects.length > 0 ? backgroundEffects.join(' ') : 'none'
  };
};

export const getItemUniqueKey = (item: InventoryItem): string => {
  const mutations = item.mutations || [];
  const weatherIds = mutations.map(m => m.type).sort().join(',');
  const goldPrefix = item.isGold ? 'gold:' : '';
  const rainbowPrefix = item.isRainbow ? 'rainbow:' : '';
  return `${item.id}:${goldPrefix}${rainbowPrefix}${weatherIds}`;
};

export const mutateItem = (item: InventoryItem, activeWeatherEvents: WeatherEvent[]): InventoryItem => {
  const mutatedItem = { ...item };
  let totalMultiplier = 1;
  const mutations: WeatherMutation[] = [];

  activeWeatherEvents.forEach(weather => {
    if (Math.random() * 100 < weather.mutationChance) {
      const mutation: WeatherMutation = {
        type: weather.type,
        multiplier: weather.multiplierBonus
      };
      mutations.push(mutation);
      totalMultiplier *= weather.multiplierBonus;
    }
  });

  if (mutations.length > 0) {
    mutatedItem.mutations = mutations;
    mutatedItem.energyMultiplier *= totalMultiplier;
    mutatedItem.gemMultiplier *= totalMultiplier;
  }

  // Check for gold mutation (1% chance)
  if (Math.random() * 100 < 1) {
    mutatedItem.isGold = true;
    mutatedItem.energyMultiplier *= 2;
    mutatedItem.gemMultiplier *= 2;
  }

  // Check for rainbow mutation (0.1% chance)
  if (Math.random() * 100 < 0.1) {
    mutatedItem.isRainbow = true;
    mutatedItem.energyMultiplier *= 10;
    mutatedItem.gemMultiplier *= 10;
  }

  return mutatedItem;
};

export const cleanupExpiredWeatherEvents = (activeWeatherEvents: WeatherEvent[]): WeatherEvent[] => {
  const now = Date.now();
  return activeWeatherEvents.filter(event => 
    now < event.startTime + event.duration
  );
};