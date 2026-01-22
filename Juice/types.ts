export enum IngredientCategory {
  BASE = 'Base Liquid',
  FRUIT = 'Fruit',
  VEGETABLE = 'Vegetable',
  BOOSTER = 'Superfood Booster'
}

export interface Ingredient {
  id: string;
  name: string;
  category: IngredientCategory;
  emoji: string;
  color: string; // Tailwind color class for badges
}

export interface JuiceProduct {
  id: string;
  name: string;
  description: string;
  ingredients: Ingredient[];
  price: number;
  calories: number;
  benefits: string[];
  colorHex: string; // Visual representation
  imagePrompt?: string; // For AI image generation if needed
}

export interface CartItem {
  product: JuiceProduct;
  quantity: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}