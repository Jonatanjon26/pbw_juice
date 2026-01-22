import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, Loader2 } from 'lucide-react';
import { CartItem } from '../types';
import { createOrder } from '../services/api';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (id: string) => void;
  onClearCart?: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, items, onRemove, onClearCart }) => {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const total = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    const result = await createOrder({
      items: items.map(i => ({
        id: i.product.id,
        name: i.product.name,
        quantity: i.quantity,
        price: i.product.price
      })),
      total
    });
    setIsCheckingOut(false);

    if (result.success) {
      alert(`Order #${result.orderId} placed successfully!`);
      if (onClearCart) onClearCart();
      onClose();
    } else {
      alert('Failed to place order. Please try again.');
    }
  };

  return (
    <div className={`fixed inset-0 z-50 overflow-hidden ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
      <div
        className={`absolute inset-0 bg-stone-900/50 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />

      <div className={`absolute inset-y-0 right-0 max-w-md w-full bg-white shadow-2xl transform transition-transform duration-300 flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex items-center justify-between p-6 border-b border-stone-100">
          <h2 className="text-xl font-bold text-stone-800 flex items-center gap-2">
            <ShoppingBag size={20} /> Your Cart
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-stone-100 rounded-full transition-colors">
            <X size={24} className="text-stone-500" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="text-center py-20 text-stone-400">
              <ShoppingBag size={48} className="mx-auto mb-4 opacity-50" />
              <p>Your cart is empty.</p>
              <button onClick={onClose} className="mt-4 text-orange-600 font-medium hover:underline">Start Shopping</button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.product.id} className="flex gap-4 items-start">
                <div
                  className="w-20 h-20 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                  style={{ backgroundColor: `${item.product.colorHex}30` }}
                >
                  🥤
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-stone-800">{item.product.name}</h3>
                  <p className="text-xs text-stone-500 mb-2">{item.product.ingredients.map(i => i.name).join(', ')}</p>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-orange-600">${item.product.price.toFixed(2)}</span>
                    <button
                      onClick={() => onRemove(item.product.id)}
                      className="text-stone-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 border-t border-stone-100 bg-stone-50">
            <div className="flex justify-between items-center mb-6">
              <span className="text-lg font-medium text-stone-600">Total</span>
              <span className="text-2xl font-bold text-stone-900">${total.toFixed(2)}</span>
            </div>
            <button
              className="w-full py-4 bg-orange-600 text-white rounded-xl font-bold hover:bg-orange-700 transition-colors shadow-lg shadow-orange-500/30 flex justify-center items-center gap-2"
              onClick={handleCheckout}
              disabled={isCheckingOut}
            >
              {isCheckingOut ? (
                <>
                  <Loader2 className="animate-spin" /> Processing...
                </>
              ) : (
                'Checkout Now'
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};