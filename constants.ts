import { Ingredient, IngredientCategory, JuiceProduct } from './types';

export const INGREDIENTS: Ingredient[] = [
  // Bases
  { id: 'b1', name: 'Coconut Water', category: IngredientCategory.BASE, emoji: '🥥', color: 'bg-stone-200' },
  { id: 'b2', name: 'Almond Milk', category: IngredientCategory.BASE, emoji: '🥛', color: 'bg-amber-100' },
  { id: 'b3', name: 'Orange Juice Base', category: IngredientCategory.BASE, emoji: '🍊', color: 'bg-orange-200' },
  { id: 'b4', name: 'Green Tea', category: IngredientCategory.BASE, emoji: '🍵', color: 'bg-green-100' },

  // Fruits
  { id: 'f1', name: 'Pineapple', category: IngredientCategory.FRUIT, emoji: '🍍', color: 'bg-yellow-200' },
  { id: 'f2', name: 'Mango', category: IngredientCategory.FRUIT, emoji: '🥭', color: 'bg-orange-300' },
  { id: 'f3', name: 'Strawberry', category: IngredientCategory.FRUIT, emoji: '🍓', color: 'bg-red-200' },
  { id: 'f4', name: 'Blueberry', category: IngredientCategory.FRUIT, emoji: '🫐', color: 'bg-blue-200' },
  { id: 'f5', name: 'Banana', category: IngredientCategory.FRUIT, emoji: '🍌', color: 'bg-yellow-100' },

  // Vegetables
  { id: 'v1', name: 'Kale', category: IngredientCategory.VEGETABLE, emoji: '🥬', color: 'bg-green-600 text-white' },
  { id: 'v2', name: 'Spinach', category: IngredientCategory.VEGETABLE, emoji: '🍃', color: 'bg-green-500 text-white' },
  { id: 'v3', name: 'Carrot', category: IngredientCategory.VEGETABLE, emoji: '🥕', color: 'bg-orange-500 text-white' },
  { id: 'v4', name: 'Beetroot', category: IngredientCategory.VEGETABLE, emoji: '🍠', color: 'bg-rose-800 text-white' },
  { id: 'v5', name: 'Cucumber', category: IngredientCategory.VEGETABLE, emoji: '🥒', color: 'bg-emerald-200' },

  // Boosters
  { id: 'x1', name: 'Ginger', category: IngredientCategory.BOOSTER, emoji: '🫚', color: 'bg-amber-300' },
  { id: 'x2', name: 'Turmeric', category: IngredientCategory.BOOSTER, emoji: '🟠', color: 'bg-yellow-500' },
  { id: 'x3', name: 'Chia Seeds', category: IngredientCategory.BOOSTER, emoji: '⚫', color: 'bg-stone-400' },
  { id: 'x4', name: 'Protein Powder', category: IngredientCategory.BOOSTER, emoji: '💪', color: 'bg-slate-300' },
];

export const PRESET_MENU: JuiceProduct[] = [
  {
    id: 'p1',
    name: 'Morning Sunshine',
    description: 'A classic wake-up call with vitamin C and hydration.',
    ingredients: [INGREDIENTS[2], INGREDIENTS[4], INGREDIENTS[10]], // OJ, Pineapple, Carrot
    price: 8.50,
    calories: 180,
    benefits: ['Immunity Boost', 'Eye Health', 'Hydration'],
    colorHex: '#FDBA74'
  },
  {
    id: 'p2',
    name: 'Green Goddess',
    description: 'Detoxify your system with this powerful green blend.',
    ingredients: [INGREDIENTS[0], INGREDIENTS[5], INGREDIENTS[6], INGREDIENTS[9]], // Coco, Kale, Spinach, Cucumber
    price: 9.95,
    calories: 120,
    benefits: ['Detox', 'Skin Health', 'Anti-inflammatory'],
    colorHex: '#86EFAC'
  },
  {
    id: 'p3',
    name: 'Berry Blast',
    description: 'Antioxidant rich blend for recovery and energy.',
    ingredients: [INGREDIENTS[1], INGREDIENTS[7], INGREDIENTS[8], INGREDIENTS[13]], // Almond, Strawberry, Blue, Chia
    price: 10.50,
    calories: 240,
    benefits: ['Muscle Recovery', 'Brain Health', 'Sustained Energy'],
    colorHex: '#FDA4AF'
  }
];