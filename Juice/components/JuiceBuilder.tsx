import React, { useState } from 'react';
import { INGREDIENTS } from '../constants';
import { Ingredient, IngredientCategory, JuiceProduct } from '../types';
import { generateJuiceDetails } from '../services/geminiService';
import { Plus, X, Loader2, Sparkles, Droplets, Leaf, Zap, Award } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid'; // Just kidding, we'll use Date.now() for simplicity without extra deps

interface JuiceBuilderProps {
  onAddToCart: (product: JuiceProduct) => void;
}

export const JuiceBuilder: React.FC<JuiceBuilderProps> = ({ onAddToCart }) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedJuice, setGeneratedJuice] = useState<JuiceProduct | null>(null);

  const selectedIngredients = INGREDIENTS.filter(i => selectedIds.includes(i.id));

  const toggleIngredient = (id: string) => {
    // Reset generated juice if selection changes
    if (generatedJuice) setGeneratedJuice(null);

    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleBlend = async () => {
    if (selectedIngredients.length === 0) return;
    
    setIsGenerating(true);
    try {
      const details = await generateJuiceDetails(selectedIngredients);
      
      const newJuice: JuiceProduct = {
        id: `custom-${Date.now()}`,
        name: details.name,
        description: details.description,
        ingredients: selectedIngredients,
        price: details.priceEstimate,
        calories: details.calories,
        benefits: details.benefits,
        colorHex: details.colorHex
      };
      
      setGeneratedJuice(newJuice);
    } catch (error) {
      console.error(error);
      alert("Oops! Our AI blender got jammed. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleReset = () => {
    setSelectedIds([]);
    setGeneratedJuice(null);
  };

  const categories = [
    { label: 'Base', val: IngredientCategory.BASE, icon: <Droplets size={18} /> },
    { label: 'Fruits', val: IngredientCategory.FRUIT, icon: <Award size={18} /> },
    { label: 'Veggies', val: IngredientCategory.VEGETABLE, icon: <Leaf size={18} /> },
    { label: 'Boosters', val: IngredientCategory.BOOSTER, icon: <Zap size={18} /> },
  ];

  return (
    <section id="create" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-stone-900 sm:text-4xl">
            Create Your <span className="text-orange-600">Masterpiece</span>
          </h2>
          <p className="mt-4 text-lg text-stone-500">
            Select up to 5 ingredients and let our AI Chef craft the perfect profile.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Ingredient Selection */}
          <div className="space-y-8">
            {categories.map((cat) => (
              <div key={cat.val}>
                <div className="flex items-center gap-2 mb-4 text-stone-700 font-semibold">
                  {cat.icon}
                  <h3>{cat.label}</h3>
                </div>
                <div className="flex flex-wrap gap-3">
                  {INGREDIENTS.filter(i => i.category === cat.val).map(ing => {
                    const isSelected = selectedIds.includes(ing.id);
                    return (
                      <button
                        key={ing.id}
                        onClick={() => toggleIngredient(ing.id)}
                        disabled={!isSelected && selectedIds.length >= 6}
                        className={`
                          flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-200
                          ${isSelected 
                            ? 'bg-orange-600 border-orange-600 text-white shadow-md transform scale-105' 
                            : 'bg-white border-stone-200 text-stone-600 hover:border-orange-300 hover:bg-orange-50'
                          }
                          ${!isSelected && selectedIds.length >= 6 ? 'opacity-50 cursor-not-allowed' : ''}
                        `}
                      >
                        <span>{ing.emoji}</span>
                        <span>{ing.name}</span>
                        {isSelected && <X size={14} />}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}

            <div className="pt-6 border-t border-stone-100 flex justify-between items-center">
              <span className="text-stone-500 text-sm">
                {selectedIds.length}/6 Ingredients Selected
              </span>
              <div className="flex gap-3">
                 <button 
                  onClick={handleReset}
                  className="px-6 py-3 rounded-xl font-medium text-stone-500 hover:text-stone-800 transition-colors"
                >
                  Reset
                </button>
                <button
                  onClick={handleBlend}
                  disabled={selectedIds.length === 0 || isGenerating}
                  className={`
                    flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-white transition-all
                    ${selectedIds.length === 0 
                      ? 'bg-stone-300 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-orange-500 to-red-500 hover:shadow-lg hover:shadow-orange-500/30 transform hover:-translate-y-1'
                    }
                  `}
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="animate-spin" /> Blending...
                    </>
                  ) : (
                    <>
                      <Sparkles size={18} /> Blend It
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Right: Result Card */}
          <div className="relative">
            <div className="sticky top-24 bg-stone-50 rounded-3xl p-8 border border-stone-200 min-h-[500px] flex flex-col justify-center items-center text-center">
              {!generatedJuice ? (
                <div className="text-stone-400 space-y-4">
                  <div className="w-32 h-32 bg-stone-200 rounded-full mx-auto flex items-center justify-center">
                    <CitrusPlaceholder />
                  </div>
                  <p>Select ingredients and click "Blend It" to see the magic.</p>
                </div>
              ) : (
                <div className="w-full animate-fadeIn">
                   {/* Generated Content */}
                   <div 
                    className="w-40 h-40 rounded-full mx-auto mb-6 shadow-xl flex items-center justify-center text-4xl border-4 border-white"
                    style={{ backgroundColor: generatedJuice.colorHex }}
                   >
                     🥤
                   </div>
                   
                   <h3 className="text-3xl font-bold text-stone-800 mb-2">{generatedJuice.name}</h3>
                   <p className="text-stone-600 mb-6 italic">"{generatedJuice.description}"</p>
                   
                   <div className="grid grid-cols-3 gap-4 mb-8">
                      <div className="bg-white p-3 rounded-xl shadow-sm">
                        <div className="text-xs text-stone-500 uppercase font-bold tracking-wider">Calories</div>
                        <div className="text-xl font-bold text-orange-600">{generatedJuice.calories}</div>
                      </div>
                      <div className="col-span-2 bg-white p-3 rounded-xl shadow-sm flex flex-col justify-center">
                         <div className="text-xs text-stone-500 uppercase font-bold tracking-wider mb-1">Key Benefits</div>
                         <div className="flex flex-wrap justify-center gap-1">
                            {generatedJuice.benefits.slice(0, 2).map((b, i) => (
                              <span key={i} className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">{b}</span>
                            ))}
                         </div>
                      </div>
                   </div>

                   <div className="space-y-4">
                     <div className="flex justify-between items-center px-4 py-3 bg-white rounded-xl border border-stone-200">
                        <span className="font-semibold text-stone-700">Total Price</span>
                        <span className="text-2xl font-bold text-stone-900">${generatedJuice.price.toFixed(2)}</span>
                     </div>
                     
                     <button
                      onClick={() => onAddToCart(generatedJuice)}
                      className="w-full py-4 bg-stone-900 text-white rounded-xl font-bold hover:bg-stone-800 transition-colors flex items-center justify-center gap-2"
                     >
                       <Plus size={20} /> Add to Cart
                     </button>
                   </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const CitrusPlaceholder = () => (
  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
    <path d="m8 14 4-9"/>
    <path d="m16 14-4-9"/>
    <path d="m12 14-4 9"/>
    <path d="m12 14 4 9"/>
  </svg>
);