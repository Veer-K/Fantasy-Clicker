import type { InventoryItem, EquippedItems, ItemCategory } from '../types';
import { availableItems } from '../data/items';

// Migrate inventory items to use current stats from availableItems
export const migrateInventoryStats = (inventory: InventoryItem[], equipped: EquippedItems) => {
  const itemMap = new Map(availableItems.map(item => [item.id, item]));
  
  // Update inventory items
  const updatedInventory = inventory.map((invItem, index) => {
    const currentItem = itemMap.get(invItem.id);
    if (currentItem) {
      return {
        ...invItem,
        instanceId: invItem.instanceId || `${invItem.id}_migration_${Date.now()}_${index}`,
        energyMultiplier: currentItem.energyMultiplier,
        gemMultiplier: currentItem.gemMultiplier,
        price: currentItem.price,
        gemPrice: currentItem.gemPrice
      };
    }
    return {
      ...invItem,
      instanceId: invItem.instanceId || `${invItem.id}_migration_${Date.now()}_${index}`
    };
  });
  
  // Update equipped items
  const updatedEquipped = { ...equipped };
  
  if (equipped.weapon) {
    const currentWeapon = itemMap.get(equipped.weapon.id);
    if (currentWeapon) {
      updatedEquipped.weapon = {
        ...equipped.weapon,
        instanceId: equipped.weapon.instanceId || `${equipped.weapon.id}_equipped_weapon_${Date.now()}`,
        energyMultiplier: currentWeapon.energyMultiplier,
        gemMultiplier: currentWeapon.gemMultiplier
      };
    }
  }
  
  if (equipped.artifact) {
    const currentArtifact = itemMap.get(equipped.artifact.id);
    if (currentArtifact) {
      updatedEquipped.artifact = {
        ...equipped.artifact,
        instanceId: equipped.artifact.instanceId || `${equipped.artifact.id}_equipped_artifact_${Date.now()}`,
        energyMultiplier: currentArtifact.energyMultiplier,
        gemMultiplier: currentArtifact.gemMultiplier
      };
    }
  }
  
  if (equipped.relic) {
    const currentRelic = itemMap.get(equipped.relic.id);
    if (currentRelic) {
      updatedEquipped.relic = {
        ...equipped.relic,
        instanceId: equipped.relic.instanceId || `${equipped.relic.id}_equipped_relic_${Date.now()}`,
        energyMultiplier: currentRelic.energyMultiplier,
        gemMultiplier: currentRelic.gemMultiplier
      };
    }
  }
  
  // Update pets
  updatedEquipped.pets = equipped.pets.map((pet, index) => {
    if (pet) {
      const currentPet = itemMap.get(pet.id);
      if (currentPet) {
        return {
          ...pet,
          instanceId: pet.instanceId || `${pet.id}_equipped_pet_${index}_${Date.now()}`,
          energyMultiplier: currentPet.energyMultiplier,
          gemMultiplier: currentPet.gemMultiplier
        };
      }
    }
    return pet;
  });
  
  return { updatedInventory, updatedEquipped };
};

export const equipBestItems = (inventory: InventoryItem[]): EquippedItems => {
  // Find best weapon
  const bestWeapon = inventory
    .filter(item => item.category === 'Weapons')
    .sort((a, b) => b.energyMultiplier - a.energyMultiplier)[0];
  
  // Find best artifact
  const bestArtifact = inventory
    .filter(item => item.category === 'Artifacts')
    .sort((a, b) => b.energyMultiplier - a.energyMultiplier)[0];
  
  // Find best relic
  const bestRelic = inventory
    .filter(item => item.category === 'Relics')
    .sort((a, b) => b.energyMultiplier - a.energyMultiplier)[0];
  
  // Find best 3 pets
  const bestPets = inventory
    .filter(item => item.category === 'Pets')
    .sort((a, b) => b.energyMultiplier - a.energyMultiplier)
    .slice(0, 3);

  return {
    weapon: bestWeapon || null,
    artifact: bestArtifact || null,
    relic: bestRelic || null,
    pets: [
      bestPets[0] || null,
      bestPets[1] || null,
      bestPets[2] || null
    ]
  };
};

export const createEmptyEquipment = (): EquippedItems => ({
  weapon: null,
  artifact: null,
  relic: null,
  pets: [null, null, null]
});

export const calculateEquipmentMultipliers = (equipped: EquippedItems) => {
  let energyMult = 1;
  let gemMult = 1;
  
  // Calculate multipliers from equipped items only
  if (equipped.weapon) {
    energyMult *= equipped.weapon.energyMultiplier;
    gemMult *= equipped.weapon.gemMultiplier;
  }
  if (equipped.artifact) {
    energyMult *= equipped.artifact.energyMultiplier;
    gemMult *= equipped.artifact.gemMultiplier;
  }
  if (equipped.relic) {
    energyMult *= equipped.relic.energyMultiplier;
    gemMult *= equipped.relic.gemMultiplier;
  }
  equipped.pets.forEach(pet => {
    if (pet) {
      energyMult *= pet.energyMultiplier;
      gemMult *= pet.gemMultiplier;
    }
  });
  
  return { energyMult, gemMult };
};

export const sortInventoryByRarity = (inventory: InventoryItem[]) => {
  const rarityOrder: Record<string, number> = {
    'Common': 1,
    'Uncommon': 2,
    'Rare': 3,
    'Epic': 4,
    'Legendary': 5,
    'Mythic': 6,
    'Secret': 7
  };

  return [...inventory].sort((a, b) => {
    const rarityDiff = rarityOrder[b.rarity] - rarityOrder[a.rarity];
    if (rarityDiff !== 0) return rarityDiff;
    return b.energyMultiplier - a.energyMultiplier;
  });
};

export const sortInventoryByMultiplier = (inventory: InventoryItem[]) => {
  return [...inventory].sort((a, b) => b.energyMultiplier - a.energyMultiplier);
};

export const filterInventoryByCategory = (inventory: InventoryItem[], category: ItemCategory) => {
  return inventory.filter(item => item.category === category);
};