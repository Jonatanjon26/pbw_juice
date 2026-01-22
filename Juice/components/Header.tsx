import React from 'react';
import { ShoppingBag, Citrus } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  onCartClick: () => void;
  dbConnected: boolean;
}

export const Header: React.FC<HeaderProps> = ({ cartCount, onCartClick, dbConnected }) => {
  return (
    <nav className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-stone-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <div className="bg-orange-500 p-2 rounded-full text-white">
              <Citrus size={24} />
            </div>
            <span className="font-bold text-xl tracking-tight text-stone-800">
              Vitality<span className="text-orange-500">Press</span>
            </span>
            <div className={`ml-4 px-2 py-0.5 rounded-full text-xs font-medium flex items-center gap-1 ${dbConnected ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
              <div className={`w-2 h-2 rounded-full ${dbConnected ? 'bg-green-500' : 'bg-red-500'}`} />
              {dbConnected ? 'DB Connected' : 'DB Offline'}
            </div>
          </div>

          <div className="flex items-center gap-6">
            <a href="#menu" className="text-stone-600 hover:text-orange-500 font-medium transition-colors hidden sm:block">Menu</a>
            <a href="#create" className="text-stone-600 hover:text-orange-500 font-medium transition-colors hidden sm:block">Create Own</a>

            <button
              onClick={onCartClick}
              className="relative p-2 text-stone-600 hover:text-orange-600 transition-colors"
            >
              <ShoppingBag size={24} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-orange-600 rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};