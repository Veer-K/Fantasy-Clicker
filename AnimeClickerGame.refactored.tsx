import React, { useState, useEffect, useRef, useCallback } from 'react';
import type { 
  Rarity, 
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
  etherealGachaBoxPrices,
  cosmicGachaBoxPrices,
  transcendentGachaBoxPrices,
  absoluteGachaBoxPrices
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
  generateWeatherForecast,
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
import { Button, Card, Input, ItemDisplay } from './components';
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
  const [notification, setNotification] = useState<string | null>(null);
  const [upgrades, setUpgrades] = useState<Record<number, number>>({});

  // Weather System
  const [activeWeatherEvents, setActiveWeatherEvents] = useState<WeatherEvent[]>([]);
  const [weatherForecast, setWeatherForecast] = useState<Omit<WeatherEvent, 'id' | 'startTime' | 'duration'>[]>([]);

  // Auto Delete System
  const [autoDeleteSettings, setAutoDeleteSettings] = useState<AutoDeleteSettings>({
    enabled: false,
    deleteCommon: false,
    deleteUncommon: false,
    deleteRare: false,
    keepMutated: true
  });

  // UI state
  const [isClicked, setIsClicked] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Sample areas data (simplified for demo)
  const [areas] = useState<Area[]>([
    {
      id: 1,
      name: "Beginner's Meadow",
      description: "A peaceful green meadow where new adventurers start their journey.",
      requiredEnergy: 0,
      energyMultiplier: 1.0,
      gemMultiplier: 1.0,
      background: 'linear-gradient(135deg, #4ade80 0%, #22c55e 50%, #16a34a 100%)'
    },
    // Add more areas as needed
  ]);

  // Sample upgrades data (simplified for demo)
  const [availableUpgrades] = useState<Upgrade[]>([
    {
      id: 1,
      name: 'Click Power',
      description: 'Increases energy gained per click',
      cost: 100,
      costType: 'gems',
      effect: 'clickMultiplier',
      value: 0.1,
      maxLevel: 50
    },
    // Add more upgrades as needed
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

  const calculateTotalMultipliers = () => {
    let energyMult = 1;
    let gemMult = 1;
    let clickMult = 1;
    let gemChanceBonus = 0;
    
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
        }
      }
    });
    
    return { energyMult, gemMult, clickMult, gemChanceBonus };
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

  // Gacha functions
  const purchaseGachaBox = (category: ItemCategory) => {
    const cost = gachaBoxPrices[category];
    
    if (gems >= cost) {
      const rarity = rollRarity();
      // Only get first world items (id < 43)
      const availableItemsForCategory = availableItems.filter(item => 
        item.category === category && item.rarity === rarity && item.id < 43
      );
      
      if (availableItemsForCategory.length > 0) {
        const selectedItem = availableItemsForCategory[Math.floor(Math.random() * availableItemsForCategory.length)];
        const newItem: InventoryItem = {
          ...selectedItem,
          quantity: 1,
          level: 1
        };

        // Apply weather mutations
        const mutatedItem = mutateItem(newItem, activeWeatherEvents);
        
        setInventory(prev => [...prev, mutatedItem]);
        setGems(prev => prev - cost);
        showNotification(`🎁 Acquired ${mutatedItem.name} (${mutatedItem.rarity})!`);
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

    // Generate weather forecast
    const forecastInterval = setInterval(() => {
      setWeatherForecast(generateWeatherForecast());
    }, 60000); // Update forecast every minute

    // Cleanup expired weather events
    const cleanupInterval = setInterval(() => {
      setActiveWeatherEvents(prev => cleanupExpiredWeatherEvents(prev));
    }, 10000); // Check every 10 seconds

    return () => {
      clearInterval(weatherInterval);
      clearInterval(forecastInterval);
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

  const renderGameTab = () => (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      padding: '2rem'
    }}>
      {/* Stats Display */}
      <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <div style={{ color: '#4fc3f7', fontSize: '1.5rem', marginBottom: '1rem' }}>
          ⚡ Energy: {energy.toLocaleString()}
        </div>
        <div style={{ color: '#ff8c42', fontSize: '1.2rem' }}>
          💎 Gems: {gems.toLocaleString()}
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

      {/* Logout Button */}
      <Button
        onClick={handleLogout}
        variant="danger"
        style={{ marginTop: '2rem' }}
      >
        Logout
      </Button>
    </div>
  );

  const renderShopTab = () => (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ color: '#ff8c42', textAlign: 'center', marginBottom: '2rem' }}>
        Gacha Shop
      </h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
        {(['Relics', 'Artifacts', 'Weapons', 'Pets'] as ItemCategory[]).map(category => (
          <Card key={category} title={category}>
            <p style={{ color: '#e2e8f0', marginBottom: '1rem' }}>
              Cost: {gachaBoxPrices[category]} gems
            </p>
            <Button
              onClick={() => purchaseGachaBox(category)}
              disabled={gems < gachaBoxPrices[category]}
              style={{ width: '100%' }}
            >
              Purchase {category} Box
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderInventoryTab = () => {
    const filteredInventory = filterInventoryByCategory(inventory, inventoryCategory);
    const sortedInventory = sortBy === 'rarity' 
      ? sortInventoryByRarity(filteredInventory)
      : sortInventoryByMultiplier(filteredInventory);

    return (
      <div style={{ padding: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h2 style={{ color: '#ff8c42', margin: 0 }}>Inventory</h2>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Button onClick={equipBest}>Equip Best</Button>
            <Button onClick={unequipAll} variant="danger">Unequip All</Button>
          </div>
        </div>

        {/* Category Filter */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
          {(['Relics', 'Artifacts', 'Weapons', 'Pets'] as ItemCategory[]).map(category => (
            <Button
              key={category}
              variant={inventoryCategory === category ? 'primary' : 'secondary'}
              onClick={() => setInventoryCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Items Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
          {sortedInventory.map((item, index) => (
            <ItemDisplay key={`${item.id}-${index}`} item={item} showQuantity showMultipliers />
          ))}
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
      {/* Notification */}
      {notification && (
        <div style={{
          position: 'fixed',
          top: '2rem',
          right: '2rem',
          backgroundColor: 'rgba(26, 54, 93, 0.95)',
          color: '#ff8c42',
          padding: '1rem',
          borderRadius: '8px',
          border: '2px solid #ff8c42',
          zIndex: 1000,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
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
        {activeTab === 'upgrades' && <div style={{ padding: '2rem', textAlign: 'center', color: '#e2e8f0' }}>Upgrades coming soon...</div>}
      </div>
    </div>
  );
};

export default AnimeClickerGame;