import React, { useState, useEffect, useRef } from 'react';
import type { 
  ItemCategory, 
  TabType, 
  InventoryItem, 
  EquippedItems, 
  Area, 
  Upgrade, 
  WeatherEvent, 
  AutoDeleteSettings 
} from './types';
import { 
  rollRarity,
  gachaBoxPrices,
  etherealGachaBoxPrices
} from './modules/items';
import { availableItems } from './data/items';
import {
  equipBestItems,
  createEmptyEquipment,
  calculateEquipmentMultipliers,
  sortInventoryByRarity,
  sortInventoryByMultiplier,
  filterInventoryByCategory
} from './modules/inventory';
import {
  generateRandomWeatherEvent,
  getWeatherAreaEffects,
  mutateItem,
  cleanupExpiredWeatherEvents
} from './modules/weather';
import {
  registerUser,
  loginUser,
  saveGame,
  createEmptyGameState,
  validateCredentials
} from './modules/auth';
import type { GameState } from './modules/auth';
import { Button, Card, Input, ItemDisplay, InfoBox, MiniInfoBox, ShopInfoBox } from './components';
import './styles/global.css';

const AnimeClickerGame: React.FC = () => {
  // Authentication state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [loginInput, setLoginInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  // Game state
  const [clickCount, setClickCount] = useState(0);
  const [gems, setGems] = useState(0);
  const [energy, setEnergy] = useState(0);
  const [activeTab, setActiveTab] = useState<TabType>('game');
  const [inventoryCategory, setInventoryCategory] = useState<ItemCategory>('Relics');
  const [sortBy, setSortBy] = useState<'rarity' | 'energyMultiplier'>('rarity');
  const [equipped, setEquipped] = useState<EquippedItems>(createEmptyEquipment());
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [currentArea, setCurrentArea] = useState(1);
  const [areaDropdownOpen, setAreaDropdownOpen] = useState(false);
  const [autoDeleteExpanded, setAutoDeleteExpanded] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);
  const [upgrades, setUpgrades] = useState<Record<number, number>>({});

  // Weather System
  const [activeWeatherEvents, setActiveWeatherEvents] = useState<WeatherEvent[]>([]);

  // Auto Delete System
  const [autoDeleteSettings, setAutoDeleteSettings] = useState<AutoDeleteSettings>({
    enabled: false,
    deleteCommon: false,
    deleteUncommon: false,
    deleteRare: false,
    deleteEpic: false,
    deleteLegendary: false,
    deleteMythic: false,
    deleteSecret: false,
    keepMutated: true
  });

  // UI state
  const [isClicked, setIsClicked] = useState(false);
  const clickTimeoutRef = useRef<number | null>(null);

  // Areas data with different realms/worlds
  const [areas] = useState<Area[]>([
    // Basic World (1-20)
    {
      id: 1,
      name: "Beginner's Meadow",
      description: "A peaceful green meadow where new adventurers start their journey.",
      requiredEnergy: 0,
      energyMultiplier: 1.0,
      gemMultiplier: 1.0,
      background: 'linear-gradient(135deg, #4ade80 0%, #22c55e 50%, #16a34a 100%)'
    },
    {
      id: 2,
      name: "Rolling Hills",
      description: "Gentle hills covered in emerald grass.",
      requiredEnergy: 25000,
      energyMultiplier: 1.2,
      gemMultiplier: 1.1,
      background: 'linear-gradient(135deg, #65a30d 0%, #4ade80 50%, #22c55e 100%)'
    },
    {
      id: 3,
      name: "Whispering Woods",
      description: "A quiet forest where leaves rustle with ancient secrets.",
      requiredEnergy: 75000,
      energyMultiplier: 1.5,
      gemMultiplier: 1.2,
      background: 'linear-gradient(135deg, #166534 0%, #059669 50%, #047857 100%)'
    },
    {
      id: 4,
      name: "Moonlit Grove",
      description: "A mystical grove bathed in eternal moonlight.",
      requiredEnergy: 150000,
      energyMultiplier: 1.8,
      gemMultiplier: 1.3,
      background: 'linear-gradient(135deg, #1e3a8a 0%, #3730a3 50%, #4338ca 100%)'
    },
    {
      id: 5,
      name: "Mystic Forest",
      description: "Ancient trees whisper secrets of power.",
      requiredEnergy: 300000,
      energyMultiplier: 2.0,
      gemMultiplier: 1.5,
      background: 'linear-gradient(135deg, #059669 0%, #047857 50%, #065f46 100%)'
    },
    {
      id: 6,
      name: "Enchanted Lake",
      description: "Crystal waters that reflect inner magic.",
      requiredEnergy: 600000,
      energyMultiplier: 2.5,
      gemMultiplier: 1.8,
      background: 'linear-gradient(135deg, #0c4a6e 0%, #0369a1 50%, #0284c7 100%)'
    },
    {
      id: 7,
      name: "Singing Stones",
      description: "Ancient monoliths that hum with power.",
      requiredEnergy: 1200000,
      energyMultiplier: 3.0,
      gemMultiplier: 2.0,
      background: 'linear-gradient(135deg, #44403c 0%, #57534e 50%, #78716c 100%)'
    },
    {
      id: 8,
      name: "Starfall Valley",
      description: "A valley where meteors fall like rain.",
      requiredEnergy: 2500000,
      energyMultiplier: 3.8,
      gemMultiplier: 2.5,
      background: 'linear-gradient(135deg, #581c87 0%, #7c3aed 50%, #8b5cf6 100%)'
    },
    {
      id: 9,
      name: "Primal Caves",
      description: "Deep caverns filled with primal energy.",
      requiredEnergy: 5000000,
      energyMultiplier: 4.5,
      gemMultiplier: 2.8,
      background: 'linear-gradient(135deg, #7f1d1d 0%, #991b1b 50%, #b91c1c 100%)'
    },
    {
      id: 10,
      name: "Crystal Caverns",
      description: "Glowing crystals amplify your abilities.",
      requiredEnergy: 10000000,
      energyMultiplier: 5.0,
      gemMultiplier: 3.0,
      background: 'linear-gradient(135deg, #0369a1 0%, #0284c7 50%, #0ea5e9 100%)'
    },
    {
      id: 11,
      name: "Echoing Depths",
      description: "Underground chambers that amplify every sound.",
      requiredEnergy: 100000000,
      energyMultiplier: 6.0,
      gemMultiplier: 3.5,
      background: 'linear-gradient(135deg, #312e81 0%, #3730a3 50%, #4338ca 100%)'
    },
    {
      id: 12,
      name: "Windswept Cliffs",
      description: "High cliffs where the wind carries ancient power.",
      requiredEnergy: 200000000,
      energyMultiplier: 7.5,
      gemMultiplier: 4.0,
      background: 'linear-gradient(135deg, #0f766e 0%, #0d9488 50%, #14b8a6 100%)'
    },
    {
      id: 13,
      name: "Flame Gardens",
      description: "Gardens where flowers burn with magical fire.",
      requiredEnergy: 400000000,
      energyMultiplier: 9.0,
      gemMultiplier: 4.5,
      background: 'linear-gradient(135deg, #dc2626 0%, #ea580c 50%, #f59e0b 100%)'
    },
    {
      id: 14,
      name: "Frozen Wastes",
      description: "An icy wasteland that preserves ancient magic.",
      requiredEnergy: 800000000,
      energyMultiplier: 11.0,
      gemMultiplier: 5.5,
      background: 'linear-gradient(135deg, #1e40af 0%, #2563eb 50%, #3b82f6 100%)'
    },
    {
      id: 15,
      name: "Volcanic Peaks",
      description: "Molten energy flows through the mountains.",
      requiredEnergy: 1600000000,
      energyMultiplier: 13.5,
      gemMultiplier: 6.0,
      background: 'linear-gradient(135deg, #dc2626 0%, #ea580c 50%, #f59e0b 100%)'
    },
    {
      id: 16,
      name: "Storm Valley",
      description: "A valley where lightning never stops.",
      requiredEnergy: 3200000000,
      energyMultiplier: 16.0,
      gemMultiplier: 7.0,
      background: 'linear-gradient(135deg, #4c1d95 0%, #6b21a8 50%, #7c3aed 100%)'
    },
    {
      id: 17,
      name: "Shadow Realm",
      description: "Where darkness takes physical form.",
      requiredEnergy: 6400000000,
      energyMultiplier: 18.5,
      gemMultiplier: 8.0,
      background: 'linear-gradient(135deg, #1f2937 0%, #374151 50%, #4b5563 100%)'
    },
    {
      id: 18,
      name: "Light Sanctuary",
      description: "A sacred place where pure light dwells.",
      requiredEnergy: 12800000000,
      energyMultiplier: 21.0,
      gemMultiplier: 9.0,
      background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%)'
    },
    {
      id: 19,
      name: "Time Rift",
      description: "Where past and future collide.",
      requiredEnergy: 25600000000,
      energyMultiplier: 24.0,
      gemMultiplier: 10.0,
      background: 'linear-gradient(135deg, #065f46 0%, #059669 50%, #10b981 100%)'
    },
    {
      id: 20,
      name: "Sky Temple",
      description: "Ancient temple floating in the clouds.",
      requiredEnergy: 51200000000,
      energyMultiplier: 27.0,
      gemMultiplier: 11.0,
      background: 'linear-gradient(135deg, #7c3aed 0%, #8b5cf6 50%, #a78bfa 100%)'
    },

    // Ethereal Realms (21-40) 
    {
      id: 21,
      name: "Ethereal Gateway",
      description: "Portal to the realm beyond reality.",
      requiredEnergy: 1000000000000,
      energyMultiplier: 50.0,
      gemMultiplier: 25.0,
      background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4338ca 100%)'
    },
    {
      id: 22,
      name: "Void Sanctum",
      description: "Where existence meets nothingness.",
      requiredEnergy: 5000000000000,
      energyMultiplier: 100.0,
      gemMultiplier: 50.0,
      background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a3e 50%, #2d2d5f 100%)'
    },
    {
      id: 23,
      name: "Spectral Gardens",
      description: "Ghostly flora in eternal twilight.",
      requiredEnergy: 20000000000000,
      energyMultiplier: 200.0,
      gemMultiplier: 100.0,
      background: 'linear-gradient(135deg, #134e4a 0%, #0f766e 50%, #14b8a6 100%)'
    },
    {
      id: 24,
      name: "Ethereal Crown",
      description: "The pinnacle of the ethereal realm.",
      requiredEnergy: 500000000000000,
      energyMultiplier: 500.0,
      gemMultiplier: 250.0,
      background: 'linear-gradient(135deg, #581c87 0%, #7c2d92 50%, #a21caf 100%)'
    },

    // Cosmic Dimension (41-60)
    {
      id: 25,
      name: "Cosmic Gateway",
      description: "Entry to the infinite cosmos.",
      requiredEnergy: 1000000000000000,
      energyMultiplier: 1000.0,
      gemMultiplier: 500.0,
      background: 'linear-gradient(135deg, #000000 0%, #1a1a2e 50%, #16213e 100%)'
    },
    {
      id: 26,
      name: "Starborn Nexus",
      description: "Where stars are born and die.",
      requiredEnergy: 10000000000000000,
      energyMultiplier: 2000.0,
      gemMultiplier: 1000.0,
      background: 'linear-gradient(135deg, #0c0c0c 0%, #1a0033 50%, #330066 100%)'
    },
    {
      id: 27,
      name: "Galactic Core",
      description: "The heart of the universe itself.",
      requiredEnergy: 500000000000000000,
      energyMultiplier: 5000.0,
      gemMultiplier: 2500.0,
      background: 'linear-gradient(135deg, #000011 0%, #001122 50%, #002244 100%)'
    },

    // Transcendence Realm (28-40)
    {
      id: 28,
      name: "Ascendant Threshold",
      description: "The boundary between mortal and divine.",
      requiredEnergy: 1000000000000000000,
      energyMultiplier: 10000.0,
      gemMultiplier: 5000.0,
      background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%)'
    },
    {
      id: 29,
      name: "Divine Sanctuary",
      description: "Where gods once walked among mortals.",
      requiredEnergy: 5000000000000000000,
      energyMultiplier: 15000.0,
      gemMultiplier: 7500.0,
      background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 50%, #b45309 100%)'
    },
    {
      id: 30,
      name: "Celestial Forge",
      description: "Where divine artifacts are crafted.",
      requiredEnergy: 10000000000000000000,
      energyMultiplier: 25000.0,
      gemMultiplier: 12500.0,
      background: 'linear-gradient(135deg, #dc2626 0%, #ea580c 50%, #f59e0b 100%)'
    },
    {
      id: 31,
      name: "Eternal Flames",
      description: "Fires that have burned since creation.",
      requiredEnergy: 5000000000000000000000,
      energyMultiplier: 40000.0,
      gemMultiplier: 20000.0,
      background: 'linear-gradient(135deg, #b91c1c 0%, #dc2626 50%, #ea580c 100%)'
    },
    {
      id: 32,
      name: "Wisdom's Peak",
      description: "The mountain of infinite knowledge.",
      requiredEnergy: 10000000000000000000000,
      energyMultiplier: 60000.0,
      gemMultiplier: 30000.0,
      background: 'linear-gradient(135deg, #7c3aed 0%, #8b5cf6 50%, #a78bfa 100%)'
    },
    {
      id: 33,
      name: "Harmony Gardens",
      description: "Where all elements exist in perfect balance.",
      requiredEnergy: 50000000000000000000000,
      energyMultiplier: 90000.0,
      gemMultiplier: 45000.0,
      background: 'linear-gradient(135deg, #10b981 0%, #059669 50%, #047857 100%)'
    },
    {
      id: 34,
      name: "Infinity's Edge",
      description: "The precipice of endless possibility.",
      requiredEnergy: 100000000000000000000000,
      energyMultiplier: 150000.0,
      gemMultiplier: 75000.0,
      background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 50%, #0369a1 100%)'
    },
    {
      id: 35,
      name: "Reality's Workshop",
      description: "Where the laws of physics are rewritten.",
      requiredEnergy: 500000000000000000000000,
      energyMultiplier: 250000.0,
      gemMultiplier: 125000.0,
      background: 'linear-gradient(135deg, #ec4899 0%, #db2777 50%, #be185d 100%)'
    },
    {
      id: 36,
      name: "Dreamscape Nexus",
      description: "Where all dreams converge into reality.",
      requiredEnergy: 1000000000000000000000000,
      energyMultiplier: 400000.0,
      gemMultiplier: 200000.0,
      background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 50%, #4338ca 100%)'
    },
    {
      id: 37,
      name: "Mirror of Truth",
      description: "Reflects the true nature of all existence.",
      requiredEnergy: 5000000000000000000000000,
      energyMultiplier: 650000.0,
      gemMultiplier: 325000.0,
      background: 'linear-gradient(135deg, #1f2937 0%, #374151 50%, #6b7280 100%)'
    },
    {
      id: 38,
      name: "Source of All",
      description: "The primordial wellspring of existence.",
      requiredEnergy: 10000000000000000000000000,
      energyMultiplier: 1000000.0,
      gemMultiplier: 500000.0,
      background: 'linear-gradient(135deg, #ffffff 0%, #f9fafb 50%, #e5e7eb 100%)'
    },
    {
      id: 39,
      name: "Beyond Comprehension",
      description: "A realm that defies understanding.",
      requiredEnergy: 50000000000000000000000000,
      energyMultiplier: 1500000.0,
      gemMultiplier: 750000.0,
      background: 'linear-gradient(135deg, #0f0f0f 0%, #1f1f1f 50%, #404040 100%)'
    },
    {
      id: 40,
      name: "The Final Threshold",
      description: "The ultimate test of transcendence.",
      requiredEnergy: 100000000000000000000000000,
      energyMultiplier: 2500000.0,
      gemMultiplier: 1250000.0,
      background: 'linear-gradient(45deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #9400d3)'
    }
  ]);

  // Sample upgrades data (simplified for demo)
  const [availableUpgrades] = useState<Upgrade[]>([
    // Basic World Upgrades (Always available) - Increased by 100x
    {
      id: 1,
      name: 'Click Power',
      description: 'Increases energy gained per click',
      cost: 10000, // 100x increase: 100 -> 10,000
      costType: 'gems',
      effect: 'clickMultiplier',
      value: 0.1,
      maxLevel: 50
    },
    {
      id: 2,
      name: 'Gem Finder',
      description: 'Increases chance to find gems when clicking',
      cost: 25000, // 100x increase: 250 -> 25,000
      costType: 'gems',
      effect: 'gemChance',
      value: 1,
      maxLevel: 25
    },
    {
      id: 3,
      name: 'Energy Mastery',
      description: 'Increases overall energy multiplier',
      cost: 50000, // 100x increase: 500 -> 50,000
      costType: 'gems',
      effect: 'energyMultiplier',
      value: 0.05,
      maxLevel: 30
    },
    {
      id: 4,
      name: 'Gem Mastery',
      description: 'Increases overall gem multiplier',
      cost: 75000, // 100x increase: 750 -> 75,000
      costType: 'gems',
      effect: 'gemMultiplier',
      value: 0.05,
      maxLevel: 30
    },
    
    // Ethereal World Upgrades (Unlocked at area 21+) - Increased by 10,000x
    {
      id: 5,
      name: 'Ethereal Resonance',
      description: 'Harness the power of the ethereal realm for massive energy gains',
      cost: 10000000000000000, // 10,000x increase: 1B -> 10Qa energy
      costType: 'energy',
      effect: 'energyMultiplier',
      value: 0.2,
      maxLevel: 20
    },
    {
      id: 6,
      name: 'Void Channeling',
      description: 'Channel void energy to significantly boost gem finding',
      cost: 500000000000000, // 10,000x increase: 50B -> 500T gems
      costType: 'gems',
      effect: 'gemMultiplier',
      value: 0.15,
      maxLevel: 15
    },
    {
      id: 7,
      name: 'Dimensional Click',
      description: 'Each click resonates across multiple dimensions',
      cost: 250000000000000, // 10,000x increase: 25B -> 250T gems
      costType: 'gems',
      effect: 'clickMultiplier',
      value: 0.5,
      maxLevel: 10
    },
    {
      id: 8,
      name: 'Ethereal Luck',
      description: 'Bend probability itself to find more gems',
      cost: 50000000000000, // 10,000x increase: 5B -> 50T energy
      costType: 'energy',
      effect: 'gemChance',
      value: 5,
      maxLevel: 12
    },
    
    // Special Enhancement Upgrades (World 2)
    {
      id: 9,
      name: 'Golden Touch',
      description: 'Increases the chance of finding golden items',
      cost: 1000000000000000, // 1Qa gems
      costType: 'gems',
      effect: 'goldChance',
      value: 0.1, // +0.1% per level
      maxLevel: 10
    },
    {
      id: 10,
      name: 'Rainbow Blessing',
      description: 'Grants a small chance to find legendary rainbow items',
      cost: 10000000000000000, // 10Qa gems
      costType: 'gems',
      effect: 'rainbowChance',
      value: 0.02, // +0.02% per level
      maxLevel: 5
    },
    {
      id: 11,
      name: 'Weather Mastery',
      description: 'Increases the chance of weather mutations on new items',
      cost: 100000000000000000, // 100Qa energy
      costType: 'energy',
      effect: 'mutationChance',
      value: 1.0, // +1% mutation chance per level
      maxLevel: 20
    },
    {
      id: 12,
      name: 'Bulk Opening',
      description: 'Allows opening multiple gacha boxes at once',
      cost: 5000000000000000, // 5Qa gems
      costType: 'gems',
      effect: 'multiOpen',
      value: 1, // +1 box per level
      maxLevel: 25
    }
  ]);

  // Authentication handlers
  const handleRegister = async () => {
    if (!validateCredentials(loginInput, passwordInput)) return;

    const result = registerUser(loginInput.trim(), passwordInput.trim());
    if (result.success && result.gameState) {
      loadGameState(result.gameState);
      showNotification(result.message);
    } else {
      alert(result.message);
    }
  };

  const handleLogin = async () => {
    if (!validateCredentials(loginInput, passwordInput)) return;

    const result = loginUser(loginInput.trim(), passwordInput.trim());
    if (result.success && result.gameState) {
      loadGameState(result.gameState);
      showNotification(result.message);
    } else {
      alert(result.message);
    }
  };

  const handleLogout = () => {
    if (username) {
      const gameState: GameState = {
        clickCount,
        gems,
        energy,
        currentArea,
        equipped,
        inventory,
        upgrades,
        autoDeleteSettings,
        username,
        lastSaved: Date.now()
      };
      saveGame(gameState, passwordInput);
    }
    
    // Reset all state
    setIsLoggedIn(false);
    setUsername('');
    setLoginInput('');
    setPasswordInput('');
    const emptyState = createEmptyGameState();
    setClickCount(emptyState.clickCount);
    setGems(emptyState.gems);
    setEnergy(emptyState.energy);
    setCurrentArea(emptyState.currentArea);
    setEquipped(emptyState.equipped);
    setInventory(emptyState.inventory);
    setUpgrades(emptyState.upgrades);
    
    showNotification('💾 Progress Saved! Logged out successfully.');
  };

  // Load game state from auth result
  const loadGameState = (gameState: GameState) => {
    setClickCount(gameState.clickCount);
    setGems(gameState.gems);
    setEnergy(gameState.energy);
    setCurrentArea(gameState.currentArea);
    setEquipped(gameState.equipped);
    setInventory(gameState.inventory);
    setUpgrades(gameState.upgrades);
    if (gameState.autoDeleteSettings) {
      setAutoDeleteSettings(gameState.autoDeleteSettings);
    }
    setUsername(gameState.username);
    setIsLoggedIn(true);
  };

  // Game mechanics
  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  const getCurrentArea = () => {
    return areas.find(area => area.id === currentArea) || areas[0];
  };

  const canProgressToArea = (areaId: number) => {
    const area = areas.find(a => a.id === areaId);
    return area && energy >= area.requiredEnergy;
  };

  const progressToArea = (areaId: number) => {
    const area = areas.find(a => a.id === areaId);
    if (area && canProgressToArea(areaId)) {
      setCurrentArea(areaId);
      // Check for world transitions
      if (areaId === 21 && currentArea < 21) {
        showNotification('🌌 Welcome to the Ethereal Realms! Reality bends to your will!');
      }
      showNotification(`🚀 Advanced to ${area.name}!`);
    }
  };

  const getNextArea = () => {
    // Find the next area in sequence (not by ID, but by sequence position)
    const sortedAreas = areas.sort((a, b) => a.id - b.id);
    const currentIndex = sortedAreas.findIndex(area => area.id === currentArea);
    if (currentIndex === -1 || currentIndex >= sortedAreas.length - 1) {
      return null; // No next area
    }
    return sortedAreas[currentIndex + 1];
  };

  const getProgressToNextArea = () => {
    const nextArea = getNextArea();
    if (!nextArea) return { progress: 100, needed: 0, nextArea: null };
    
    const needed = Math.max(0, nextArea.requiredEnergy - energy);
    const progress = Math.min(100, (energy / nextArea.requiredEnergy) * 100);
    
    return { progress, needed, nextArea };
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

  const calculateTotalMultipliers = () => {
    let energyMult = 1;
    let gemMult = 1;
    let clickMult = 1;
    let gemChanceBonus = 0;
    let goldChanceBonus = 0;
    let rainbowChanceBonus = 0;
    let mutationChanceBonus = 0;
    let multiOpenBonus = 0;
    
    // Area multipliers
    const area = getCurrentArea();
    energyMult *= area.energyMultiplier;
    gemMult *= area.gemMultiplier;
    
    // Weather effects
    const weatherEffects = getWeatherAreaEffects(activeWeatherEvents);
    energyMult *= weatherEffects.energyBonus;
    gemMult *= weatherEffects.gemBonus;
    
    // Equipment multipliers
    const equipmentMultipliers = calculateEquipmentMultipliers(equipped);
    energyMult *= equipmentMultipliers.energyMult;
    gemMult *= equipmentMultipliers.gemMult;
    
    // Apply upgrade bonuses
    availableUpgrades.forEach(upgrade => {
      const level = upgrades[upgrade.id] || 0;
      if (level > 0) {
        const bonus = upgrade.value * level;
        switch (upgrade.effect) {
          case 'clickMultiplier':
            clickMult += bonus;
            break;
          case 'gemChance':
            gemChanceBonus += bonus;
            break;
          case 'energyMultiplier':
            energyMult *= (1 + bonus);
            break;
          case 'gemMultiplier':
            gemMult *= (1 + bonus);
            break;
          case 'goldChance':
            goldChanceBonus += bonus;
            break;
          case 'rainbowChance':
            rainbowChanceBonus += bonus;
            break;
          case 'mutationChance':
            mutationChanceBonus += bonus;
            break;
          case 'multiOpen':
            multiOpenBonus += bonus;
            break;
        }
      }
    });
    
    return { 
      energyMult, 
      gemMult, 
      clickMult, 
      gemChanceBonus, 
      goldChanceBonus, 
      rainbowChanceBonus, 
      mutationChanceBonus,
      multiOpenBonus 
    };
  };

  const getAvailableUpgrades = () => {
    return availableUpgrades.filter(upgrade => {
      // Show basic upgrades (id 1-4) always
      if (upgrade.id <= 4) return true;
      
      // Show ethereal upgrades (id 5+) only in world 2+
      return currentArea >= 21;
    });
  };

  const purchaseUpgrade = (upgradeId: number) => {
    const upgrade = availableUpgrades.find(u => u.id === upgradeId);
    if (!upgrade) return;

    const currentLevel = upgrades[upgradeId] || 0;
    if (currentLevel >= upgrade.maxLevel) return;

    const cost = upgrade.cost * Math.pow(1.5, currentLevel); // Cost increases by 50% per level
    const hasEnoughResources = upgrade.costType === 'gems' 
      ? gems >= cost 
      : energy >= cost;

    if (hasEnoughResources) {
      // Deduct cost
      if (upgrade.costType === 'gems') {
        setGems(prev => prev - cost);
      } else {
        setEnergy(prev => prev - cost);
      }

      // Increase upgrade level
      setUpgrades(prev => ({
        ...prev,
        [upgradeId]: currentLevel + 1
      }));

      showNotification(`⚡ ${upgrade.name} upgraded to level ${currentLevel + 1}!`);
    }
  };

  const handleClick = () => {
    const { energyMult, gemMult, clickMult, gemChanceBonus } = calculateTotalMultipliers();
    
    // Calculate energy gained
    const baseEnergy = 1;
    const energyGained = Math.floor(baseEnergy * energyMult * clickMult);
    setEnergy(prev => prev + energyGained);
    setClickCount(prev => prev + 1);
    
    // Gem chance calculation
    const baseGemChance = 5; // 5% base chance
    const totalGemChance = baseGemChance + gemChanceBonus;
    
    if (Math.random() * 100 < totalGemChance) {
      const gemsGained = Math.floor(1 * gemMult);
      setGems(prev => prev + gemsGained);
    }
    
    // Visual feedback
    setIsClicked(true);
    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
    }
    clickTimeoutRef.current = setTimeout(() => {
      setIsClicked(false);
    }, 150);
  };

  // Enhanced item mutation with upgrade bonuses
  const enhanceItem = (item: InventoryItem): InventoryItem => {
    const { goldChanceBonus, rainbowChanceBonus, mutationChanceBonus } = calculateTotalMultipliers();
    let enhancedItem = { ...item };

    // Apply weather mutations first (with mutation chance bonus)
    if (activeWeatherEvents.length > 0) {
      activeWeatherEvents.forEach(weather => {
        const baseMutationChance = weather.mutationChance;
        const enhancedChance = baseMutationChance + mutationChanceBonus;
        if (Math.random() * 100 < enhancedChance) {
          if (!enhancedItem.mutations) enhancedItem.mutations = [];
          const mutation = {
            type: weather.type,
            multiplier: weather.multiplierBonus
          };
          enhancedItem.mutations.push(mutation);
          enhancedItem.energyMultiplier *= weather.multiplierBonus;
          enhancedItem.gemMultiplier *= weather.multiplierBonus;
          enhancedItem.isMutated = true;
        }
      });
    }

    // Apply gold chance (base 1% + bonuses)
    const goldChance = 1 + goldChanceBonus;
    if (Math.random() * 100 < goldChance) {
      enhancedItem.isGold = true;
      enhancedItem.energyMultiplier *= 2;
      enhancedItem.gemMultiplier *= 2;
    }

    // Apply rainbow chance (base 0.1% + bonuses)
    const rainbowChance = 0.1 + rainbowChanceBonus;
    if (Math.random() * 100 < rainbowChance) {
      enhancedItem.isRainbow = true;
      enhancedItem.energyMultiplier *= 10;
      enhancedItem.gemMultiplier *= 10;
    }

    return enhancedItem;
  };

  // Gacha functions with multi-open support
  const purchaseGachaBox = (category: ItemCategory) => {
    const { multiOpenBonus } = calculateTotalMultipliers();
    const openCount = Math.max(1, Math.floor(1 + multiOpenBonus));
    const cost = gachaBoxPrices[category] * openCount;
    
    if (gems >= cost) {
      const newItems: InventoryItem[] = [];
      
      for (let i = 0; i < openCount; i++) {
        const rarity = rollRarity();
        // Only get first world items (id < 43)
        const availableItemsForCategory = availableItems.filter(item => 
          item.category === category && item.rarity === rarity && item.id < 43
        );
        
        if (availableItemsForCategory.length > 0) {
          const selectedItem = availableItemsForCategory[Math.floor(Math.random() * availableItemsForCategory.length)];
          const newItem: InventoryItem = {
            ...selectedItem,
            instanceId: `${selectedItem.id}_${Date.now()}_${Math.random()}_${i}`,
            quantity: 1,
            level: 1
          };

          // Apply enhanced mutations and bonuses
          const enhancedItem = enhanceItem(newItem);
          newItems.push(enhancedItem);
        }
      }
      
      if (newItems.length > 0) {
        setInventory(prev => [...prev, ...newItems]);
        setGems(prev => prev - cost);
        
        if (openCount === 1) {
          showNotification(`🎁 Acquired ${newItems[0].name} (${newItems[0].rarity})!`);
        } else {
          const rarityCount: Record<string, number> = {};
          newItems.forEach(item => {
            rarityCount[item.rarity] = (rarityCount[item.rarity] || 0) + 1;
          });
          const summary = Object.entries(rarityCount)
            .map(([rarity, count]) => `${count} ${rarity}`)
            .join(', ');
          showNotification(`🎁 Opened ${openCount} boxes: ${summary}!`);
        }
        
        // Apply auto delete after adding items
        setTimeout(applyAutoDelete, 100);
      }
    }
  };

  // Ethereal Gacha function for world 2 with multi-open support
  const purchaseEtherealGachaBox = (category: ItemCategory) => {
    const { multiOpenBonus } = calculateTotalMultipliers();
    const openCount = Math.max(1, Math.floor(1 + multiOpenBonus));
    const cost = etherealGachaBoxPrices[category] * openCount;
    
    if (gems >= cost) {
      const newItems: InventoryItem[] = [];
      
      for (let i = 0; i < openCount; i++) {
        const rarity = rollRarity();
        // Only get Ethereal world items (id >= 43 and id <= 84)
        const availableItemsForCategory = availableItems.filter(item => 
          item.category === category && item.rarity === rarity && item.id >= 43 && item.id <= 84
        );
        
        if (availableItemsForCategory.length > 0) {
          const selectedItem = availableItemsForCategory[Math.floor(Math.random() * availableItemsForCategory.length)];
          const newItem: InventoryItem = {
            ...selectedItem,
            instanceId: `${selectedItem.id}_${Date.now()}_${Math.random()}_${i}`,
            quantity: 1,
            level: 1
          };

          // Apply enhanced mutations and bonuses
          const enhancedItem = enhanceItem(newItem);
          newItems.push(enhancedItem);
        }
      }
      
      if (newItems.length > 0) {
        setInventory(prev => [...prev, ...newItems]);
        setGems(prev => prev - cost);
        
        if (openCount === 1) {
          showNotification(`🌌 Acquired Ethereal ${newItems[0].name} (${newItems[0].rarity})!`);
        } else {
          const rarityCount: Record<string, number> = {};
          newItems.forEach(item => {
            rarityCount[item.rarity] = (rarityCount[item.rarity] || 0) + 1;
          });
          const summary = Object.entries(rarityCount)
            .map(([rarity, count]) => `${count} ${rarity}`)
            .join(', ');
          showNotification(`🌌 Opened ${openCount} Ethereal boxes: ${summary}!`);
        }
        
        // Apply auto delete after adding items
        setTimeout(applyAutoDelete, 100);
      }
    }
  };

  // Equipment management
  const equipBest = () => {
    const bestEquipment = equipBestItems(inventory);
    setEquipped(bestEquipment);
  };

  const unequipAll = () => {
    setEquipped(createEmptyEquipment());
  };

  // Manual equipment functions
  const equipItem = (item: InventoryItem) => {
    setEquipped(prev => {
      const newEquipped = { ...prev };
      
      if (item.category === 'Weapons') {
        newEquipped.weapon = item;
      } else if (item.category === 'Artifacts') {
        newEquipped.artifact = item;
      } else if (item.category === 'Relics') {
        newEquipped.relic = item;
      } else if (item.category === 'Pets') {
        // Find first empty pet slot, or replace if all slots are full
        let placed = false;
        for (let i = 0; i < newEquipped.pets.length && !placed; i++) {
          if (!newEquipped.pets[i]) {
            newEquipped.pets[i] = item;
            placed = true;
          }
        }
        // If all slots are full, replace the first one
        if (!placed && newEquipped.pets.length > 0) {
          newEquipped.pets[0] = item;
        }
      }
      
      return newEquipped;
    });
    showNotification(`⚡ Equipped ${item.name}!`);
  };

  const unequipItem = (item: InventoryItem) => {
    setEquipped(prev => {
      const newEquipped = { ...prev };
      
      if (item.category === 'Weapons' && prev.weapon?.instanceId === item.instanceId) {
        newEquipped.weapon = null;
      } else if (item.category === 'Artifacts' && prev.artifact?.instanceId === item.instanceId) {
        newEquipped.artifact = null;
      } else if (item.category === 'Relics' && prev.relic?.instanceId === item.instanceId) {
        newEquipped.relic = null;
      } else if (item.category === 'Pets') {
        for (let i = 0; i < newEquipped.pets.length; i++) {
          if (newEquipped.pets[i]?.instanceId === item.instanceId) {
            newEquipped.pets[i] = null;
            break;
          }
        }
      }
      
      return newEquipped;
    });
    showNotification(`❌ Unequipped ${item.name}!`);
  };

  const isItemEquipped = (item: InventoryItem): boolean => {
    if (item.category === 'Weapons') {
      return equipped.weapon?.instanceId === item.instanceId;
    } else if (item.category === 'Artifacts') {
      return equipped.artifact?.instanceId === item.instanceId;
    } else if (item.category === 'Relics') {
      return equipped.relic?.instanceId === item.instanceId;
    } else if (item.category === 'Pets') {
      return equipped.pets.some(pet => pet?.instanceId === item.instanceId);
    }
    return false;
  };

  // Auto delete function
  const applyAutoDelete = () => {
    if (!autoDeleteSettings.enabled) return;

    setInventory(prev => {
      return prev.filter(item => {
        // Keep mutated items if setting is enabled (includes gold, rainbow, and weather mutations)
        if (autoDeleteSettings.keepMutated && (item.isMutated || item.isGold || item.isRainbow)) return true;
        
        // Check if this rarity should be deleted
        const shouldDelete = 
          (item.rarity === 'Common' && autoDeleteSettings.deleteCommon) ||
          (item.rarity === 'Uncommon' && autoDeleteSettings.deleteUncommon) ||
          (item.rarity === 'Rare' && autoDeleteSettings.deleteRare) ||
          (item.rarity === 'Epic' && autoDeleteSettings.deleteEpic) ||
          (item.rarity === 'Legendary' && autoDeleteSettings.deleteLegendary) ||
          (item.rarity === 'Mythic' && autoDeleteSettings.deleteMythic) ||
          (item.rarity === 'Secret' && autoDeleteSettings.deleteSecret);
        
        return !shouldDelete;
      });
    });
  };

  // Auto-save game progress
  useEffect(() => {
    if (!isLoggedIn || !username) return;

    const autoSaveInterval = setInterval(() => {
      const gameState: GameState = {
        clickCount,
        gems,
        energy,
        currentArea,
        equipped,
        inventory,
        upgrades,
        autoDeleteSettings,
        username,
        lastSaved: Date.now()
      };
      
      // Get password from localStorage for auto-save
      const password = localStorage.getItem(`animeClicker_pass_${username}`);
      if (password) {
        saveGame(gameState, password);
        console.log('Auto-saved game progress');
      }
    }, 10000); // Auto-save every 10 seconds

    return () => clearInterval(autoSaveInterval);
  }, [isLoggedIn, username, clickCount, gems, energy, currentArea, equipped, inventory, upgrades]);

  // Save on page unload
  useEffect(() => {
    if (!isLoggedIn || !username) return;

    const handleBeforeUnload = () => {
      const gameState: GameState = {
        clickCount,
        gems,
        energy,
        currentArea,
        equipped,
        inventory,
        upgrades,
        autoDeleteSettings,
        username,
        lastSaved: Date.now()
      };
      
      const password = localStorage.getItem(`animeClicker_pass_${username}`);
      if (password) {
        saveGame(gameState, password);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isLoggedIn, username, clickCount, gems, energy, currentArea, equipped, inventory, upgrades]);

  // Weather system effects
  useEffect(() => {
    // Start random weather events
    const weatherInterval = setInterval(() => {
      if (Math.random() < 0.1) { // 10% chance every interval
        const newEvent = generateRandomWeatherEvent();
        setActiveWeatherEvents(prev => [...prev, newEvent]);
        showNotification(`🌟 ${newEvent.name} has begun!`);
      }
    }, 30000); // Check every 30 seconds

    // Cleanup expired weather events
    const cleanupInterval = setInterval(() => {
      setActiveWeatherEvents(prev => cleanupExpiredWeatherEvents(prev));
    }, 10000); // Check every 10 seconds

    return () => {
      clearInterval(weatherInterval);
      clearInterval(cleanupInterval);
    };
  }, []);

  // Render functions (simplified for demo)
  const renderLoginScreen = () => (
    <div style={{
      height: '100vh',
      width: '100vw',
      background: 'linear-gradient(135deg, #1a365d 0%, #2d5a87 50%, #ff8c42 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <Card title="🎮 Anime Clicker" style={{ maxWidth: '400px', width: '90%' }}>
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', justifyContent: 'center' }}>
            <Button
              variant={!isRegistering ? 'primary' : 'secondary'}
              onClick={() => setIsRegistering(false)}
            >
              Login
            </Button>
            <Button
              variant={isRegistering ? 'primary' : 'secondary'}
              onClick={() => setIsRegistering(true)}
            >
              Register
            </Button>
          </div>
          <p style={{ color: '#e2e8f0', fontSize: '1.1rem', margin: 0, textAlign: 'center' }}>
            {isRegistering 
              ? 'Create a new account to start your adventure!'
              : 'Welcome back! Enter your credentials to continue.'
            }
          </p>
        </div>
        
        <Input
          type="text"
          placeholder="Username (min 3 characters)"
          value={loginInput}
          onChange={(e) => setLoginInput(e.target.value)}
        />
        
        <Input
          type="password"
          placeholder="Password (min 3 characters)"
          value={passwordInput}
          onChange={(e) => setPasswordInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && (isRegistering ? handleRegister() : handleLogin())}
        />
        
        <Button
          onClick={isRegistering ? handleRegister : handleLogin}
          disabled={loginInput.trim().length < 3 || passwordInput.trim().length < 3}
          style={{ width: '100%', marginTop: '1rem' }}
        >
          {validateCredentials(loginInput, passwordInput)
            ? (isRegistering ? 'Create Account' : 'Start Adventure')
            : 'Username & password required'
          }
        </Button>
        
        <p style={{ 
          color: '#94a3b8', 
          fontSize: '0.9rem', 
          marginTop: '1rem',
          lineHeight: '1.4',
          textAlign: 'center'
        }}>
          {isRegistering
            ? 'Your progress will be automatically saved to your browser. Choose a unique username!'
            : 'Your progress will be automatically saved to your browser. Use the same username to continue your adventure!'
          }
        </p>
      </Card>
    </div>
  );

  const renderGameTab = () => {
    const { progress, needed, nextArea } = getProgressToNextArea();
    const canProgress = nextArea && energy >= nextArea.requiredEnergy;
    
    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        padding: '2rem'
      }}>
        {/* Current Area Display */}
        <div style={{
          marginBottom: '1.5rem',
          padding: '1rem',
          backgroundColor: 'rgba(15, 23, 42, 0.8)',
          borderRadius: '12px',
          border: '2px solid #ff8c42',
          textAlign: 'center',
          maxWidth: '450px',
          width: '100%'
        }}>
          <div style={{ color: '#ff8c42', fontSize: '1rem', marginBottom: '0.5rem' }}>
            Current Area: {getCurrentArea().name} (#{currentArea})
          </div>
          
          <Button
            onClick={() => setAreaDropdownOpen(!areaDropdownOpen)}
            style={{ 
              backgroundColor: 'rgba(79, 195, 247, 0.2)',
              borderColor: '#4fc3f7',
              color: '#4fc3f7',
              fontSize: '0.9rem',
              padding: '0.5rem 1rem'
            }}
          >
            🗺️ Area Menu
          </Button>
        </div>

        {/* Area Progress */}
        {nextArea && (
          <div style={{
            marginBottom: '2rem',
            padding: '1.5rem',
            backgroundColor: 'rgba(15, 23, 42, 0.8)',
            borderRadius: '12px',
            border: canProgress ? '2px solid #22c55e' : '2px solid #64748b',
            boxShadow: canProgress 
              ? '0 0 20px rgba(34, 197, 94, 0.3)' 
              : '0 8px 16px rgba(0, 0, 0, 0.3)',
            textAlign: 'center',
            maxWidth: '450px',
            width: '100%'
          }}>
            <div style={{ 
              color: canProgress ? '#22c55e' : '#94a3b8', 
              fontSize: '1rem', 
              fontWeight: '600', 
              marginBottom: '0.5rem' 
            }}>
              {canProgress ? '🚀 Ready to Progress!' : '⏳ Area Progression'}
            </div>
            
            <div style={{ color: '#e2e8f0', fontSize: '0.9rem', marginBottom: '1rem' }}>
              Next: {nextArea.name}
            </div>

            {/* Progress Bar */}
            <div style={{
              width: '100%',
              height: '20px',
              backgroundColor: 'rgba(100, 116, 139, 0.3)',
              borderRadius: '10px',
              overflow: 'hidden',
              marginBottom: '0.75rem',
              border: '1px solid rgba(100, 116, 139, 0.5)'
            }}>
              <div style={{
                width: `${progress}%`,
                height: '100%',
                background: canProgress 
                  ? 'linear-gradient(90deg, #22c55e 0%, #16a34a 100%)'
                  : 'linear-gradient(90deg, #3b82f6 0%, #1d4ed8 100%)',
                borderRadius: '10px',
                transition: 'width 0.3s ease'
              }} />
            </div>

            {/* Energy Requirements */}
            <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '1rem' }}>
              {canProgress 
                ? `✅ Ready! (${formatNumber(energy)} / ${formatNumber(nextArea.requiredEnergy)} energy)`
                : `Need ${formatNumber(needed)} more energy (${formatNumber(energy)} / ${formatNumber(nextArea.requiredEnergy)})`
              }
            </div>

            {canProgress && (
              <Button
                onClick={() => progressToArea(nextArea.id)}
                style={{ 
                  backgroundColor: '#22c55e', 
                  borderColor: '#22c55e',
                  color: '#0f172a'
                }}
              >
                Advance to Area {nextArea.id}
              </Button>
            )}
          </div>
        )}

        {/* Stats Display */}
        <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
          <div style={{ color: '#4fc3f7', fontSize: '1.5rem', marginBottom: '1rem' }}>
            ⚡ Energy: {formatNumber(energy)}
          </div>
          <div style={{ color: '#ff8c42', fontSize: '1.2rem' }}>
            💎 Gems: {formatNumber(gems)}
          </div>
        </div>

        {/* Click Button */}
        <Button
          onClick={handleClick}
          size="large"
          style={{
            fontSize: '2rem',
            padding: '2rem 3rem',
            borderRadius: '50%',
            minWidth: '200px',
            minHeight: '200px',
            transform: isClicked ? 'scale(0.95)' : 'scale(1)',
            boxShadow: isClicked 
              ? '0 0 30px rgba(255, 140, 66, 0.8)' 
              : '0 8px 32px rgba(255, 140, 66, 0.3)'
          }}
        >
          🎯
        </Button>

      </div>
    );
  };

  const renderShopTab = () => {
    const currentAreaData = getCurrentArea();
    
    // Function to determine if background is light or dark for adaptive text colors
    const isLightBackground = (background: string): boolean => {
      const colorMatch = background.match(/#[0-9a-f]{6}/gi);
      if (!colorMatch || colorMatch.length === 0) return false;
      
      const hex = colorMatch[0];
      const r = parseInt(hex.substr(1, 2), 16);
      const g = parseInt(hex.substr(3, 2), 16);
      const b = parseInt(hex.substr(5, 2), 16);
      
      const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
      return luminance > 0.6;
    };

    const isLight = isLightBackground(currentAreaData.background);
    const adaptiveAccentColor = isLight ? '#374151' : '#ff8c42';

    return (
    <div 
      className="shop-layout"
      style={{ 
        display: 'flex', 
        height: 'calc(100vh - 120px)', 
        padding: '1rem',
        gap: '1rem'
      }}
    >
      {/* Left Side - Gacha Boxes */}
      <div 
        className="shop-left"
        style={{ 
          width: '50%',
          overflowY: 'auto',
          paddingRight: '0.5rem'
        }}
      >
        <h2 style={{ color: adaptiveAccentColor, textAlign: 'center', marginBottom: '2rem' }}>
          💎 Gacha Shop 💎
        </h2>
        
        {/* World 1 Gacha Boxes - Always show */}
        <h3 style={{ color: adaptiveAccentColor, textAlign: 'center', marginBottom: '1.5rem', fontSize: '1.3rem' }}>
          🌱 Basic World Equipment
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '3rem' }}>
          {(['Weapons', 'Pets', 'Relics', 'Artifacts'] as ItemCategory[]).map(category => {
            const worldColors = {
              primaryColor: "#22c55e",
              secondaryColor: "#4ade80",
              backgroundColor: "rgba(34, 197, 94, 0.15)",
              borderColor: "#22c55e",
              textColor: "#dcfce7"
            };

            return (
            <Card key={`basic-${category}`} style={{
              border: `2px solid ${worldColors.borderColor}`,
              backgroundColor: `rgba(15, 23, 42, 0.95)`,
              boxShadow: `0 4px 16px rgba(0, 0, 0, 0.3), 0 0 10px ${worldColors.primaryColor}30`
            }}>
              <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                <h3 style={{ color: worldColors.primaryColor, fontSize: '1.2rem', marginBottom: '0.5rem' }}>
                  🎁 {category} Box
                </h3>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  gap: '0.5rem',
                  marginBottom: '1rem'
                }}>
                  <span style={{ color: worldColors.textColor, fontSize: '0.9rem' }}>Cost:</span>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0.25rem',
                    backgroundColor: worldColors.backgroundColor,
                    padding: '0.4rem 0.6rem',
                    borderRadius: '6px',
                    border: `1px solid ${worldColors.borderColor}50`
                  }}>
                    <span style={{ fontSize: '1rem' }}>💎</span>
                    <span style={{ color: worldColors.primaryColor, fontWeight: '600', fontSize: '1rem' }}>
                      {formatNumber(gachaBoxPrices[category])}
                    </span>
                  </div>
                </div>
                <div style={{ color: worldColors.textColor, fontSize: '0.8rem', marginBottom: '1rem', opacity: 0.7 }}>
                  Contains random {category.toLowerCase()} from the basic world!
                </div>
              </div>
              
              {/* Single Open and Max Open Buttons */}
              <div style={{ display: 'flex', gap: '0.5rem', width: '100%' }}>
                {/* Single Open Button */}
                <Button
                  onClick={() => {
                    const singleCost = gachaBoxPrices[category];
                    if (gems >= singleCost) {
                      setGems(prev => prev - singleCost);
                      const newItem = generateRandomItem(category, false);
                      setInventory(prev => [...prev, newItem]);
                      
                      showNotification(`🎁 Opened Basic ${category} Box!`, 'success');
                      showNotification(`✨ Found ${newItem.rarity} ${newItem.name}!`, 'info');
                    }
                  }}
                  disabled={gems < gachaBoxPrices[category]}
                  size="small"
                  style={{ 
                    flex: 1,
                    opacity: gems < gachaBoxPrices[category] ? 0.5 : 1,
                    backgroundColor: gems >= gachaBoxPrices[category] ? worldColors.primaryColor : 'rgba(100, 116, 139, 0.5)',
                    borderColor: worldColors.borderColor,
                    color: gems >= gachaBoxPrices[category] ? '#0f172a' : '#64748b',
                    boxShadow: gems >= gachaBoxPrices[category] ? `0 0 10px ${worldColors.primaryColor}50` : 'none'
                  }}
                >
                  💎 Open 1
                </Button>

                {/* Max Open Button */}
                <Button
                  onClick={() => purchaseGachaBox(category)}
                  disabled={(() => {
                    const { multiOpenBonus } = calculateTotalMultipliers();
                    const openCount = Math.max(1, Math.floor(1 + multiOpenBonus));
                    const totalCost = gachaBoxPrices[category] * openCount;
                    return gems < totalCost;
                  })()}
                  size="small"
                  style={{ 
                    flex: 2,
                    opacity: (() => {
                      const { multiOpenBonus } = calculateTotalMultipliers();
                      const openCount = Math.max(1, Math.floor(1 + multiOpenBonus));
                      const totalCost = gachaBoxPrices[category] * openCount;
                      return gems < totalCost ? 0.5 : 1;
                    })(),
                    backgroundColor: (() => {
                      const { multiOpenBonus } = calculateTotalMultipliers();
                      const openCount = Math.max(1, Math.floor(1 + multiOpenBonus));
                      const totalCost = gachaBoxPrices[category] * openCount;
                      return gems >= totalCost ? worldColors.primaryColor : 'rgba(100, 116, 139, 0.5)';
                    })(),
                    borderColor: worldColors.borderColor,
                    color: (() => {
                      const { multiOpenBonus } = calculateTotalMultipliers();
                      const openCount = Math.max(1, Math.floor(1 + multiOpenBonus));
                      const totalCost = gachaBoxPrices[category] * openCount;
                      return gems >= totalCost ? '#0f172a' : '#64748b';
                    })(),
                    boxShadow: (() => {
                      const { multiOpenBonus } = calculateTotalMultipliers();
                      const openCount = Math.max(1, Math.floor(1 + multiOpenBonus));
                      const totalCost = gachaBoxPrices[category] * openCount;
                      return gems >= totalCost ? `0 0 10px ${worldColors.primaryColor}50` : 'none';
                    })()
                  }}
                >
                  {(() => {
                    const { multiOpenBonus } = calculateTotalMultipliers();
                    const openCount = Math.max(1, Math.floor(1 + multiOpenBonus));
                    const totalCost = gachaBoxPrices[category] * openCount;
                    
                    if (gems >= totalCost) {
                      return openCount > 1 ? `💎 Max (${openCount})` : `💎 Max (1)`;
                    } else {
                      return `Need ${formatNumber(totalCost - gems)}`;
                    }
                  })()}
                </Button>
              </div>
            </Card>
            );
          })}
        </div>

        {/* World 2 Gacha Boxes - Only show if in world 2+ */}
        {currentAreaData.id >= 21 && (
          <>
            <h3 style={{ color: adaptiveAccentColor, textAlign: 'center', marginBottom: '1.5rem', fontSize: '1.3rem' }}>
              🌌 Ethereal Realm Equipment
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '3rem' }}>
              {(['Weapons', 'Pets', 'Relics', 'Artifacts'] as ItemCategory[]).map(category => {
                const worldColors = {
                  primaryColor: "#8b5cf6",
                  secondaryColor: "#a78bfa", 
                  backgroundColor: "rgba(139, 92, 246, 0.15)",
                  borderColor: "#8b5cf6",
                  textColor: "#ede9fe"
                };

                return (
                <Card key={`ethereal-${category}`} style={{
                  border: `2px solid ${worldColors.borderColor}`,
                  backgroundColor: `rgba(15, 23, 42, 0.95)`,
                  boxShadow: `0 4px 16px rgba(0, 0, 0, 0.3), 0 0 10px ${worldColors.primaryColor}30`
                }}>
                  <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                    <h3 style={{ color: worldColors.primaryColor, fontSize: '1.2rem', marginBottom: '0.5rem' }}>
                      🌌 Ethereal {category} Box
                    </h3>
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      gap: '0.5rem',
                      marginBottom: '1rem'
                    }}>
                      <span style={{ color: worldColors.textColor, fontSize: '0.9rem' }}>Cost:</span>
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '0.25rem',
                        backgroundColor: worldColors.backgroundColor,
                        padding: '0.4rem 0.6rem',
                        borderRadius: '6px',
                        border: `1px solid ${worldColors.borderColor}50`
                      }}>
                        <span style={{ fontSize: '1rem' }}>💎</span>
                        <span style={{ color: worldColors.primaryColor, fontWeight: '600', fontSize: '1rem' }}>
                          {formatNumber(etherealGachaBoxPrices[category])}
                        </span>
                      </div>
                    </div>
                    <div style={{ color: worldColors.textColor, fontSize: '0.8rem', marginBottom: '1rem', opacity: 0.7 }}>
                      Contains random ethereal {category.toLowerCase()} of any rarity!
                    </div>
                  </div>
                  
                  {/* Single Open and Max Open Buttons */}
                  <div style={{ display: 'flex', gap: '0.5rem', width: '100%' }}>
                    {/* Single Open Button */}
                    <Button
                      onClick={() => {
                        const singleCost = etherealGachaBoxPrices[category];
                        if (gems >= singleCost) {
                          setGems(prev => prev - singleCost);
                          const newItem = generateRandomItem(category, true);
                          setInventory(prev => [...prev, newItem]);
                          
                          showNotification(`🎁 Opened Ethereal ${category} Box!`, 'success');
                          showNotification(`✨ Found ${newItem.rarity} ${newItem.name}!`, 'info');
                        }
                      }}
                      disabled={gems < etherealGachaBoxPrices[category]}
                      size="small"
                      style={{ 
                        flex: 1,
                        opacity: gems < etherealGachaBoxPrices[category] ? 0.5 : 1,
                        backgroundColor: gems >= etherealGachaBoxPrices[category] ? worldColors.primaryColor : 'rgba(100, 116, 139, 0.5)',
                        borderColor: worldColors.borderColor,
                        color: gems >= etherealGachaBoxPrices[category] ? '#0f172a' : '#64748b',
                        boxShadow: gems >= etherealGachaBoxPrices[category] ? `0 0 10px ${worldColors.primaryColor}50` : 'none'
                      }}
                    >
                      💎 Open 1
                    </Button>

                    {/* Max Open Button */}
                    <Button
                      onClick={() => purchaseEtherealGachaBox(category)}
                      disabled={(() => {
                        const { multiOpenBonus } = calculateTotalMultipliers();
                        const openCount = Math.max(1, Math.floor(1 + multiOpenBonus));
                        const totalCost = etherealGachaBoxPrices[category] * openCount;
                        return gems < totalCost;
                      })()}
                      size="small"
                      style={{ 
                        flex: 2,
                        opacity: (() => {
                          const { multiOpenBonus } = calculateTotalMultipliers();
                          const openCount = Math.max(1, Math.floor(1 + multiOpenBonus));
                          const totalCost = etherealGachaBoxPrices[category] * openCount;
                          return gems < totalCost ? 0.5 : 1;
                        })(),
                        backgroundColor: (() => {
                          const { multiOpenBonus } = calculateTotalMultipliers();
                          const openCount = Math.max(1, Math.floor(1 + multiOpenBonus));
                          const totalCost = etherealGachaBoxPrices[category] * openCount;
                          return gems >= totalCost ? worldColors.primaryColor : 'rgba(100, 116, 139, 0.5)';
                        })(),
                        borderColor: worldColors.borderColor,
                        color: (() => {
                          const { multiOpenBonus } = calculateTotalMultipliers();
                          const openCount = Math.max(1, Math.floor(1 + multiOpenBonus));
                          const totalCost = etherealGachaBoxPrices[category] * openCount;
                          return gems >= totalCost ? '#0f172a' : '#64748b';
                        })(),
                        boxShadow: (() => {
                          const { multiOpenBonus } = calculateTotalMultipliers();
                          const openCount = Math.max(1, Math.floor(1 + multiOpenBonus));
                          const totalCost = etherealGachaBoxPrices[category] * openCount;
                          return gems >= totalCost ? `0 0 10px ${worldColors.primaryColor}50` : 'none';
                        })()
                      }}
                    >
                      {(() => {
                        const { multiOpenBonus } = calculateTotalMultipliers();
                        const openCount = Math.max(1, Math.floor(1 + multiOpenBonus));
                        const totalCost = etherealGachaBoxPrices[category] * openCount;
                        
                        if (gems >= totalCost) {
                          return openCount > 1 ? `💎 Max (${openCount})` : `💎 Max (1)`;
                        } else {
                          return `Need ${formatNumber(totalCost - gems)}`;
                        }
                      })()}
                    </Button>
                  </div>
                </Card>
                );
              })}
            </div>
          </>
        )}
      </div>

      {/* Right Side - Enhanced Shop Info Box */}
      <div style={{ 
        width: '50%',
        flexShrink: 0,
        paddingLeft: '0.5rem'
      }}>
        <ShopInfoBox
          username={username}
          gems={gems}
          energy={energy}
          energyMultiplier={calculateTotalMultipliers().energyMult}
          gemMultiplier={calculateTotalMultipliers().gemMult}
          activeWeatherEvents={activeWeatherEvents}
          currentArea={getCurrentArea()}
        />
      </div>
    </div>
    );
  };

  const renderInventoryTab = () => {
    const filteredInventory = filterInventoryByCategory(inventory, inventoryCategory);
    const sortedInventory = sortBy === 'rarity' 
      ? sortInventoryByRarity(filteredInventory)
      : sortInventoryByMultiplier(filteredInventory);

    const getRarityCount = (rarity: string) => {
      return filteredInventory.filter(item => item.rarity === rarity).length;
    };

    // Area-adaptive colors for inventory
    const currentAreaData = getCurrentArea();
    const isLightBackground = (background: string): boolean => {
      const colorMatch = background.match(/#[0-9a-f]{6}/gi);
      if (!colorMatch || colorMatch.length === 0) return false;
      
      const hex = colorMatch[0];
      const r = parseInt(hex.substr(1, 2), 16);
      const g = parseInt(hex.substr(3, 2), 16);
      const b = parseInt(hex.substr(5, 2), 16);
      
      const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
      return luminance > 0.6;
    };

    const isLight = isLightBackground(currentAreaData.background);
    const adaptiveTextColor = isLight ? '#1f2937' : '#e2e8f0';
    const adaptiveAccentColor = isLight ? '#374151' : '#ff8c42';

    return (
      <div style={{ 
        display: 'flex', 
        height: 'calc(100vh - 120px)', 
        padding: '1rem',
        gap: '1rem'
      }}>
        {/* Left Side - Inventory */}
        <div style={{ 
          flex: 1,
          overflowY: 'auto',
          paddingRight: '1rem'
        }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div>
            <h2 style={{ color: adaptiveAccentColor, margin: '0 0 0.5rem 0' }}>🎒 Inventory</h2>
            <div style={{ color: adaptiveTextColor, fontSize: '0.9rem', opacity: 0.7 }}>
              {filteredInventory.length} {inventoryCategory.toLowerCase()} • Sorted by {sortBy === 'rarity' ? 'Rarity' : 'Power'}
            </div>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Button onClick={equipBest} size="small">⚡ Equip Best</Button>
            <Button onClick={unequipAll} variant="danger" size="small">❌ Unequip All</Button>
          </div>
        </div>

        {/* Category Filter with Rarity Counts */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1.5rem' }}>
          {(['Relics', 'Artifacts', 'Weapons', 'Pets'] as ItemCategory[]).map(category => {
            const count = filterInventoryByCategory(inventory, category).length;
            return (
              <Button
                key={category}
                variant={inventoryCategory === category ? 'primary' : 'secondary'}
                onClick={() => setInventoryCategory(category)}
                size="small"
                style={{ position: 'relative' }}
              >
                {category} {count > 0 && `(${count})`}
              </Button>
            );
          })}
        </div>

        {/* Sort Options */}
        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <Button
            variant={sortBy === 'rarity' ? 'primary' : 'secondary'}
            onClick={() => setSortBy('rarity')}
            size="small"
          >
            🌟 Sort by Rarity
          </Button>
          <Button
            variant={sortBy === 'energyMultiplier' ? 'primary' : 'secondary'}
            onClick={() => setSortBy('energyMultiplier')}
            size="small"
          >
            ⚡ Sort by Power
          </Button>
        </div>

        {/* Auto Delete Settings */}
        <div style={{ 
          marginBottom: '1.5rem',
          padding: '1rem',
          background: isLight ? 'rgba(55, 65, 81, 0.1)' : 'rgba(15, 23, 42, 0.6)',
          borderRadius: '8px',
          border: isLight ? '1px solid rgba(55, 65, 81, 0.3)' : '1px solid rgba(79, 195, 247, 0.3)'
        }}>
          <div style={{ 
            color: adaptiveAccentColor, 
            fontSize: '0.9rem', 
            fontWeight: '600', 
            marginBottom: autoDeleteExpanded ? '0.75rem' : '0',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            cursor: 'pointer'
          }}
          onClick={() => setAutoDeleteExpanded(!autoDeleteExpanded)}
          >
            <span style={{ fontSize: '0.8rem', marginRight: '0.5rem' }}>
              {autoDeleteExpanded ? '🔽' : '▶️'}
            </span>
            🗑️ Auto Delete Settings
            <input
              type="checkbox"
              checked={autoDeleteSettings.enabled}
              onChange={(e) => {
                e.stopPropagation();
                setAutoDeleteSettings(prev => ({ ...prev, enabled: e.target.checked }));
              }}
              style={{
                marginLeft: '0.5rem',
                transform: 'scale(1.2)'
              }}
            />
            <span style={{ fontSize: '0.8rem', color: '#e2e8f0' }}>Enable</span>
          </div>
          
          {autoDeleteExpanded && autoDeleteSettings.enabled && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', fontSize: '0.8rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#9ca3af' }}>
                <input
                  type="checkbox"
                  checked={autoDeleteSettings.deleteCommon}
                  onChange={(e) => setAutoDeleteSettings(prev => ({ ...prev, deleteCommon: e.target.checked }))}
                />
                Delete Common
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#10b981' }}>
                <input
                  type="checkbox"
                  checked={autoDeleteSettings.deleteUncommon}
                  onChange={(e) => setAutoDeleteSettings(prev => ({ ...prev, deleteUncommon: e.target.checked }))}
                />
                Delete Uncommon
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#3b82f6' }}>
                <input
                  type="checkbox"
                  checked={autoDeleteSettings.deleteRare}
                  onChange={(e) => setAutoDeleteSettings(prev => ({ ...prev, deleteRare: e.target.checked }))}
                />
                Delete Rare
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#8b5cf6' }}>
                <input
                  type="checkbox"
                  checked={autoDeleteSettings.deleteEpic}
                  onChange={(e) => setAutoDeleteSettings(prev => ({ ...prev, deleteEpic: e.target.checked }))}
                />
                Delete Epic
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#f59e0b' }}>
                <input
                  type="checkbox"
                  checked={autoDeleteSettings.deleteLegendary}
                  onChange={(e) => setAutoDeleteSettings(prev => ({ ...prev, deleteLegendary: e.target.checked }))}
                />
                Delete Legendary
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#ef4444' }}>
                <input
                  type="checkbox"
                  checked={autoDeleteSettings.deleteMythic}
                  onChange={(e) => setAutoDeleteSettings(prev => ({ ...prev, deleteMythic: e.target.checked }))}
                />
                Delete Mythic
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#ec4899' }}>
                <input
                  type="checkbox"
                  checked={autoDeleteSettings.deleteSecret}
                  onChange={(e) => setAutoDeleteSettings(prev => ({ ...prev, deleteSecret: e.target.checked }))}
                />
                Delete Secret
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#22c55e' }}>
                <input
                  type="checkbox"
                  checked={autoDeleteSettings.keepMutated}
                  onChange={(e) => setAutoDeleteSettings(prev => ({ ...prev, keepMutated: e.target.checked }))}
                />
                Keep Special Items (Mutated/Gold/Rainbow)
              </label>
            </div>
          )}
          
          {/* Mass Delete Actions */}
          {autoDeleteExpanded && (
            <div style={{ 
              marginTop: '1rem', 
              paddingTop: '1rem',
              borderTop: '1px solid rgba(79, 195, 247, 0.2)',
              display: 'flex', 
              flexWrap: 'wrap', 
              gap: '0.5rem' 
            }}>
            <Button
              onClick={() => {
                const deletedCount = inventory.filter(item => item.rarity === 'Common').length;
                setInventory(prev => prev.filter(item => item.rarity !== 'Common'));
                showNotification(`🗑️ Deleted ${deletedCount} Common items`);
              }}
              variant="danger"
              size="small"
              disabled={inventory.filter(item => item.rarity === 'Common').length === 0}
            >
              🗑️ Delete All Common
            </Button>
            <Button
              onClick={() => {
                const deletedCount = inventory.filter(item => item.rarity === 'Uncommon').length;
                setInventory(prev => prev.filter(item => item.rarity !== 'Uncommon'));
                showNotification(`🗑️ Deleted ${deletedCount} Uncommon items`);
              }}
              variant="danger"
              size="small"
              disabled={inventory.filter(item => item.rarity === 'Uncommon').length === 0}
            >
              🗑️ Delete All Uncommon
            </Button>
            <Button
              onClick={() => {
                const deletedCount = inventory.filter(item => item.rarity === 'Rare').length;
                setInventory(prev => prev.filter(item => item.rarity !== 'Rare'));
                showNotification(`🗑️ Deleted ${deletedCount} Rare items`);
              }}
              variant="danger"
              size="small"
              disabled={inventory.filter(item => item.rarity === 'Rare').length === 0}
            >
              🗑️ Delete All Rare
            </Button>
            <Button
              onClick={() => {
                const deletedCount = inventory.filter(item => item.rarity === 'Epic').length;
                setInventory(prev => prev.filter(item => item.rarity !== 'Epic'));
                showNotification(`🗑️ Deleted ${deletedCount} Epic items`);
              }}
              variant="danger"
              size="small"
              disabled={inventory.filter(item => item.rarity === 'Epic').length === 0}
            >
              🗑️ Delete All Epic
            </Button>
            <Button
              onClick={() => {
                const deletedCount = inventory.filter(item => item.rarity === 'Legendary').length;
                setInventory(prev => prev.filter(item => item.rarity !== 'Legendary'));
                showNotification(`🗑️ Deleted ${deletedCount} Legendary items`);
              }}
              variant="danger"
              size="small"
              disabled={inventory.filter(item => item.rarity === 'Legendary').length === 0}
            >
              🗑️ Delete All Legendary
            </Button>
            <Button
              onClick={() => {
                const deletedCount = inventory.filter(item => item.rarity === 'Mythic').length;
                setInventory(prev => prev.filter(item => item.rarity !== 'Mythic'));
                showNotification(`🗑️ Deleted ${deletedCount} Mythic items`);
              }}
              variant="danger"
              size="small"
              disabled={inventory.filter(item => item.rarity === 'Mythic').length === 0}
            >
              🗑️ Delete All Mythic
            </Button>
            <Button
              onClick={() => {
                const deletedCount = inventory.filter(item => item.rarity === 'Secret').length;
                setInventory(prev => prev.filter(item => item.rarity !== 'Secret'));
                showNotification(`🗑️ Deleted ${deletedCount} Secret items`);
              }}
              variant="danger"
              size="small"
              disabled={inventory.filter(item => item.rarity === 'Secret').length === 0}
            >
              🗑️ Delete All Secret
            </Button>
            <Button
              onClick={() => {
                const deletedCount = inventory.filter(item => !(item.isMutated || item.isGold || item.isRainbow)).length;
                setInventory(prev => prev.filter(item => item.isMutated || item.isGold || item.isRainbow));
                showNotification(`🗑️ Deleted ${deletedCount} non-mutated items`);
              }}
              variant="danger"
              size="small"
              disabled={inventory.filter(item => !(item.isMutated || item.isGold || item.isRainbow)).length === 0}
            >
              🗑️ Keep Only Special
            </Button>
            </div>
          )}
        </div>

        {/* Rarity Distribution */}
        {filteredInventory.length > 0 && (
          <div style={{ 
            marginBottom: '1.5rem',
            padding: '1rem',
            background: isLight ? 'rgba(55, 65, 81, 0.1)' : 'rgba(26, 54, 93, 0.7)',
            borderRadius: '8px',
            border: isLight ? '1px solid rgba(55, 65, 81, 0.3)' : '1px solid rgba(255, 140, 66, 0.3)'
          }}>
            <div style={{ color: adaptiveAccentColor, fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.5rem' }}>
              Rarity Distribution:
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
              {(['Common', 'Uncommon', 'Rare', 'Epic', 'Legendary', 'Mythic', 'Secret'] as const).map(rarity => {
                const count = getRarityCount(rarity);
                if (count === 0) return null;
                const rarityColors = {
                  Common: '#9ca3af',
                  Uncommon: '#10b981',
                  Rare: '#3b82f6',
                  Epic: '#8b5cf6',
                  Legendary: '#f59e0b',
                  Mythic: '#ef4444',
                  Secret: '#ec4899'
                };
                return (
                  <div 
                    key={rarity}
                    style={{
                      color: rarityColors[rarity],
                      fontSize: '0.8rem',
                      fontWeight: '600',
                      padding: '0.25rem 0.5rem',
                      backgroundColor: `${rarityColors[rarity]}20`,
                      borderRadius: '4px',
                      border: `1px solid ${rarityColors[rarity]}40`
                    }}
                  >
                    {rarity}: {count}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Items Grid */}
        {sortedInventory.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1rem' }}>
            {sortedInventory.map((item, index) => (
              <ItemDisplay 
                key={`${item.id}-${index}`} 
                item={item} 
                showQuantity 
                showMultipliers
                isEquipped={isItemEquipped(item)}
                onEquip={() => equipItem(item)}
                onUnequip={() => unequipItem(item)}
                style={{
                  transition: 'all 0.3s ease',
                  transform: 'scale(1)',
                  cursor: 'pointer'
                }}
                className="inventory-item"
              />
            ))}
          </div>
        ) : (
          <div style={{
            textAlign: 'center',
            padding: '3rem',
            color: adaptiveTextColor,
            background: isLight ? 'rgba(55, 65, 81, 0.05)' : 'rgba(26, 54, 93, 0.3)',
            borderRadius: '12px',
            border: isLight ? '2px dashed rgba(55, 65, 81, 0.3)' : '2px dashed rgba(255, 140, 66, 0.3)'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📦</div>
            <div style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>No {inventoryCategory} Found</div>
            <div style={{ fontSize: '0.9rem' }}>
              Visit the shop to purchase gacha boxes and collect items!
            </div>
          </div>
        )}
        </div>

        {/* Right Side - Mini Info Box */}
        <div style={{ 
          width: '300px',
          flexShrink: 0,
          position: 'sticky',
          top: '1rem',
          height: 'fit-content'
        }}>
          <MiniInfoBox
            username={username}
            gems={gems}
            energy={energy}
            energyMultiplier={calculateTotalMultipliers().energyMult}
            gemMultiplier={calculateTotalMultipliers().gemMult}
            currentArea={getCurrentArea()}
          />
        </div>
      </div>
    );
  };

  const renderUpgradesTab = () => {
    const currentAreaData = getCurrentArea();
    const availableUpgradesList = getAvailableUpgrades();
    
    // Area-adaptive colors
    const isLightBackground = (background: string): boolean => {
      const colorMatch = background.match(/#[0-9a-f]{6}/gi);
      if (!colorMatch || colorMatch.length === 0) return false;
      
      const hex = colorMatch[0];
      const r = parseInt(hex.substr(1, 2), 16);
      const g = parseInt(hex.substr(3, 2), 16);
      const b = parseInt(hex.substr(5, 2), 16);
      
      const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
      return luminance > 0.6;
    };

    const isLight = isLightBackground(currentAreaData.background);
    const adaptiveTextColor = isLight ? '#1f2937' : '#e2e8f0';
    const adaptiveAccentColor = isLight ? '#374151' : '#ff8c42';

    return (
      <div style={{ 
        display: 'flex', 
        height: 'calc(100vh - 120px)', 
        padding: '1rem',
        gap: '1rem'
      }}>
        {/* Left Side - Upgrades */}
        <div style={{ 
          flex: 1,
          overflowY: 'auto',
          paddingRight: '1rem'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <div>
              <h2 style={{ color: adaptiveAccentColor, margin: '0 0 0.5rem 0' }}>⚡ Upgrades</h2>
              <div style={{ color: adaptiveTextColor, fontSize: '0.9rem', opacity: 0.7 }}>
                Permanent improvements to boost your power
              </div>
            </div>
          </div>

          {/* Basic World Upgrades */}
          <div style={{ marginBottom: '3rem' }}>
            <h3 style={{ color: '#22c55e', textAlign: 'center', marginBottom: '1.5rem', fontSize: '1.3rem' }}>
              🌱 Basic Upgrades
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '1rem' }}>
              {availableUpgradesList.filter(upgrade => upgrade.id <= 4).map(upgrade => {
                const currentLevel = upgrades[upgrade.id] || 0;
                const cost = upgrade.cost * Math.pow(1.5, currentLevel);
                const isMaxLevel = currentLevel >= upgrade.maxLevel;
                const canAfford = upgrade.costType === 'gems' ? gems >= cost : energy >= cost;

                const worldColors = {
                  primaryColor: "#22c55e",
                  secondaryColor: "#4ade80",
                  backgroundColor: "rgba(34, 197, 94, 0.15)",
                  borderColor: "#22c55e",
                  textColor: "#dcfce7"
                };

                return (
                  <Card key={`basic-upgrade-${upgrade.id}`} style={{
                    border: `2px solid ${worldColors.borderColor}`,
                    backgroundColor: `rgba(15, 23, 42, 0.95)`,
                    boxShadow: `0 4px 16px rgba(0, 0, 0, 0.3), 0 0 10px ${worldColors.primaryColor}30`
                  }}>
                    <div style={{ marginBottom: '1rem' }}>
                      <h3 style={{ color: worldColors.primaryColor, fontSize: '1.2rem', marginBottom: '0.5rem' }}>
                        {upgrade.name}
                      </h3>
                      <div style={{ color: worldColors.textColor, fontSize: '0.9rem', marginBottom: '0.5rem', opacity: 0.8 }}>
                        {upgrade.description}
                      </div>
                      
                      {/* Current Bonus Display */}
                      {currentLevel > 0 && (
                        <div style={{ 
                          color: worldColors.secondaryColor, 
                          fontSize: '0.85rem', 
                          marginBottom: '1rem',
                          fontWeight: '600',
                          backgroundColor: `${worldColors.primaryColor}15`,
                          padding: '0.5rem',
                          borderRadius: '6px',
                          border: `1px solid ${worldColors.primaryColor}30`
                        }}>
                          Current Bonus: {(() => {
                            const totalBonus = upgrade.value * currentLevel;
                            switch (upgrade.effect) {
                              case 'clickMultiplier':
                                return `+${(totalBonus * 100).toFixed(1)}% click power`;
                              case 'gemChance':
                                return `+${totalBonus.toFixed(1)}% gem chance`;
                              case 'energyMultiplier':
                                return `+${(totalBonus * 100).toFixed(1)}% energy multiplier`;
                              case 'gemMultiplier':
                                return `+${(totalBonus * 100).toFixed(1)}% gem multiplier`;
                              case 'goldChance':
                                return `+${totalBonus.toFixed(2)}% gold chance`;
                              case 'rainbowChance':
                                return `+${totalBonus.toFixed(3)}% rainbow chance`;
                              case 'mutationChance':
                                return `+${totalBonus.toFixed(1)}% mutation chance`;
                              case 'multiOpen':
                                return `Opens ${Math.floor(1 + totalBonus)} boxes at once`;
                              default:
                                return `+${totalBonus.toFixed(2)}`;
                            }
                          })()}
                        </div>
                      )}
                      
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <div style={{ color: worldColors.textColor, fontSize: '0.9rem' }}>
                          Level: <span style={{ color: worldColors.primaryColor, fontWeight: '600' }}>
                            {currentLevel} / {upgrade.maxLevel}
                          </span>
                        </div>
                        <div style={{ color: worldColors.textColor, fontSize: '0.9rem' }}>
                          Cost: <span style={{ color: worldColors.primaryColor, fontWeight: '600' }}>
                            {formatNumber(cost)} {upgrade.costType === 'gems' ? '💎' : '⚡'}
                          </span>
                        </div>
                      </div>

                      <div style={{
                        width: '100%',
                        height: '8px',
                        backgroundColor: 'rgba(100, 116, 139, 0.3)',
                        borderRadius: '4px',
                        overflow: 'hidden',
                        marginBottom: '1rem'
                      }}>
                        <div style={{
                          width: `${(currentLevel / upgrade.maxLevel) * 100}%`,
                          height: '100%',
                          backgroundColor: worldColors.primaryColor,
                          borderRadius: '4px',
                          transition: 'width 0.3s ease'
                        }} />
                      </div>
                    </div>

                    <Button
                      onClick={() => purchaseUpgrade(upgrade.id)}
                      disabled={isMaxLevel || !canAfford}
                      size="small"
                      style={{
                        width: '100%',
                        backgroundColor: 
                          isMaxLevel ? 'rgba(34, 197, 94, 0.7)' :
                          canAfford ? worldColors.primaryColor : 'rgba(100, 116, 139, 0.5)',
                        borderColor: worldColors.borderColor,
                        color: 
                          isMaxLevel ? '#dcfce7' :
                          canAfford ? '#0f172a' : '#64748b',
                        cursor: (isMaxLevel || !canAfford) ? 'not-allowed' : 'pointer',
                        opacity: (isMaxLevel || !canAfford) ? 0.7 : 1,
                        boxShadow: canAfford && !isMaxLevel ? `0 0 10px ${worldColors.primaryColor}50` : 'none'
                      }}
                    >
                      {isMaxLevel ? '✅ MAX LEVEL' : 
                       canAfford ? `⚡ Upgrade` : 
                       `Need ${formatNumber(cost - (upgrade.costType === 'gems' ? gems : energy))} more ${upgrade.costType === 'gems' ? 'gems' : 'energy'}`}
                    </Button>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Ethereal World Upgrades */}
          {currentArea >= 21 && availableUpgradesList.filter(upgrade => upgrade.id > 4).length > 0 && (
            <div style={{ marginBottom: '3rem' }}>
              <h3 style={{ color: '#8b5cf6', textAlign: 'center', marginBottom: '1.5rem', fontSize: '1.3rem' }}>
                🌌 Ethereal Upgrades
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '1rem' }}>
                {availableUpgradesList.filter(upgrade => upgrade.id > 4).map(upgrade => {
                  const currentLevel = upgrades[upgrade.id] || 0;
                  const cost = upgrade.cost * Math.pow(1.5, currentLevel);
                  const isMaxLevel = currentLevel >= upgrade.maxLevel;
                  const canAfford = upgrade.costType === 'gems' ? gems >= cost : energy >= cost;

                  const worldColors = {
                    primaryColor: "#8b5cf6",
                    secondaryColor: "#a78bfa", 
                    backgroundColor: "rgba(139, 92, 246, 0.15)",
                    borderColor: "#8b5cf6",
                    textColor: "#ede9fe"
                  };

                  return (
                    <Card key={`ethereal-upgrade-${upgrade.id}`} style={{
                      border: `2px solid ${worldColors.borderColor}`,
                      backgroundColor: `rgba(15, 23, 42, 0.95)`,
                      boxShadow: `0 4px 16px rgba(0, 0, 0, 0.3), 0 0 10px ${worldColors.primaryColor}30`
                    }}>
                      <div style={{ marginBottom: '1rem' }}>
                        <h3 style={{ color: worldColors.primaryColor, fontSize: '1.2rem', marginBottom: '0.5rem' }}>
                          {upgrade.name}
                        </h3>
                        <div style={{ color: worldColors.textColor, fontSize: '0.9rem', marginBottom: '0.5rem', opacity: 0.8 }}>
                          {upgrade.description}
                        </div>
                        
                        {/* Current Bonus Display */}
                        {currentLevel > 0 && (
                          <div style={{ 
                            color: worldColors.secondaryColor, 
                            fontSize: '0.85rem', 
                            marginBottom: '1rem',
                            fontWeight: '600',
                            backgroundColor: `${worldColors.primaryColor}15`,
                            padding: '0.5rem',
                            borderRadius: '6px',
                            border: `1px solid ${worldColors.primaryColor}30`
                          }}>
                            Current Bonus: {(() => {
                              const totalBonus = upgrade.value * currentLevel;
                              switch (upgrade.effect) {
                                case 'clickMultiplier':
                                  return `+${(totalBonus * 100).toFixed(1)}% click power`;
                                case 'gemChance':
                                  return `+${totalBonus.toFixed(1)}% gem chance`;
                                case 'energyMultiplier':
                                  return `+${(totalBonus * 100).toFixed(1)}% energy multiplier`;
                                case 'gemMultiplier':
                                  return `+${(totalBonus * 100).toFixed(1)}% gem multiplier`;
                                case 'goldChance':
                                  return `+${totalBonus.toFixed(2)}% gold chance`;
                                case 'rainbowChance':
                                  return `+${totalBonus.toFixed(3)}% rainbow chance`;
                                case 'mutationChance':
                                  return `+${totalBonus.toFixed(1)}% mutation chance`;
                                case 'multiOpen':
                                  return `Opens ${Math.floor(1 + totalBonus)} boxes at once`;
                                default:
                                  return `+${totalBonus.toFixed(2)}`;
                              }
                            })()}
                          </div>
                        )}
                        
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                          <div style={{ color: worldColors.textColor, fontSize: '0.9rem' }}>
                            Level: <span style={{ color: worldColors.primaryColor, fontWeight: '600' }}>
                              {currentLevel} / {upgrade.maxLevel}
                            </span>
                          </div>
                          <div style={{ color: worldColors.textColor, fontSize: '0.9rem' }}>
                            Cost: <span style={{ color: worldColors.primaryColor, fontWeight: '600' }}>
                              {formatNumber(cost)} {upgrade.costType === 'gems' ? '💎' : '⚡'}
                            </span>
                          </div>
                        </div>

                        <div style={{
                          width: '100%',
                          height: '8px',
                          backgroundColor: 'rgba(100, 116, 139, 0.3)',
                          borderRadius: '4px',
                          overflow: 'hidden',
                          marginBottom: '1rem'
                        }}>
                          <div style={{
                            width: `${(currentLevel / upgrade.maxLevel) * 100}%`,
                            height: '100%',
                            backgroundColor: worldColors.primaryColor,
                            borderRadius: '4px',
                            transition: 'width 0.3s ease'
                          }} />
                        </div>
                      </div>

                      <Button
                        onClick={() => purchaseUpgrade(upgrade.id)}
                        disabled={isMaxLevel || !canAfford}
                        size="small"
                        style={{
                          width: '100%',
                          backgroundColor: 
                            isMaxLevel ? 'rgba(139, 92, 246, 0.7)' :
                            canAfford ? worldColors.primaryColor : 'rgba(100, 116, 139, 0.5)',
                          borderColor: worldColors.borderColor,
                          color: 
                            isMaxLevel ? '#ede9fe' :
                            canAfford ? '#0f172a' : '#64748b',
                          cursor: (isMaxLevel || !canAfford) ? 'not-allowed' : 'pointer',
                          opacity: (isMaxLevel || !canAfford) ? 0.7 : 1,
                          boxShadow: canAfford && !isMaxLevel ? `0 0 10px ${worldColors.primaryColor}50` : 'none'
                        }}
                      >
                        {isMaxLevel ? '✅ MAX LEVEL' : 
                         canAfford ? `⚡ Upgrade` : 
                         `Need ${formatNumber(cost - (upgrade.costType === 'gems' ? gems : energy))} more ${upgrade.costType === 'gems' ? 'gems' : 'energy'}`}
                      </Button>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Right Side - Mini Info Box */}
        <div style={{ 
          width: '300px',
          flexShrink: 0,
          position: 'sticky',
          top: '1rem',
          height: 'fit-content'
        }}>
          <MiniInfoBox
            username={username}
            gems={gems}
            energy={energy}
            energyMultiplier={calculateTotalMultipliers().energyMult}
            gemMultiplier={calculateTotalMultipliers().gemMult}
            currentArea={getCurrentArea()}
          />
        </div>
      </div>
    );
  };

  // Main component logic - login check and return
  if (!isLoggedIn) {
    return renderLoginScreen();
  }

  return (
    <div style={{
      height: '100vh',
      width: '100vw',
      background: getCurrentArea().background,
      filter: getWeatherAreaEffects(activeWeatherEvents).filter,
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Info Box - Only show on game tab */}
      {activeTab === 'game' && (
        <InfoBox
          username={username}
          gems={gems}
          energy={energy}
          energyMultiplier={calculateTotalMultipliers().energyMult}
          gemMultiplier={calculateTotalMultipliers().gemMult}
          activeWeatherEvents={activeWeatherEvents}
          currentArea={getCurrentArea()}
          onSave={() => {
            const gameState: GameState = {
              clickCount,
              gems,
              energy,
              currentArea,
              equipped,
              inventory,
              upgrades,
              username,
              lastSaved: Date.now()
            };
            
            const password = localStorage.getItem(`animeClicker_pass_${username}`);
            if (password) {
              saveGame(gameState, password);
              showNotification('💾 Game saved successfully!');
            }
          }}
          onLogout={handleLogout}
        />
      )}

      {/* Left Side Area Dropdown Overlay */}
      {areaDropdownOpen && (() => {
        // Area-adaptive colors for dropdown
        const currentAreaData = getCurrentArea();
        const isLightBackground = (background: string): boolean => {
          const colorMatch = background.match(/#[0-9a-f]{6}/gi);
          if (!colorMatch || colorMatch.length === 0) return false;
          
          const hex = colorMatch[0];
          const r = parseInt(hex.substr(1, 2), 16);
          const g = parseInt(hex.substr(3, 2), 16);
          const b = parseInt(hex.substr(5, 2), 16);
          
          const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
          return luminance > 0.6;
        };

        const isLight = isLightBackground(currentAreaData.background);
        const adaptiveTextColor = isLight ? '#1f2937' : '#e2e8f0';
        const adaptiveAccentColor = isLight ? '#374151' : '#4fc3f7';
        const adaptiveBorderColor = isLight ? 'rgba(55, 65, 81, 0.5)' : 'rgba(79, 195, 247, 0.5)';
        
        return (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '400px',
          height: '100vh',
          background: currentAreaData.background,
          borderRight: `3px solid ${adaptiveAccentColor}`,
          zIndex: 1002,
          display: 'flex',
          flexDirection: 'column',
          backdropFilter: 'blur(15px)',
          boxShadow: '4px 0 20px rgba(0, 0, 0, 0.5)'
        }}>
          {/* Header */}
          <div style={{
            padding: '1.5rem',
            borderBottom: `2px solid ${adaptiveAccentColor}`,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <h2 style={{ 
              color: adaptiveAccentColor, 
              fontSize: '1.3rem', 
              margin: 0,
              fontWeight: '600'
            }}>
              🗺️ Area Navigation
            </h2>
            <Button
              onClick={() => setAreaDropdownOpen(false)}
              style={{
                backgroundColor: isLight ? 'rgba(220, 38, 38, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                borderColor: isLight ? '#dc2626' : '#ef4444',
                color: isLight ? '#dc2626' : '#ef4444',
                fontSize: '0.9rem',
                padding: '0.5rem 1rem'
              }}
            >
              ✕ Close
            </Button>
          </div>

          {/* Current Area Info */}
          <div style={{
            padding: '1rem 1.5rem',
            backgroundColor: isLight ? 'rgba(55, 65, 81, 0.1)' : 'rgba(255, 140, 66, 0.1)',
            borderBottom: `1px solid ${adaptiveBorderColor}`
          }}>
            <div style={{ color: adaptiveAccentColor, fontSize: '1rem', fontWeight: '600', marginBottom: '0.25rem' }}>
              Current: {getCurrentArea().name}
            </div>
            <div style={{ color: adaptiveTextColor, fontSize: '0.85rem', opacity: 0.8 }}>
              Area #{currentArea} • {getCurrentArea().description}
            </div>
            <div style={{ color: adaptiveAccentColor, fontSize: '0.8rem', marginTop: '0.5rem' }}>
              Energy Mult: {getCurrentArea().energyMultiplier}x • Gem Mult: {getCurrentArea().gemMultiplier}x
            </div>
          </div>

          {/* Areas List */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '0.5rem'
          }}>
            {areas.map(area => {
              const canAccess = energy >= area.requiredEnergy;
              const isCurrent = area.id === currentArea;
              
              return (
                <div
                  key={area.id}
                  onClick={() => {
                    if (canAccess) {
                      progressToArea(area.id);
                      setAreaDropdownOpen(false);
                    }
                  }}
                  style={{
                    margin: '0.25rem',
                    padding: '1rem',
                    borderRadius: '8px',
                    cursor: canAccess ? 'pointer' : 'not-allowed',
                    backgroundColor: isCurrent 
                      ? (isLight ? 'rgba(55, 65, 81, 0.25)' : 'rgba(255, 140, 66, 0.25)') 
                      : canAccess 
                      ? (isLight ? 'rgba(55, 65, 81, 0.1)' : 'rgba(79, 195, 247, 0.1)') 
                      : 'rgba(100, 116, 139, 0.1)',
                    border: isCurrent 
                      ? `2px solid ${adaptiveAccentColor}`
                      : canAccess 
                      ? `1px solid ${adaptiveBorderColor}` 
                      : '1px solid rgba(100, 116, 139, 0.2)',
                    color: isCurrent 
                      ? adaptiveAccentColor 
                      : canAccess 
                      ? adaptiveTextColor 
                      : '#64748b',
                    opacity: canAccess ? 1 : 0.6,
                    transition: 'all 0.3s ease',
                    transform: 'scale(1)'
                  }}
                  onMouseEnter={(e) => {
                    if (canAccess && !isCurrent) {
                      e.currentTarget.style.backgroundColor = isLight ? 'rgba(55, 65, 81, 0.2)' : 'rgba(79, 195, 247, 0.2)';
                      e.currentTarget.style.transform = 'scale(1.02)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isCurrent) {
                      e.currentTarget.style.backgroundColor = canAccess 
                        ? (isLight ? 'rgba(55, 65, 81, 0.1)' : 'rgba(79, 195, 247, 0.1)') 
                        : 'rgba(100, 116, 139, 0.1)';
                      e.currentTarget.style.transform = 'scale(1)';
                    }
                  }}
                >
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'flex-start',
                    marginBottom: '0.5rem'
                  }}>
                    <div>
                      <div style={{ fontWeight: '600', fontSize: '1rem', marginBottom: '0.25rem' }}>
                        {area.name} #{area.id}
                        {isCurrent && <span style={{ color: adaptiveAccentColor, marginLeft: '0.5rem' }}>← Current</span>}
                      </div>
                      <div style={{ fontSize: '0.8rem', opacity: 0.9, marginBottom: '0.5rem' }}>
                        {area.description}
                      </div>
                      <div style={{ fontSize: '0.75rem', display: 'flex', gap: '1rem' }}>
                        <span>⚡ {area.energyMultiplier}x</span>
                        <span>💎 {area.gemMultiplier}x</span>
                      </div>
                    </div>
                  </div>
                  
                  <div style={{ textAlign: 'right', fontSize: '0.8rem' }}>
                    {area.requiredEnergy === 0 ? (
                      <span style={{ color: '#22c55e' }}>✅ Free Access</span>
                    ) : canAccess ? (
                      <span style={{ color: '#22c55e' }}>✅ {formatNumber(area.requiredEnergy)} energy</span>
                    ) : (
                      <div>
                        <div style={{ color: '#ef4444', fontSize: '0.75rem' }}>
                          🔒 Need {formatNumber(area.requiredEnergy)} energy
                        </div>
                        <div style={{ color: '#ef4444', fontSize: '0.7rem', marginTop: '0.25rem' }}>
                          Missing: {formatNumber(area.requiredEnergy - energy)}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        );
      })()}

      {/* Notification */}
      {notification && (
        <div style={{
          position: 'fixed',
          top: '1rem',
          left: '1rem',
          backgroundColor: 'rgba(15, 23, 42, 0.95)',
          color: '#ff8c42',
          padding: '1rem 1.5rem',
          borderRadius: '8px',
          border: '2px solid #ff8c42',
          zIndex: 1001,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), 0 0 20px rgba(255, 140, 66, 0.3)',
          textAlign: 'left',
          maxWidth: '400px',
          backdropFilter: 'blur(10px)',
          animation: 'fadeIn 0.3s ease-in'
        }}>
          {notification}
        </div>
      )}

      {/* Tab Navigation */}
      <div style={{ display: 'flex', justifyContent: 'center', padding: '1rem', backgroundColor: 'rgba(0, 0, 0, 0.3)' }}>
        {(['game', 'shop', 'inventory', 'upgrades'] as TabType[]).map(tab => (
          <Button
            key={tab}
            variant={activeTab === tab ? 'primary' : 'secondary'}
            onClick={() => setActiveTab(tab)}
            style={{ margin: '0 0.5rem', textTransform: 'capitalize' }}
          >
            {tab}
          </Button>
        ))}
      </div>

      {/* Tab Content */}
      <div style={{ flex: 1, overflow: 'auto' }}>
        {activeTab === 'game' && renderGameTab()}
        {activeTab === 'shop' && renderShopTab()}
        {activeTab === 'inventory' && renderInventoryTab()}
        {activeTab === 'upgrades' && renderUpgradesTab()}
      </div>
    </div>
  );
};

export default AnimeClickerGame;