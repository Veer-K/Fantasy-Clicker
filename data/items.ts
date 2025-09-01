import type { ShopItem } from '../types';

export const availableItems: ShopItem[] = [
  // Relics
  { id: 1, name: 'Broken Stone Tablet', category: 'Relics', rarity: 'Common', price: 0, gemPrice: 0, energyMultiplier: 1.15, gemMultiplier: 1.1, description: 'A cracked tablet with faded inscriptions' },
  { id: 2, name: 'Ancient Scroll', category: 'Relics', rarity: 'Uncommon', price: 0, gemPrice: 0, energyMultiplier: 1.35, gemMultiplier: 1.25, description: 'An old scroll that radiates power' },
  { id: 3, name: 'Crystal Orb', category: 'Relics', rarity: 'Rare', price: 0, gemPrice: 0, energyMultiplier: 1.8, gemMultiplier: 1.6, description: 'A mystical orb pulsing with energy' },
  { id: 4, name: 'Golden Chalice', category: 'Relics', rarity: 'Epic', price: 0, gemPrice: 0, energyMultiplier: 2.5, gemMultiplier: 2.2, description: 'A chalice blessed by ancient gods' },
  { id: 5, name: 'Divine Altar', category: 'Relics', rarity: 'Legendary', price: 0, gemPrice: 0, energyMultiplier: 3.5, gemMultiplier: 3.0, description: 'An altar that channels divine power' },
  { id: 6, name: 'World Tree Branch', category: 'Relics', rarity: 'Mythic', price: 0, gemPrice: 0, energyMultiplier: 5.0, gemMultiplier: 4.2, description: 'A branch from the legendary World Tree' },
  { id: 7, name: 'Genesis Stone', category: 'Relics', rarity: 'Secret', price: 0, gemPrice: 0, energyMultiplier: 8.0, gemMultiplier: 7.0, description: 'The primordial stone of creation' },
  
  // Artifacts (Highest multipliers)
  { id: 8, name: 'Worn Ring', category: 'Artifacts', rarity: 'Common', price: 0, gemPrice: 0, energyMultiplier: 1.25, gemMultiplier: 1.2, description: 'A simple ring showing signs of wear' },
  { id: 9, name: 'Power Ring', category: 'Artifacts', rarity: 'Uncommon', price: 0, gemPrice: 0, energyMultiplier: 1.5, gemMultiplier: 1.4, description: 'A ring that amplifies your strength' },
  { id: 10, name: 'Mystic Amulet', category: 'Artifacts', rarity: 'Rare', price: 0, gemPrice: 0, energyMultiplier: 2.2, gemMultiplier: 1.9, description: 'An amulet blessed by ancient magic' },
  { id: 11, name: 'Crown of Kings', category: 'Artifacts', rarity: 'Epic', price: 0, gemPrice: 0, energyMultiplier: 3.2, gemMultiplier: 2.8, description: 'A crown worn by ancient kings' },
  { id: 12, name: 'Crown of Legends', category: 'Artifacts', rarity: 'Legendary', price: 0, gemPrice: 0, energyMultiplier: 4.5, gemMultiplier: 3.8, description: 'A crown worn by legendary heroes' },
  { id: 13, name: 'Infinity Gauntlet', category: 'Artifacts', rarity: 'Mythic', price: 0, gemPrice: 0, energyMultiplier: 6.5, gemMultiplier: 5.5, description: 'A gauntlet that controls reality itself' },
  { id: 14, name: 'Heart of Universe', category: 'Artifacts', rarity: 'Secret', price: 0, gemPrice: 0, energyMultiplier: 10.0, gemMultiplier: 8.5, description: 'The core essence of the universe' },
  
  // Weapons
  { id: 15, name: 'Rusty Dagger', category: 'Weapons', rarity: 'Common', price: 0, gemPrice: 0, energyMultiplier: 1.1, gemMultiplier: 1.08, description: 'A dull blade covered in rust' },
  { id: 16, name: 'Iron Sword', category: 'Weapons', rarity: 'Uncommon', price: 0, gemPrice: 0, energyMultiplier: 1.3, gemMultiplier: 1.2, description: 'A sturdy iron blade' },
  { id: 17, name: 'Silver Katana', category: 'Weapons', rarity: 'Rare', price: 0, gemPrice: 0, energyMultiplier: 1.7, gemMultiplier: 1.5, description: 'A gleaming silver katana' },
  { id: 18, name: 'Dragon Blade', category: 'Weapons', rarity: 'Epic', price: 0, gemPrice: 0, energyMultiplier: 2.3, gemMultiplier: 2.0, description: 'A blade forged from dragon scales' },
  { id: 19, name: 'Excalibur', category: 'Weapons', rarity: 'Legendary', price: 0, gemPrice: 0, energyMultiplier: 3.2, gemMultiplier: 2.7, description: 'The legendary sword of kings' },
  { id: 20, name: 'Godslayer', category: 'Weapons', rarity: 'Mythic', price: 0, gemPrice: 0, energyMultiplier: 4.5, gemMultiplier: 3.8, description: 'A weapon capable of slaying gods' },
  { id: 21, name: 'Void Ripper', category: 'Weapons', rarity: 'Secret', price: 0, gemPrice: 0, energyMultiplier: 7.5, gemMultiplier: 6.5, description: 'A blade that tears through reality itself' },
  
  // Pets (Lowest multipliers but you can have 3)
  // Common Pets
  { id: 22, name: 'Garden Snake', category: 'Pets', rarity: 'Common', price: 0, gemPrice: 0, energyMultiplier: 1.08, gemMultiplier: 1.06, description: 'A small harmless snake' },
  { id: 29, name: 'House Mouse', category: 'Pets', rarity: 'Common', price: 0, gemPrice: 0, energyMultiplier: 1.09, gemMultiplier: 1.07, description: 'A tiny but loyal companion' },
  { id: 30, name: 'Wild Rabbit', category: 'Pets', rarity: 'Common', price: 0, gemPrice: 0, energyMultiplier: 1.07, gemMultiplier: 1.08, description: 'A fluffy forest creature' },
  
  // Uncommon Pets
  { id: 23, name: 'Spirit Cat', category: 'Pets', rarity: 'Uncommon', price: 0, gemPrice: 0, energyMultiplier: 1.2, gemMultiplier: 1.15, description: 'A mystical feline companion' },
  { id: 31, name: 'Storm Owl', category: 'Pets', rarity: 'Uncommon', price: 0, gemPrice: 0, energyMultiplier: 1.18, gemMultiplier: 1.16, description: 'An owl that brings storms' },
  { id: 32, name: 'Crystal Turtle', category: 'Pets', rarity: 'Uncommon', price: 0, gemPrice: 0, energyMultiplier: 1.19, gemMultiplier: 1.14, description: 'A turtle with crystal shell' },
  
  // Rare Pets
  { id: 24, name: 'Fire Fox', category: 'Pets', rarity: 'Rare', price: 0, gemPrice: 0, energyMultiplier: 1.4, gemMultiplier: 1.3, description: 'A fox with flames dancing on its tail' },
  { id: 33, name: 'Ice Wolf', category: 'Pets', rarity: 'Rare', price: 0, gemPrice: 0, energyMultiplier: 1.42, gemMultiplier: 1.28, description: 'A wolf from frozen lands' },
  { id: 34, name: 'Wind Eagle', category: 'Pets', rarity: 'Rare', price: 0, gemPrice: 0, energyMultiplier: 1.38, gemMultiplier: 1.32, description: 'An eagle that rides the wind' },
  
  // Epic Pets
  { id: 25, name: 'Thunder Wolf', category: 'Pets', rarity: 'Epic', price: 0, gemPrice: 0, energyMultiplier: 1.7, gemMultiplier: 1.5, description: 'A wolf that controls lightning' },
  { id: 35, name: 'Shadow Panther', category: 'Pets', rarity: 'Epic', price: 0, gemPrice: 0, energyMultiplier: 1.68, gemMultiplier: 1.52, description: 'A panther that walks in shadows' },
  { id: 36, name: 'Golden Lion', category: 'Pets', rarity: 'Epic', price: 0, gemPrice: 0, energyMultiplier: 1.72, gemMultiplier: 1.48, description: 'A majestic golden-maned lion' },
  
  // Legendary Pets
  { id: 26, name: 'Phoenix Chick', category: 'Pets', rarity: 'Legendary', price: 0, gemPrice: 0, energyMultiplier: 2.2, gemMultiplier: 1.8, description: 'A baby phoenix that brings luck' },
  { id: 37, name: 'Ancient Dragon', category: 'Pets', rarity: 'Legendary', price: 0, gemPrice: 0, energyMultiplier: 2.18, gemMultiplier: 1.82, description: 'An ancient wise dragon' },
  { id: 38, name: 'Celestial Tiger', category: 'Pets', rarity: 'Legendary', price: 0, gemPrice: 0, energyMultiplier: 2.22, gemMultiplier: 1.78, description: 'A tiger blessed by the heavens' },
  
  // Mythic Pets
  { id: 27, name: 'Cosmic Dragon', category: 'Pets', rarity: 'Mythic', price: 0, gemPrice: 0, energyMultiplier: 3.0, gemMultiplier: 2.5, description: 'A dragon from the cosmos itself' },
  { id: 39, name: 'Void Serpent', category: 'Pets', rarity: 'Mythic', price: 0, gemPrice: 0, energyMultiplier: 2.98, gemMultiplier: 2.52, description: 'A serpent from the void dimension' },
  { id: 40, name: 'Star Beast', category: 'Pets', rarity: 'Mythic', price: 0, gemPrice: 0, energyMultiplier: 3.02, gemMultiplier: 2.48, description: 'A creature born from starlight' },
  
  // Secret Pets
  { id: 28, name: 'Origin Beast', category: 'Pets', rarity: 'Secret', price: 0, gemPrice: 0, energyMultiplier: 5.0, gemMultiplier: 4.2, description: 'The first creature ever created' },
  { id: 41, name: 'Genesis Companion', category: 'Pets', rarity: 'Secret', price: 0, gemPrice: 0, energyMultiplier: 4.98, gemMultiplier: 4.22, description: 'Companion from the beginning of time' },
  { id: 42, name: 'Infinity Guardian', category: 'Pets', rarity: 'Secret', price: 0, gemPrice: 0, energyMultiplier: 5.02, gemMultiplier: 4.18, description: 'Guardian of infinite realms' },
  
  // === ETHEREAL TIER EQUIPMENT (Second World) ===
  // Ethereal Relics (Highest multipliers)
  { id: 43, name: 'Spectral Codex', category: 'Relics', rarity: 'Common', price: 0, gemPrice: 0, energyMultiplier: 12.0, gemMultiplier: 8.5, description: 'A ghostly book that phases between dimensions' },
  { id: 44, name: 'Void Crystal', category: 'Relics', rarity: 'Uncommon', price: 0, gemPrice: 0, energyMultiplier: 18.0, gemMultiplier: 14.0, description: 'A crystal containing pure nothingness' },
  { id: 45, name: 'Temporal Anchor', category: 'Relics', rarity: 'Rare', price: 0, gemPrice: 0, energyMultiplier: 28.0, gemMultiplier: 22.0, description: 'Keeps you grounded in the timestream' },
  { id: 46, name: 'Reality Engine', category: 'Relics', rarity: 'Epic', price: 0, gemPrice: 0, energyMultiplier: 45.0, gemMultiplier: 35.0, description: 'A machine that can rewrite the laws of physics' },
  { id: 47, name: 'Consciousness Core', category: 'Relics', rarity: 'Legendary', price: 0, gemPrice: 0, energyMultiplier: 75.0, gemMultiplier: 58.0, description: 'The crystallized awareness of a cosmic entity' },
  { id: 48, name: 'Infinity Nexus', category: 'Relics', rarity: 'Mythic', price: 0, gemPrice: 0, energyMultiplier: 120.0, gemMultiplier: 95.0, description: 'A connection point to all possible realities' },
  { id: 49, name: 'Origin Codex', category: 'Relics', rarity: 'Secret', price: 0, gemPrice: 0, energyMultiplier: 200.0, gemMultiplier: 150.0, description: 'The fundamental laws that govern all existence' },
  
  // Ethereal Artifacts (Supreme multipliers)
  { id: 50, name: 'Phase Ring', category: 'Artifacts', rarity: 'Common', price: 0, gemPrice: 0, energyMultiplier: 15.0, gemMultiplier: 11.0, description: 'A ring that shifts between states of matter' },
  { id: 51, name: 'Quantum Crown', category: 'Artifacts', rarity: 'Uncommon', price: 0, gemPrice: 0, energyMultiplier: 22.0, gemMultiplier: 18.0, description: 'A crown that exists in multiple positions simultaneously' },
  { id: 52, name: 'Paradox Gauntlet', category: 'Artifacts', rarity: 'Rare', price: 0, gemPrice: 0, energyMultiplier: 35.0, gemMultiplier: 28.0, description: 'Gauntlets that violate causality itself' },
  { id: 53, name: 'Ethereal Diadem', category: 'Artifacts', rarity: 'Epic', price: 0, gemPrice: 0, energyMultiplier: 58.0, gemMultiplier: 45.0, description: 'Crown of the Ethereal Sovereign' },
  { id: 54, name: 'Omniscience Circlet', category: 'Artifacts', rarity: 'Legendary', price: 0, gemPrice: 0, energyMultiplier: 95.0, gemMultiplier: 75.0, description: 'Grants awareness of all possibilities' },
  { id: 55, name: 'Cosmic Authority', category: 'Artifacts', rarity: 'Mythic', price: 0, gemPrice: 0, energyMultiplier: 155.0, gemMultiplier: 120.0, description: 'The right to command reality itself' },
  { id: 56, name: 'Transcendent Will', category: 'Artifacts', rarity: 'Secret', price: 0, gemPrice: 0, energyMultiplier: 250.0, gemMultiplier: 190.0, description: 'Pure willpower given form' },
  
  // Ethereal Weapons
  { id: 57, name: 'Spectral Blade', category: 'Weapons', rarity: 'Common', price: 0, gemPrice: 0, energyMultiplier: 10.0, gemMultiplier: 7.5, description: 'A sword that cuts through dimensions' },
  { id: 58, name: 'Void Cutter', category: 'Weapons', rarity: 'Uncommon', price: 0, gemPrice: 0, energyMultiplier: 16.0, gemMultiplier: 12.0, description: 'Cleaves through the fabric of space' },
  { id: 59, name: 'Temporal Saber', category: 'Weapons', rarity: 'Rare', price: 0, gemPrice: 0, energyMultiplier: 25.0, gemMultiplier: 19.0, description: 'Strikes across multiple timelines' },
  { id: 60, name: 'Reality Ripper', category: 'Weapons', rarity: 'Epic', price: 0, gemPrice: 0, energyMultiplier: 40.0, gemMultiplier: 30.0, description: 'Tears holes in the universe itself' },
  { id: 61, name: 'Cosmic Executioner', category: 'Weapons', rarity: 'Legendary', price: 0, gemPrice: 0, energyMultiplier: 65.0, gemMultiplier: 50.0, description: 'Can slay abstract concepts' },
  { id: 62, name: 'Paradox Blade', category: 'Weapons', rarity: 'Mythic', price: 0, gemPrice: 0, energyMultiplier: 105.0, gemMultiplier: 80.0, description: 'A weapon that both exists and doesn\'t' },
  { id: 63, name: 'Origin Slayer', category: 'Weapons', rarity: 'Secret', price: 0, gemPrice: 0, energyMultiplier: 175.0, gemMultiplier: 135.0, description: 'Capable of ending the source of all things' },
  
  // Ethereal Pets (Lowest but still powerful)
  // Common Ethereal Pets
  { id: 64, name: 'Phase Spider', category: 'Pets', rarity: 'Common', price: 0, gemPrice: 0, energyMultiplier: 8.0, gemMultiplier: 6.0, description: 'A spider that walks between realities' },
  { id: 65, name: 'Void Wisp', category: 'Pets', rarity: 'Common', price: 0, gemPrice: 0, energyMultiplier: 8.2, gemMultiplier: 5.8, description: 'A fragment of pure nothingness' },
  { id: 66, name: 'Quantum Mouse', category: 'Pets', rarity: 'Common', price: 0, gemPrice: 0, energyMultiplier: 7.8, gemMultiplier: 6.2, description: 'Exists in superposition until observed' },
  
  // Uncommon Ethereal Pets
  { id: 67, name: 'Spectral Raven', category: 'Pets', rarity: 'Uncommon', price: 0, gemPrice: 0, energyMultiplier: 12.0, gemMultiplier: 9.0, description: 'A ghostly messenger from beyond' },
  { id: 68, name: 'Time Ferret', category: 'Pets', rarity: 'Uncommon', price: 0, gemPrice: 0, energyMultiplier: 11.5, gemMultiplier: 9.5, description: 'Scurries through temporal loops' },
  { id: 69, name: 'Dream Butterfly', category: 'Pets', rarity: 'Uncommon', price: 0, gemPrice: 0, energyMultiplier: 12.3, gemMultiplier: 8.7, description: 'Feeds on crystallized dreams' },
  
  // Rare Ethereal Pets
  { id: 70, name: 'Dimensional Wolf', category: 'Pets', rarity: 'Rare', price: 0, gemPrice: 0, energyMultiplier: 18.0, gemMultiplier: 14.0, description: 'Hunts across multiple dimensions' },
  { id: 71, name: 'Ethereal Tiger', category: 'Pets', rarity: 'Rare', price: 0, gemPrice: 0, energyMultiplier: 17.5, gemMultiplier: 14.5, description: 'Prowls the ethereal planes' },
  { id: 72, name: 'Void Hawk', category: 'Pets', rarity: 'Rare', price: 0, gemPrice: 0, energyMultiplier: 18.5, gemMultiplier: 13.5, description: 'Soars through empty space' },
  
  // Epic Ethereal Pets
  { id: 73, name: 'Paradox Phoenix', category: 'Pets', rarity: 'Epic', price: 0, gemPrice: 0, energyMultiplier: 28.0, gemMultiplier: 22.0, description: 'Dies and is reborn simultaneously' },
  { id: 74, name: 'Quantum Dragon', category: 'Pets', rarity: 'Epic', price: 0, gemPrice: 0, energyMultiplier: 27.5, gemMultiplier: 22.5, description: 'Exists in all possible states' },
  { id: 75, name: 'Temporal Serpent', category: 'Pets', rarity: 'Epic', price: 0, gemPrice: 0, energyMultiplier: 28.5, gemMultiplier: 21.5, description: 'Slithers through the timestream' },
  
  // Legendary Ethereal Pets
  { id: 76, name: 'Reality Sphinx', category: 'Pets', rarity: 'Legendary', price: 0, gemPrice: 0, energyMultiplier: 45.0, gemMultiplier: 35.0, description: 'Guardian of universal truths' },
  { id: 77, name: 'Cosmic Leviathan', category: 'Pets', rarity: 'Legendary', price: 0, gemPrice: 0, energyMultiplier: 44.0, gemMultiplier: 36.0, description: 'Swims through seas of starlight' },
  { id: 78, name: 'Ethereal Titan', category: 'Pets', rarity: 'Legendary', price: 0, gemPrice: 0, energyMultiplier: 46.0, gemMultiplier: 34.0, description: 'A giant that spans dimensions' },
  
  // Mythic Ethereal Pets
  { id: 79, name: 'Void Sovereign', category: 'Pets', rarity: 'Mythic', price: 0, gemPrice: 0, energyMultiplier: 72.0, gemMultiplier: 58.0, description: 'Ruler of empty space' },
  { id: 80, name: 'Infinity Warden', category: 'Pets', rarity: 'Mythic', price: 0, gemPrice: 0, energyMultiplier: 70.0, gemMultiplier: 60.0, description: 'Guardian of endless possibilities' },
  { id: 81, name: 'Paradox Entity', category: 'Pets', rarity: 'Mythic', price: 0, gemPrice: 0, energyMultiplier: 74.0, gemMultiplier: 56.0, description: 'A being that defies logic itself' },
  
  // Secret Ethereal Pets
  { id: 82, name: 'Origin Shepherd', category: 'Pets', rarity: 'Secret', price: 0, gemPrice: 0, energyMultiplier: 120.0, gemMultiplier: 95.0, description: 'Guides the birth of universes' },
  { id: 83, name: 'Absolute Guardian', category: 'Pets', rarity: 'Secret', price: 0, gemPrice: 0, energyMultiplier: 118.0, gemMultiplier: 97.0, description: 'Protects the concept of existence' },
  { id: 84, name: 'Transcendent Being', category: 'Pets', rarity: 'Secret', price: 0, gemPrice: 0, energyMultiplier: 122.0, gemMultiplier: 93.0, description: 'Has moved beyond all limitations' },
  
  // Cosmic Relics (Ultimate tier)
  { id: 85, name: 'Quantum Fragment', category: 'Relics', rarity: 'Common', price: 0, gemPrice: 0, energyMultiplier: 200.0, gemMultiplier: 150.0, description: 'A fragment of pure possibility from the quantum realm' },
  { id: 86, name: 'Stellar Essence', category: 'Relics', rarity: 'Uncommon', price: 0, gemPrice: 0, energyMultiplier: 350.0, gemMultiplier: 275.0, description: 'Condensed starlight that burns with cosmic fire' },
  { id: 87, name: 'Dimensional Key', category: 'Relics', rarity: 'Rare', price: 0, gemPrice: 0, energyMultiplier: 650.0, gemMultiplier: 500.0, description: 'Opens doorways between parallel universes' },
  { id: 88, name: 'Infinity Shard', category: 'Relics', rarity: 'Epic', price: 0, gemPrice: 0, energyMultiplier: 1200.0, gemMultiplier: 900.0, description: 'A piece of mathematical infinity made manifest' },
  { id: 89, name: 'Omniversal Core', category: 'Relics', rarity: 'Legendary', price: 0, gemPrice: 0, energyMultiplier: 2200.0, gemMultiplier: 1650.0, description: 'The heart of all possible realities' },
  { id: 90, name: 'Primordial Seed', category: 'Relics', rarity: 'Mythic', price: 0, gemPrice: 0, energyMultiplier: 4000.0, gemMultiplier: 3000.0, description: 'The seed from which all existence grows' },
  { id: 91, name: 'Absolute Nexus', category: 'Relics', rarity: 'Secret', price: 0, gemPrice: 0, energyMultiplier: 7500.0, gemMultiplier: 5500.0, description: 'The connection point of all cosmic forces' },
  
  // Cosmic Artifacts (Ultimate tier)
  { id: 92, name: 'Reality Ring', category: 'Artifacts', rarity: 'Common', price: 0, gemPrice: 0, energyMultiplier: 250.0, gemMultiplier: 185.0, description: 'Controls the fundamental laws of existence' },
  { id: 93, name: 'Cosmic Crown', category: 'Artifacts', rarity: 'Uncommon', price: 0, gemPrice: 0, energyMultiplier: 425.0, gemMultiplier: 320.0, description: 'Grants dominion over galactic clusters' },
  { id: 94, name: 'Omnipotent Gauntlet', category: 'Artifacts', rarity: 'Rare', price: 0, gemPrice: 0, energyMultiplier: 800.0, gemMultiplier: 600.0, description: 'Wields the power to reshape reality with a gesture' },
  { id: 95, name: 'Transcendent Amulet', category: 'Artifacts', rarity: 'Epic', price: 0, gemPrice: 0, energyMultiplier: 1500.0, gemMultiplier: 1100.0, description: 'Elevates the wearer beyond physical limitations' },
  { id: 96, name: 'Universal Scepter', category: 'Artifacts', rarity: 'Legendary', price: 0, gemPrice: 0, energyMultiplier: 2800.0, gemMultiplier: 2050.0, description: 'Commands the fundamental forces of the cosmos' },
  { id: 97, name: 'Infinity Chalice', category: 'Artifacts', rarity: 'Mythic', price: 0, gemPrice: 0, energyMultiplier: 5100.0, gemMultiplier: 3750.0, description: 'Contains the essence of unlimited potential' },
  { id: 98, name: 'Omniscient Eye', category: 'Artifacts', rarity: 'Secret', price: 0, gemPrice: 0, energyMultiplier: 9500.0, gemMultiplier: 7000.0, description: 'Sees all possibilities across infinite timelines' },
  
  // Cosmic Weapons (Ultimate tier)
  { id: 99, name: 'Quantum Blade', category: 'Weapons', rarity: 'Common', price: 0, gemPrice: 0, energyMultiplier: 180.0, gemMultiplier: 140.0, description: 'Cuts through the fabric of spacetime itself' },
  { id: 100, name: 'Stellar Hammer', category: 'Weapons', rarity: 'Uncommon', price: 0, gemPrice: 0, energyMultiplier: 320.0, gemMultiplier: 250.0, description: 'Forged in the heart of a dying star' },
  { id: 101, name: 'Void Spear', category: 'Weapons', rarity: 'Rare', price: 0, gemPrice: 0, energyMultiplier: 580.0, gemMultiplier: 450.0, description: 'Pierces through dimensions and reality barriers' },
  { id: 102, name: 'Infinity Sword', category: 'Weapons', rarity: 'Epic', price: 0, gemPrice: 0, energyMultiplier: 1050.0, gemMultiplier: 800.0, description: 'A blade with unlimited sharpness and reach' },
  { id: 103, name: 'Cosmic Scythe', category: 'Weapons', rarity: 'Legendary', price: 0, gemPrice: 0, energyMultiplier: 1950.0, gemMultiplier: 1500.0, description: 'Harvests the energy of entire galaxies' },
  { id: 104, name: 'Reality Breaker', category: 'Weapons', rarity: 'Mythic', price: 0, gemPrice: 0, energyMultiplier: 3600.0, gemMultiplier: 2750.0, description: 'Shatters the boundaries between possible and impossible' },
  { id: 105, name: 'Omnicide Edge', category: 'Weapons', rarity: 'Secret', price: 0, gemPrice: 0, energyMultiplier: 7480.0, gemMultiplier: 5720.0, description: 'The weapon that could end all existence' },
  
  // Cosmic Pets (Ultimate tier) - 3 per rarity
  { id: 106, name: 'Quantum Cat', category: 'Pets', rarity: 'Common', price: 0, gemPrice: 0, energyMultiplier: 160.0, gemMultiplier: 125.0, description: 'Exists in all possible states simultaneously' },
  { id: 107, name: 'Nebula Wolf', category: 'Pets', rarity: 'Common', price: 0, gemPrice: 0, energyMultiplier: 165.0, gemMultiplier: 130.0, description: 'Hunts across the cosmic wilderness' },
  { id: 108, name: 'Void Fox', category: 'Pets', rarity: 'Common', price: 0, gemPrice: 0, energyMultiplier: 170.0, gemMultiplier: 135.0, description: 'Dances through empty space with grace' },
  { id: 109, name: 'Stellar Phoenix', category: 'Pets', rarity: 'Uncommon', price: 0, gemPrice: 0, energyMultiplier: 290.0, gemMultiplier: 230.0, description: 'Reborn from the ashes of collapsed stars' },
  { id: 110, name: 'Cosmic Drake', category: 'Pets', rarity: 'Uncommon', price: 0, gemPrice: 0, energyMultiplier: 300.0, gemMultiplier: 240.0, description: 'Breathes pure cosmic energy' },
  { id: 111, name: 'Dimension Hound', category: 'Pets', rarity: 'Uncommon', price: 0, gemPrice: 0, energyMultiplier: 310.0, gemMultiplier: 250.0, description: 'Tracks quarry across infinite realities' },
  { id: 112, name: 'Reality Spider', category: 'Pets', rarity: 'Rare', price: 0, gemPrice: 0, energyMultiplier: 520.0, gemMultiplier: 410.0, description: 'Weaves webs between dimensions' },
  { id: 113, name: 'Infinity Serpent', category: 'Pets', rarity: 'Rare', price: 0, gemPrice: 0, energyMultiplier: 540.0, gemMultiplier: 430.0, description: 'Coils around the concept of endlessness' },
  { id: 114, name: 'Quantum Leviathan', category: 'Pets', rarity: 'Rare', price: 0, gemPrice: 0, energyMultiplier: 560.0, gemMultiplier: 450.0, description: 'Swims through seas of probability' },
  { id: 115, name: 'Cosmic Titan', category: 'Pets', rarity: 'Epic', price: 0, gemPrice: 0, energyMultiplier: 950.0, gemMultiplier: 750.0, description: 'Holds up the pillars of existence' },
  { id: 116, name: 'Void Colossus', category: 'Pets', rarity: 'Epic', price: 0, gemPrice: 0, energyMultiplier: 980.0, gemMultiplier: 780.0, description: 'Strides through empty dimensions' },
  { id: 117, name: 'Reality Wyrm', category: 'Pets', rarity: 'Epic', price: 0, gemPrice: 0, energyMultiplier: 1020.0, gemMultiplier: 820.0, description: 'Devours inconsistencies in spacetime' },
  { id: 118, name: 'Omniversal Dragon', category: 'Pets', rarity: 'Legendary', price: 0, gemPrice: 0, energyMultiplier: 1800.0, gemMultiplier: 1400.0, description: 'Rules over all possible universes' },
  { id: 119, name: 'Infinity Beast', category: 'Pets', rarity: 'Legendary', price: 0, gemPrice: 0, energyMultiplier: 1850.0, gemMultiplier: 1450.0, description: 'Embodies the concept of boundlessness' },
  { id: 120, name: 'Absolute Entity', category: 'Pets', rarity: 'Legendary', price: 0, gemPrice: 0, energyMultiplier: 1900.0, gemMultiplier: 1500.0, description: 'The perfect being of pure existence' },
  { id: 121, name: 'Prime Consciousness', category: 'Pets', rarity: 'Mythic', price: 0, gemPrice: 0, energyMultiplier: 3300.0, gemMultiplier: 2600.0, description: 'The first and greatest awareness' },
  { id: 122, name: 'Universal Mind', category: 'Pets', rarity: 'Mythic', price: 0, gemPrice: 0, energyMultiplier: 3400.0, gemMultiplier: 2700.0, description: 'Thinks all possible thoughts simultaneously' },
  { id: 123, name: 'Cosmic Will', category: 'Pets', rarity: 'Mythic', price: 0, gemPrice: 0, energyMultiplier: 3500.0, gemMultiplier: 2800.0, description: 'The force that shapes all reality' },
  { id: 124, name: 'Origin Spirit', category: 'Pets', rarity: 'Secret', price: 0, gemPrice: 0, energyMultiplier: 6820.0, gemMultiplier: 5280.0, description: 'The first soul that sparked creation' },
  { id: 125, name: 'Infinite Guardian', category: 'Pets', rarity: 'Secret', price: 0, gemPrice: 0, energyMultiplier: 7040.0, gemMultiplier: 5500.0, description: 'Protects the endless expanse of possibility' },
  { id: 126, name: 'Absolute Creator', category: 'Pets', rarity: 'Secret', price: 0, gemPrice: 0, energyMultiplier: 7260.0, gemMultiplier: 5720.0, description: 'Brings new realities into existence with every breath' },
  
  // Transcendent Weapons (Ultimate++ tier) - 7 items
  { id: 127, name: 'Genesis Blade', category: 'Weapons', rarity: 'Common', price: 0, gemPrice: 0, energyMultiplier: 12000.0, gemMultiplier: 9500.0, description: 'Forged from the first moments of creation itself' },
  { id: 128, name: 'Primordial Hammer', category: 'Weapons', rarity: 'Uncommon', price: 0, gemPrice: 0, energyMultiplier: 22000.0, gemMultiplier: 17500.0, description: 'Shapes reality with each mighty blow' },
  { id: 129, name: 'Transcendent Spear', category: 'Weapons', rarity: 'Rare', price: 0, gemPrice: 0, energyMultiplier: 40000.0, gemMultiplier: 32000.0, description: 'Pierces through the barriers of existence itself' },
  { id: 130, name: 'Omnipotent Sword', category: 'Weapons', rarity: 'Epic', price: 0, gemPrice: 0, energyMultiplier: 75000.0, gemMultiplier: 60000.0, description: 'Cuts through the very concept of impossibility' },
  { id: 131, name: 'Meta-Scythe', category: 'Weapons', rarity: 'Legendary', price: 0, gemPrice: 0, energyMultiplier: 140000.0, gemMultiplier: 112000.0, description: 'Harvests concepts and ideas from pure thought' },
  { id: 132, name: 'Paradox Cleaver', category: 'Weapons', rarity: 'Mythic', price: 0, gemPrice: 0, energyMultiplier: 260000.0, gemMultiplier: 208000.0, description: 'A weapon that destroys by creating and creates by destroying' },
  { id: 133, name: 'Origin Destroyer', category: 'Weapons', rarity: 'Secret', price: 0, gemPrice: 0, energyMultiplier: 500000.0, gemMultiplier: 400000.0, description: 'Capable of unmaking the source code of reality' },
  
  // Transcendent Pets (Ultimate++ tier) - 21 items (3 per rarity)
  { id: 134, name: 'Primordial Phoenix', category: 'Pets', rarity: 'Common', price: 0, gemPrice: 0, energyMultiplier: 11000.0, gemMultiplier: 8800.0, description: 'Born from the first flame of consciousness' },
  { id: 135, name: 'Genesis Wolf', category: 'Pets', rarity: 'Common', price: 0, gemPrice: 0, energyMultiplier: 11500.0, gemMultiplier: 9200.0, description: 'Howls the songs of creation into being' },
  { id: 136, name: 'Origin Fox', category: 'Pets', rarity: 'Common', price: 0, gemPrice: 0, energyMultiplier: 12000.0, gemMultiplier: 9600.0, description: 'Dances at the beginning of all stories' },
  { id: 137, name: 'Transcendent Dragon', category: 'Pets', rarity: 'Uncommon', price: 0, gemPrice: 0, energyMultiplier: 20000.0, gemMultiplier: 16000.0, description: 'Breathes pure possibility into existence' },
  { id: 138, name: 'Meta Serpent', category: 'Pets', rarity: 'Uncommon', price: 0, gemPrice: 0, energyMultiplier: 21000.0, gemMultiplier: 16800.0, description: 'Coils around the concept of concepts' },
  { id: 139, name: 'Paradox Beast', category: 'Pets', rarity: 'Uncommon', price: 0, gemPrice: 0, energyMultiplier: 22000.0, gemMultiplier: 17600.0, description: 'Exists as both question and answer' },
  { id: 140, name: 'Omniscient Owl', category: 'Pets', rarity: 'Rare', price: 0, gemPrice: 0, energyMultiplier: 36000.0, gemMultiplier: 29000.0, description: 'Sees all possibilities across infinite timelines' },
  { id: 141, name: 'Eternal Tiger', category: 'Pets', rarity: 'Rare', price: 0, gemPrice: 0, energyMultiplier: 38000.0, gemMultiplier: 30500.0, description: 'Hunts through the jungles of pure thought' },
  { id: 142, name: 'Infinite Bear', category: 'Pets', rarity: 'Rare', price: 0, gemPrice: 0, energyMultiplier: 40000.0, gemMultiplier: 32000.0, description: 'Protects the endless wilderness of imagination' },
  { id: 143, name: 'Omnipotent Lion', category: 'Pets', rarity: 'Epic', price: 0, gemPrice: 0, energyMultiplier: 68000.0, gemMultiplier: 55000.0, description: 'Rules over the kingdom of all possibilities' },
  { id: 144, name: 'Meta Elephant', category: 'Pets', rarity: 'Epic', price: 0, gemPrice: 0, energyMultiplier: 72000.0, gemMultiplier: 58000.0, description: 'Never forgets any potential future' },
  { id: 145, name: 'Transcendent Eagle', category: 'Pets', rarity: 'Epic', price: 0, gemPrice: 0, energyMultiplier: 76000.0, gemMultiplier: 61000.0, description: 'Soars above the highest concepts' },
  { id: 146, name: 'Origin Whale', category: 'Pets', rarity: 'Legendary', price: 0, gemPrice: 0, energyMultiplier: 125000.0, gemMultiplier: 100000.0, description: 'Swims through oceans of pure consciousness' },
  { id: 147, name: 'Genesis Kraken', category: 'Pets', rarity: 'Legendary', price: 0, gemPrice: 0, energyMultiplier: 132000.0, gemMultiplier: 106000.0, description: 'Tentacles reach across dimensional barriers' },
  { id: 148, name: 'Primordial Leviathan', category: 'Pets', rarity: 'Legendary', price: 0, gemPrice: 0, energyMultiplier: 140000.0, gemMultiplier: 112000.0, description: 'Ancient guardian of the deepest mysteries' },
  { id: 149, name: 'Meta Consciousness', category: 'Pets', rarity: 'Mythic', price: 0, gemPrice: 0, energyMultiplier: 235000.0, gemMultiplier: 190000.0, description: 'Aware of its own awareness across all realities' },
  { id: 150, name: 'Omniversal Mind', category: 'Pets', rarity: 'Mythic', price: 0, gemPrice: 0, energyMultiplier: 250000.0, gemMultiplier: 202000.0, description: 'Thinks the thoughts that create universes' },
  { id: 151, name: 'Infinite Will', category: 'Pets', rarity: 'Mythic', price: 0, gemPrice: 0, energyMultiplier: 265000.0, gemMultiplier: 215000.0, description: 'The ultimate force of determination' },
  { id: 152, name: 'Prime Essence', category: 'Pets', rarity: 'Secret', price: 0, gemPrice: 0, energyMultiplier: 460000.0, gemMultiplier: 370000.0, description: 'The fundamental substance from which all existence is made' },
  { id: 153, name: 'Genesis Source', category: 'Pets', rarity: 'Secret', price: 0, gemPrice: 0, energyMultiplier: 485000.0, gemMultiplier: 390000.0, description: 'The wellspring from which all creation flows' },
  { id: 154, name: 'Origin Absolute', category: 'Pets', rarity: 'Secret', price: 0, gemPrice: 0, energyMultiplier: 510000.0, gemMultiplier: 410000.0, description: 'The perfect unity that contains all diversity' },
  
  // Transcendent Artifacts (Ultimate++ tier) - 14 items (2 per rarity)
  { id: 155, name: 'Genesis Orb', category: 'Artifacts', rarity: 'Common', price: 0, gemPrice: 0, energyMultiplier: 11500.0, gemMultiplier: 9200.0, description: 'Contains the blueprint of all creation' },
  { id: 156, name: 'Primordial Crystal', category: 'Artifacts', rarity: 'Common', price: 0, gemPrice: 0, energyMultiplier: 12000.0, gemMultiplier: 9600.0, description: 'Formed from crystallized pure thought' },
  { id: 157, name: 'Transcendence Stone', category: 'Artifacts', rarity: 'Uncommon', price: 0, gemPrice: 0, energyMultiplier: 20500.0, gemMultiplier: 16400.0, description: 'Allows ascension beyond all limitations' },
  { id: 158, name: 'Meta Gem', category: 'Artifacts', rarity: 'Uncommon', price: 0, gemPrice: 0, energyMultiplier: 21500.0, gemMultiplier: 17200.0, description: 'A gem that contains the concept of gems' },
  { id: 159, name: 'Origin Relic', category: 'Artifacts', rarity: 'Rare', price: 0, gemPrice: 0, energyMultiplier: 37000.0, gemMultiplier: 29600.0, description: 'An artifact from the beginning of everything' },
  { id: 160, name: 'Infinite Sigil', category: 'Artifacts', rarity: 'Rare', price: 0, gemPrice: 0, energyMultiplier: 39000.0, gemMultiplier: 31200.0, description: 'Carved with symbols of endless possibility' },
  { id: 161, name: 'Omnipotent Crown', category: 'Artifacts', rarity: 'Epic', price: 0, gemPrice: 0, energyMultiplier: 70000.0, gemMultiplier: 56000.0, description: 'Worn by the ruler of all realities' },
  { id: 162, name: 'Meta Scepter', category: 'Artifacts', rarity: 'Epic', price: 0, gemPrice: 0, energyMultiplier: 74000.0, gemMultiplier: 59200.0, description: 'Commands authority over existence itself' },
  { id: 163, name: 'Genesis Codex', category: 'Artifacts', rarity: 'Legendary', price: 0, gemPrice: 0, energyMultiplier: 128000.0, gemMultiplier: 102400.0, description: 'The book that writes reality as it\'s read' },
  { id: 164, name: 'Origin Archive', category: 'Artifacts', rarity: 'Legendary', price: 0, gemPrice: 0, energyMultiplier: 135000.0, gemMultiplier: 108000.0, description: 'Contains the complete history of all possibility' },
  { id: 165, name: 'Transcendent Core', category: 'Artifacts', rarity: 'Mythic', price: 0, gemPrice: 0, energyMultiplier: 248000.0, gemMultiplier: 198400.0, description: 'The central processing unit of pure transcendence' },
  { id: 166, name: 'Meta Engine', category: 'Artifacts', rarity: 'Mythic', price: 0, gemPrice: 0, energyMultiplier: 260000.0, gemMultiplier: 210000.0, description: 'Powers the machinery of infinite possibility' },
  { id: 167, name: 'Prime Matrix', category: 'Artifacts', rarity: 'Secret', price: 0, gemPrice: 0, energyMultiplier: 500000.0, gemMultiplier: 400000.0, description: 'The fundamental framework that underlies all existence' },
  { id: 168, name: 'Origin Nexus', category: 'Artifacts', rarity: 'Secret', price: 0, gemPrice: 0, energyMultiplier: 520000.0, gemMultiplier: 416000.0, description: 'The ultimate connection point between all things that are and could be' },
  
  // Transcendent Relics (Ultimate++ tier) - 7 items
  { id: 169, name: 'Genesis Fragment', category: 'Relics', rarity: 'Common', price: 0, gemPrice: 0, energyMultiplier: 11800.0, gemMultiplier: 9400.0, description: 'A piece of the original creation moment' },
  { id: 170, name: 'Primordial Essence', category: 'Relics', rarity: 'Uncommon', price: 0, gemPrice: 0, energyMultiplier: 21200.0, gemMultiplier: 16900.0, description: 'The fundamental substance before existence' },
  { id: 171, name: 'Origin Catalyst', category: 'Relics', rarity: 'Rare', price: 0, gemPrice: 0, energyMultiplier: 38500.0, gemMultiplier: 30800.0, description: 'Accelerates the birth of new realities' },
  { id: 172, name: 'Transcendence Engine', category: 'Relics', rarity: 'Epic', price: 0, gemPrice: 0, energyMultiplier: 72000.0, gemMultiplier: 57600.0, description: 'Powers the ascension beyond all limitations' },
  { id: 173, name: 'Meta-Reality Core', category: 'Relics', rarity: 'Legendary', price: 0, gemPrice: 0, energyMultiplier: 134000.0, gemMultiplier: 107200.0, description: 'Processes the logic of existence itself' },
  { id: 174, name: 'Omnipotence Nexus', category: 'Relics', rarity: 'Mythic', price: 0, gemPrice: 0, energyMultiplier: 240000.0, gemMultiplier: 195000.0, description: 'Where unlimited power meets infinite wisdom' },
  { id: 175, name: 'Origin Absolute', category: 'Relics', rarity: 'Secret', price: 0, gemPrice: 0, energyMultiplier: 470000.0, gemMultiplier: 376000.0, description: 'The perfect unity from which all diversity springs' },

  // World 5 - Absolute Tier Equipment (49 items)
  // Weapons (7 items)
  { id: 176, name: 'Infinity Blade', category: 'Weapons', rarity: 'Common', price: 1e15, gemPrice: 5e14, energyMultiplier: 750000.0, gemMultiplier: 600000.0, description: 'A sword that cuts through the fabric of reality itself' },
  { id: 177, name: 'Omnipotence Staff', category: 'Weapons', rarity: 'Common', price: 2.5e15, gemPrice: 1.25e15, energyMultiplier: 850000.0, gemMultiplier: 680000.0, description: 'Channel unlimited cosmic power through crystallized potential' },
  { id: 178, name: 'Void Hammer', category: 'Weapons', rarity: 'Uncommon', price: 5e15, gemPrice: 2.5e15, energyMultiplier: 950000.0, gemMultiplier: 760000.0, description: 'Forge new realities from the primordial nothingness' },
  { id: 179, name: 'Paradox Bow', category: 'Weapons', rarity: 'Uncommon', price: 1e16, gemPrice: 5e15, energyMultiplier: 1050000.0, gemMultiplier: 840000.0, description: 'Arrows that arrive before they are shot' },
  { id: 180, name: 'Meta-Scythe', category: 'Weapons', rarity: 'Rare', price: 2e16, gemPrice: 1e16, energyMultiplier: 1200000.0, gemMultiplier: 960000.0, description: 'Harvests concepts and abstract possibilities' },
  { id: 181, name: 'Transcendence Spear', category: 'Weapons', rarity: 'Epic', price: 4e16, gemPrice: 2e16, energyMultiplier: 1400000.0, gemMultiplier: 1120000.0, description: 'Pierce the boundaries between finite and infinite' },
  { id: 182, name: 'Absolute Zero Katana', category: 'Weapons', rarity: 'Legendary', price: 8e16, gemPrice: 4e16, energyMultiplier: 1750000.0, gemMultiplier: 1400000.0, description: 'The final sword that ends all conflicts across all realities' },
  { id: 228, name: 'Origin Destroyer', category: 'Weapons', rarity: 'Mythic', price: 1.2e17, gemPrice: 6e16, energyMultiplier: 2100000.0, gemMultiplier: 1680000.0, description: 'Unmakes the source code of reality itself' },
  { id: 229, name: 'Meta Annihilator', category: 'Weapons', rarity: 'Mythic', price: 1.5e17, gemPrice: 7.5e16, energyMultiplier: 2300000.0, gemMultiplier: 1840000.0, description: 'Erases concepts from existence permanently' },
  { id: 230, name: 'Absolute Edge', category: 'Weapons', rarity: 'Secret', price: 0, gemPrice: 0, energyMultiplier: 2800000.0, gemMultiplier: 2240000.0, description: 'The perfect blade that cuts through impossibility' },
  { id: 231, name: 'Omega Weapon', category: 'Weapons', rarity: 'Secret', price: 0, gemPrice: 0, energyMultiplier: 3200000.0, gemMultiplier: 2560000.0, description: 'The final weapon that ends all endings' },

  // Pets (21 items)
  { id: 183, name: 'Quantum Fairy', category: 'Pets', rarity: 'Common', price: 7.5e14, gemPrice: 3.75e14, energyMultiplier: 650000.0, gemMultiplier: 520000.0, description: 'Exists in all possible states simultaneously until observed' },
  { id: 184, name: 'Infinity Cat', category: 'Pets', rarity: 'Common', price: 1.5e15, gemPrice: 7.5e14, energyMultiplier: 700000.0, gemMultiplier: 560000.0, description: 'Has infinite lives, literally' },
  { id: 185, name: 'Paradox Phoenix', category: 'Pets', rarity: 'Common', price: 2.25e15, gemPrice: 1.125e15, energyMultiplier: 750000.0, gemMultiplier: 600000.0, description: 'Dies before it is born, lives after it dies' },
  { id: 186, name: 'Void Serpent', category: 'Pets', rarity: 'Common', price: 3e15, gemPrice: 1.5e15, energyMultiplier: 800000.0, gemMultiplier: 640000.0, description: 'Swims through nothingness like it were water' },
  { id: 187, name: 'Cosmic Owl', category: 'Pets', rarity: 'Common', price: 4.5e15, gemPrice: 2.25e15, energyMultiplier: 850000.0, gemMultiplier: 680000.0, description: 'Sees all possible futures with its infinite eyes' },
  { id: 188, name: 'Meta-Wolf', category: 'Pets', rarity: 'Common', price: 6e15, gemPrice: 3e15, energyMultiplier: 900000.0, gemMultiplier: 720000.0, description: 'Howls at concepts instead of moons' },
  { id: 189, name: 'Fractal Dragon', category: 'Pets', rarity: 'Common', price: 7.5e15, gemPrice: 3.75e15, energyMultiplier: 950000.0, gemMultiplier: 760000.0, description: 'Contains smaller versions of itself infinitely nested' },
  { id: 190, name: 'Probability Spider', category: 'Pets', rarity: 'Uncommon', price: 1e16, gemPrice: 5e15, energyMultiplier: 1000000.0, gemMultiplier: 800000.0, description: 'Webs that catch unlikely events and rare possibilities' },
  { id: 191, name: 'Logic Beetle', category: 'Pets', rarity: 'Uncommon', price: 1.25e16, gemPrice: 6.25e15, energyMultiplier: 1100000.0, gemMultiplier: 880000.0, description: 'Processes contradictions and paradoxes as food' },
  { id: 192, name: 'Dimensional Tiger', category: 'Pets', rarity: 'Uncommon', price: 1.5e16, gemPrice: 7.5e15, energyMultiplier: 1200000.0, gemMultiplier: 960000.0, description: 'Stalks prey across parallel universes' },
  { id: 193, name: 'Ethereal Whale', category: 'Pets', rarity: 'Uncommon', price: 2e16, gemPrice: 1e16, energyMultiplier: 1300000.0, gemMultiplier: 1040000.0, description: 'Swims through oceans of pure consciousness' },
  { id: 194, name: 'Temporal Bear', category: 'Pets', rarity: 'Uncommon', price: 2.5e16, gemPrice: 1.25e16, energyMultiplier: 1400000.0, gemMultiplier: 1120000.0, description: 'Hibernates in the spaces between seconds' },
  { id: 195, name: 'Chaos Butterfly', category: 'Pets', rarity: 'Rare', price: 3e16, gemPrice: 1.5e16, energyMultiplier: 1500000.0, gemMultiplier: 1200000.0, description: 'Its wing beats reshape entire galaxies' },
  { id: 196, name: 'Abstract Lion', category: 'Pets', rarity: 'Rare', price: 4e16, gemPrice: 2e16, energyMultiplier: 1650000.0, gemMultiplier: 1320000.0, description: 'The platonic ideal of courage and strength' },
  { id: 197, name: 'Omniscience Raven', category: 'Pets', rarity: 'Rare', price: 5e16, gemPrice: 2.5e16, energyMultiplier: 1800000.0, gemMultiplier: 1440000.0, description: 'Knows everything that has been and will be' },
  { id: 198, name: 'Infinity Hound', category: 'Pets', rarity: 'Epic', price: 6e16, gemPrice: 3e16, energyMultiplier: 2000000.0, gemMultiplier: 1600000.0, description: 'Loyal beyond the boundaries of space and time' },
  { id: 199, name: 'Transcendent Eagle', category: 'Pets', rarity: 'Epic', price: 7e16, gemPrice: 3.5e16, energyMultiplier: 2200000.0, gemMultiplier: 1760000.0, description: 'Soars above the concept of existence itself' },
  { id: 200, name: 'Paradox Unicorn', category: 'Pets', rarity: 'Epic', price: 8e16, gemPrice: 4e16, energyMultiplier: 2400000.0, gemMultiplier: 1920000.0, description: 'Mythical even among myths, real within unreality' },
  { id: 201, name: 'Absolute Leviathan', category: 'Pets', rarity: 'Legendary', price: 1e17, gemPrice: 5e16, energyMultiplier: 2750000.0, gemMultiplier: 2200000.0, description: 'The primordial entity from which all sea monsters descend' },
  { id: 202, name: 'Meta-Phoenix', category: 'Pets', rarity: 'Legendary', price: 1.2e17, gemPrice: 6e16, energyMultiplier: 3000000.0, gemMultiplier: 2400000.0, description: 'Reborn not from ashes, but from the concept of rebirth itself' },
  { id: 232, name: 'Omniversal Guardian', category: 'Pets', rarity: 'Mythic', price: 1.4e17, gemPrice: 7e16, energyMultiplier: 3250000.0, gemMultiplier: 2600000.0, description: 'Protects all possible realities simultaneously' },
  { id: 233, name: 'Infinity Companion', category: 'Pets', rarity: 'Mythic', price: 1.8e17, gemPrice: 9e16, energyMultiplier: 3750000.0, gemMultiplier: 3000000.0, description: 'Your eternal friend across all dimensions' },
  { id: 203, name: 'Origin Familiar', category: 'Pets', rarity: 'Secret', price: 0, gemPrice: 0, energyMultiplier: 4000000.0, gemMultiplier: 3200000.0, description: 'The first companion, from before the beginning' },
  { id: 234, name: 'Absolute Entity', category: 'Pets', rarity: 'Secret', price: 0, gemPrice: 0, energyMultiplier: 4200000.0, gemMultiplier: 3360000.0, description: 'The perfect being that transcends all categories' },
  { id: 235, name: 'Meta Existence', category: 'Pets', rarity: 'Secret', price: 0, gemPrice: 0, energyMultiplier: 4800000.0, gemMultiplier: 3840000.0, description: 'Exists beyond the concept of existence itself' },

  // Artifacts (14 items)
  { id: 204, name: 'Infinity Stone', category: 'Artifacts', rarity: 'Common', price: 1.25e15, gemPrice: 6.25e14, energyMultiplier: 1200000.0, gemMultiplier: 960000.0, description: 'Contains unlimited potential energy in crystalline form' },
  { id: 205, name: 'Void Crystal', category: 'Artifacts', rarity: 'Common', price: 2e15, gemPrice: 1e15, energyMultiplier: 1250000.0, gemMultiplier: 1000000.0, description: 'Crystallized nothingness that somehow exists' },
  { id: 206, name: 'Paradox Gem', category: 'Artifacts', rarity: 'Common', price: 3.5e15, gemPrice: 1.75e15, energyMultiplier: 1300000.0, gemMultiplier: 1040000.0, description: 'Simultaneously priceless and worthless' },
  { id: 207, name: 'Cosmic Orb', category: 'Artifacts', rarity: 'Uncommon', price: 6e15, gemPrice: 3e15, energyMultiplier: 1500000.0, gemMultiplier: 1200000.0, description: 'Contains a miniature universe within its depths' },
  { id: 208, name: 'Meta-Amulet', category: 'Artifacts', rarity: 'Uncommon', price: 1e16, gemPrice: 5e15, energyMultiplier: 1625000.0, gemMultiplier: 1300000.0, description: 'Protects against conceptual damage and abstract harm' },
  { id: 209, name: 'Reality Anchor', category: 'Artifacts', rarity: 'Uncommon', price: 1.5e16, gemPrice: 7.5e15, energyMultiplier: 1750000.0, gemMultiplier: 1400000.0, description: 'Keeps you grounded when reality becomes fluid' },
  { id: 210, name: 'Transcendence Ring', category: 'Artifacts', rarity: 'Rare', price: 2.5e16, gemPrice: 1.25e16, energyMultiplier: 1900000.0, gemMultiplier: 1520000.0, description: 'A circular symbol of infinite progression' },
  { id: 211, name: 'Omnipotence Crown', category: 'Artifacts', rarity: 'Rare', price: 3.5e16, gemPrice: 1.75e16, energyMultiplier: 2050000.0, gemMultiplier: 1640000.0, description: 'Royal authority over all possible domains' },
  { id: 212, name: 'Infinity Mirror', category: 'Artifacts', rarity: 'Rare', price: 4.5e16, gemPrice: 2.25e16, energyMultiplier: 2200000.0, gemMultiplier: 1760000.0, description: 'Reflects infinite versions of yourself across all realities' },
  { id: 213, name: 'Logic Prism', category: 'Artifacts', rarity: 'Epic', price: 5.5e16, gemPrice: 2.75e16, energyMultiplier: 2500000.0, gemMultiplier: 2000000.0, description: 'Refracts pure reason into its component principles' },
  { id: 214, name: 'Chaos Pendant', category: 'Artifacts', rarity: 'Epic', price: 7e16, gemPrice: 3.5e16, energyMultiplier: 2800000.0, gemMultiplier: 2240000.0, description: 'Embraces randomness as the source of all possibility' },
  { id: 215, name: 'Meta-Codex', category: 'Artifacts', rarity: 'Legendary', price: 9e16, gemPrice: 4.5e16, energyMultiplier: 3200000.0, gemMultiplier: 2560000.0, description: 'The book that contains all other books, including itself' },
  { id: 237, name: 'Meta-Infinity Core', category: 'Artifacts', rarity: 'Mythic', price: 1.5e17, gemPrice: 7.5e16, energyMultiplier: 4500000.0, gemMultiplier: 3600000.0, description: 'The processing unit that runs infinite realities simultaneously' },
  { id: 238, name: 'Omniversal Engine', category: 'Artifacts', rarity: 'Mythic', price: 2e17, gemPrice: 1e17, energyMultiplier: 5200000.0, gemMultiplier: 4160000.0, description: 'Powers the machinery of all possible universes' },
  { id: 216, name: 'Absolute Sphere', category: 'Artifacts', rarity: 'Legendary', price: 1.1e17, gemPrice: 5.5e16, energyMultiplier: 3600000.0, gemMultiplier: 2880000.0, description: 'Perfect geometry containing infinite dimensions' },
  { id: 217, name: 'Origin Matrix', category: 'Artifacts', rarity: 'Secret', price: 0, gemPrice: 0, energyMultiplier: 8500000.0, gemMultiplier: 6800000.0, description: 'The mathematical foundation upon which all reality is built' },

  // Relics (10 items - expanded to include all rarities)
  { id: 218, name: 'Cosmic Fragment', category: 'Relics', rarity: 'Common', price: 2.5e16, gemPrice: 1.25e16, energyMultiplier: 1000000.0, gemMultiplier: 800000.0, description: 'A piece of the original infinity' },
  { id: 219, name: 'Void Shard', category: 'Relics', rarity: 'Uncommon', price: 4e16, gemPrice: 2e16, energyMultiplier: 1250000.0, gemMultiplier: 1000000.0, description: 'Crystallized nothingness with infinite potential' },
  { id: 220, name: 'Reality Core', category: 'Relics', rarity: 'Rare', price: 6e16, gemPrice: 3e16, energyMultiplier: 1580000.0, gemMultiplier: 1264000.0, description: 'The processing unit of existence itself' },
  { id: 221, name: 'Infinite Genesis', category: 'Relics', rarity: 'Epic', price: 8e16, gemPrice: 4e16, energyMultiplier: 2080000.0, gemMultiplier: 1664000.0, description: 'The moment of creation, endlessly repeating' },
  { id: 222, name: 'Omniscience Archive', category: 'Relics', rarity: 'Epic', price: 1e17, gemPrice: 5e16, energyMultiplier: 2330000.0, gemMultiplier: 1864000.0, description: 'All knowledge that ever was or could be' },
  { id: 223, name: 'Paradox Engine Core', category: 'Relics', rarity: 'Legendary', price: 1.2e17, gemPrice: 6e16, energyMultiplier: 2665000.0, gemMultiplier: 2132000.0, description: 'The heart of impossible machinery' },
  { id: 236, name: 'Omnipotence Nexus', category: 'Relics', rarity: 'Mythic', price: 2e17, gemPrice: 1e17, energyMultiplier: 3500000.0, gemMultiplier: 2800000.0, description: 'Where unlimited power meets infinite wisdom' },
  { id: 224, name: 'Meta-Reality Seed', category: 'Relics', rarity: 'Legendary', price: 1.5e17, gemPrice: 7.5e16, energyMultiplier: 3000000.0, gemMultiplier: 2400000.0, description: 'Plant it to grow an entire universe' },
  { id: 225, name: 'Infinity Gate', category: 'Relics', rarity: 'Legendary', price: 1.8e17, gemPrice: 9e16, energyMultiplier: 3000000.0, gemMultiplier: 2400000.0, description: 'The gateway to unlimited possibilities' },
  { id: 226, name: 'Absolute Unity', category: 'Relics', rarity: 'Secret', price: 0, gemPrice: 0, energyMultiplier: 4000000.0, gemMultiplier: 3200000.0, description: 'The perfect harmony of all opposites' },
  { id: 227, name: 'Origin Singularity', category: 'Relics', rarity: 'Secret', price: 0, gemPrice: 0, energyMultiplier: 4800000.0, gemMultiplier: 3840000.0, description: 'The point from which all things emerge and to which all return' },
];