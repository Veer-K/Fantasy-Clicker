export type Rarity = 'Common' | 'Uncommon' | 'Rare' | 'Epic' | 'Legendary' | 'Mythic' | 'Secret';
export type ItemCategory = 'Relics' | 'Artifacts' | 'Weapons' | 'Pets';
export type TabType = 'game' | 'shop' | 'inventory' | 'upgrades';

export interface WeatherMutation {
  type: 'fire' | 'ice' | 'lightning' | 'earth' | 'wind' | 'water' | 'light' | 'dark';
  multiplier: number;
}

export interface WeatherEvent {
  id: string;
  type: 'fire' | 'ice' | 'lightning' | 'earth' | 'wind' | 'water' | 'light' | 'dark' | 'rainbow';
  name: string;
  description: string;
  duration: number;
  startTime: number;
  multiplierBonus: number;
  rarityBonus: number;
  mutationChance: number;
}

export interface ShopItem {
  id: number;
  name: string;
  category: ItemCategory;
  rarity: Rarity;
  price: number;
  gemPrice: number;
  energyMultiplier: number;
  gemMultiplier: number;
  description: string;
}

export interface InventoryItem extends ShopItem {
  quantity: number;
  level: number;
  mutations?: WeatherMutation[];
  isGold?: boolean;
  isRainbow?: boolean;
}

export interface EquippedItems {
  weapon: InventoryItem | null;
  artifact: InventoryItem | null;
  relic: InventoryItem | null;
  pets: (InventoryItem | null)[];
}

export interface Area {
  id: number;
  name: string;
  description: string;
  requiredEnergy: number;
  energyMultiplier: number;
  gemMultiplier: number;
  background: string;
}

export interface Upgrade {
  id: number;
  name: string;
  description: string;
  cost: number;
  costType: 'gems' | 'energy';
  effect: 'clickMultiplier' | 'gemChance' | 'energyMultiplier' | 'gemMultiplier';
  value: number;
  maxLevel: number;
}

export interface AutoDeleteSettings {
  enabled: boolean;
  deleteCommon: boolean;
  deleteUncommon: boolean;
  deleteRare: boolean;
  keepMutated: boolean;
}