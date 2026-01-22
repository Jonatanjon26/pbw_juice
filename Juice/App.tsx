import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { JuiceBuilder } from './components/JuiceBuilder';
import { Menu } from './components/Menu';
import { CartDrawer } from './components/CartDrawer';
import { ChatAssistant } from './components/ChatAssistant';
import { CartItem, JuiceProduct } from './types';
import { checkDbConnection } from './services/api';

function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [dbConnected, setDbConnected] = useState(false);

  useEffect(() => {
    checkDbConnection().then(setDbConnected);
  }, []);

  const addToCart = (product: JuiceProduct) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.product.id !== id));
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-stone-50">
      <Header
        cartCount={cartCount}
        onCartClick={() => setIsCartOpen(true)}
        dbConnected={dbConnected}
      />

      <main>
        <Hero />
        <JuiceBuilder onAddToCart={addToCart} />
        <Menu onAddToCart={addToCart} />
      </main>

      <footer className="bg-stone-900 text-stone-400 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="mb-4">Vitality Press &copy; 2024</p>
          <p className="text-sm">
            Powered by Google.
          </p>
        </div>
      </footer>

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemove={removeFromCart}
        onClearCart={() => setCartItems([])}
      />

      <ChatAssistant />
    </div>
  );
}

export default App;