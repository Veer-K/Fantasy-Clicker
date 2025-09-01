import type { InventoryItem, EquippedItems, AutoDeleteSettings } from '../types';
import { migrateInventoryStats } from './inventory';

export interface GameState {
  clickCount: number;
  gems: number;
  energy: number;
  currentArea: number;
  equipped: EquippedItems;
  inventory: InventoryItem[];
  upgrades: Record<number, number>;
  autoDeleteSettings?: AutoDeleteSettings;
  username: string;
  lastSaved: number;
}

export interface AuthResult {
  success: boolean;
  message: string;
  gameState?: GameState;
}

export const saveGame = (gameState: GameState, password: string): void => {
  localStorage.setItem(`animeClicker_${gameState.username}`, JSON.stringify(gameState));
  localStorage.setItem(`animeClicker_pass_${gameState.username}`, password);
};

export const loadGame = (playerName: string, password: string): AuthResult => {
  const savedPassword = localStorage.getItem(`animeClicker_pass_${playerName}`);
  const saved = localStorage.getItem(`animeClicker_${playerName}`);
  
  if (saved && savedPassword) {
    if (savedPassword === password) {
      const gameState = JSON.parse(saved);
      
      // Load and migrate inventory/equipped items to current stats
      const defaultEquipped: EquippedItems = {
        weapon: null,
        artifact: null,
        relic: null,
        pets: [null, null, null]
      };
      
      const loadedInventory = gameState.inventory || [];
      const loadedEquipped = gameState.equipped || defaultEquipped;
      
      // Migrate stats to current values
      const { updatedInventory, updatedEquipped } = migrateInventoryStats(loadedInventory, loadedEquipped);
      
      const migratedGameState: GameState = {
        clickCount: gameState.clickCount || 0,
        gems: gameState.gems || 0,
        energy: gameState.energy || 0,
        currentArea: gameState.currentArea || 1,
        upgrades: gameState.upgrades || {},
        inventory: updatedInventory,
        equipped: updatedEquipped,
        autoDeleteSettings: gameState.autoDeleteSettings || {
          enabled: false,
          deleteCommon: false,
          deleteUncommon: false,
          deleteRare: false,
          keepMutated: true
        },
        username: playerName,
        lastSaved: gameState.lastSaved || Date.now()
      };
      
      return {
        success: true,
        message: `🎮 Welcome back, ${playerName}!`,
        gameState: migratedGameState
      };
    } else {
      return {
        success: false,
        message: 'Wrong password!'
      };
    }
  }
  return {
    success: false,
    message: 'Username not found! Please register first or check your username.'
  };
};

export const registerUser = (playerName: string, password: string): AuthResult => {
  if (playerName.trim().length < 3 || password.trim().length < 3) {
    return {
      success: false,
      message: 'Username and password must be at least 3 characters long.'
    };
  }

  // Check if user already exists
  const existingUser = localStorage.getItem(`animeClicker_pass_${playerName}`);
  if (existingUser) {
    return {
      success: false,
      message: 'Username already exists! Please choose a different username or switch to login.'
    };
  }
  
  // Create fresh game state for new user
  const newGameState: GameState = {
    clickCount: 0,
    gems: 0,
    energy: 0,
    currentArea: 1,
    equipped: {
      weapon: null,
      artifact: null,
      relic: null,
      pets: [null, null, null]
    },
    inventory: [],
    upgrades: {},
    username: playerName,
    lastSaved: Date.now()
  };
  
  // Save new user
  saveGame(newGameState, password);
  
  return {
    success: true,
    message: '🎉 Welcome! Your account has been created successfully!',
    gameState: newGameState
  };
};

export const loginUser = (playerName: string, password: string): AuthResult => {
  if (playerName.trim().length < 3 || password.trim().length < 3) {
    return {
      success: false,
      message: 'Username and password must be at least 3 characters long.'
    };
  }

  return loadGame(playerName.trim(), password.trim());
};

export const createEmptyGameState = (): Omit<GameState, 'username' | 'lastSaved'> => ({
  clickCount: 0,
  gems: 0,
  energy: 0,
  currentArea: 1,
  equipped: {
    weapon: null,
    artifact: null,
    relic: null,
    pets: [null, null, null]
  },
  inventory: [],
  upgrades: {},
  autoDeleteSettings: {
    enabled: false,
    deleteCommon: false,
    deleteUncommon: false,
    deleteRare: false,
    keepMutated: true
  }
});

export const validateCredentials = (username: string, password: string): boolean => {
  return username.trim().length >= 3 && password.trim().length >= 3;
};