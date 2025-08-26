import type { Rarity, ItemCategory } from '../types';

export const rarityChances: Record<Rarity, number> = {
  Common: 45,
  Uncommon: 25,
  Rare: 17,
  Epic: 9,
  Legendary: 3,
  Mythic: 0.9,
  Secret: 0.1
};

export const gachaBoxPrices: Record<ItemCategory, number> = {
  Weapons: 50,
  Pets: 75,
  Relics: 100,
  Artifacts: 125
};

export const etherealGachaBoxPrices: Record<ItemCategory, number> = {
  Weapons: 50000000000,  // 50B
  Pets: 75000000000,     // 75B  
  Relics: 100000000000,  // 100B
  Artifacts: 125000000000 // 125B
};

export const cosmicGachaBoxPrices: Record<ItemCategory, number> = {
  Weapons: 5e16,    // 50 Quadrillion 
  Pets: 7.5e16,     // 75 Quadrillion
  Relics: 1e17,     // 100 Quadrillion
  Artifacts: 1.25e17 // 125 Quadrillion
};

export const transcendentGachaBoxPrices: Record<ItemCategory, number> = {
  Weapons: 5e22,  // 50 Sextillion 
  Pets: 7.5e22,     // 75 Sextillion
  Relics: 1e23,  // 100 Sextillion
  Artifacts: 1.25e23 // 125 Sextillion
};

export const absoluteGachaBoxPrices: Record<ItemCategory, number> = {
  Weapons: 5e25,    // 50 Septillion
  Pets: 7.5e25,     // 75 Septillion  
  Relics: 1e26,     // 100 Septillion
  Artifacts: 1.25e26 // 125 Septillion
};

export const rollRarity = (): Rarity => {
  const random = Math.random() * 100;
  let cumulative = 0;
  
  for (const [rarity, chance] of Object.entries(rarityChances)) {
    cumulative += chance;
    if (random <= cumulative) {
      return rarity as Rarity;
    }
  }
  
  return 'Common';
};