import React from 'react';
import { PRESET_MENU } from '../constants';
import { JuiceProduct } from '../types';
import { Plus } from 'lucide-react';

interface MenuProps {
  onAddToCart: (product: JuiceProduct) => void;
}

export const Menu: React.FC<MenuProps> = ({ onAddToCart }) => {
  return (
    <section id="menu" className="py-20 bg-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-stone-900 sm:text-4xl">
            Signature <span className="text-green-600">Blends</span>
          </h2>
          <p className="mt-4 text-lg text-stone-500">
            Tried and true favorites, curated by our expert nutritionists.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PRESET_MENU.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
              <div 
                className="h-48 w-full relative flex items-center justify-center"
                style={{ backgroundColor: `${product.colorHex}40` }} // 25% opacity background
              >
                 <div 
                  className="w-32 h-32 rounded-full shadow-lg flex items-center justify-center text-5xl border-4 border-white/50 backdrop-blur-sm"
                  style={{ backgroundColor: product.colorHex }}
                 >
                   🥤
                 </div>
              </div>
              
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                   <h3 className="text-xl font-bold text-stone-800">{product.name}</h3>
                   <span className="bg-stone-100 text-stone-600 text-xs font-bold px-2 py-1 rounded-md">${product.price.toFixed(2)}</span>
                </div>
                
                <p className="text-stone-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                
                <div className="mb-6 flex flex-wrap gap-2">
                  {product.benefits.slice(0, 2).map((b, i) => (
                    <span key={i} className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded-full border border-green-100">
                      {b}
                    </span>
                  ))}
                </div>

                <div className="mt-auto">
                   <button 
                    onClick={() => onAddToCart(product)}
                    className="w-full py-2.5 rounded-lg border-2 border-stone-900 text-stone-900 font-bold hover:bg-stone-900 hover:text-white transition-all flex items-center justify-center gap-2"
                   >
                     <Plus size={18} /> Add
                   </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};