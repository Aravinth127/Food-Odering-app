import React, { useState } from 'react';
import { CartItem } from '../types';
import { X, Trash2, Plus, Minus, Tag, ArrowRight, ShoppingBag, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PROMO_CODES } from '../data/mockData';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQty: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onProceedToCheckout: () => void;
  appliedPromo: string | null;
  onApplyPromo: (code: string) => string | null; // returns error message if invalid
  onRemovePromo: () => void;
  tipAmount: number;
  setTipAmount: (tip: number) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  appliedPromo,
  onApplyPromo,
  onRemovePromo,
  tipAmount,
  setTipAmount,
}) => {
  if (!isOpen) return null;

  const [promoInput, setPromoInput] = useState<string>('');
  const [promoError, setPromoError] = useState<string | null>(null);

  const subtotal = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
  const deliveryFee = subtotal >= 25 ? 0 : 2.99; // Free delivery over $25

  // Promo calculation
  let discount = 0;
  if (appliedPromo && PROMO_CODES[appliedPromo]) {
    const promo = PROMO_CODES[appliedPromo];
    if (subtotal >= promo.minSubtotal) {
      if (promo.type === 'percentage') {
        discount = (subtotal * promo.value) / 100;
      } else {
        discount = promo.value;
      }
    }
  }

  const tax = subtotal * 0.0825; // 8.25% estimated local tax
  const total = Math.max(0, subtotal - discount + deliveryFee + tax + tipAmount);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError(null);
    if (!promoInput.trim()) return;
    const err = onApplyPromo(promoInput.trim().toUpperCase());
    if (err) {
      setPromoError(err);
    } else {
      setPromoInput('');
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden bg-black/75 backdrop-blur-sm flex justify-end">
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="w-full max-w-md bg-stone-900 border-l border-stone-800 h-full flex flex-col text-stone-100 shadow-2xl"
        >
          {/* Header */}
          <div className="p-4 border-b border-stone-800 flex items-center justify-between bg-stone-950">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-amber-400" />
              <h2 className="text-lg font-bold text-stone-100">Your Cart</h2>
              <span className="bg-amber-500/20 text-amber-300 text-xs font-bold px-2 py-0.5 rounded-full border border-amber-500/30">
                {cartItems.length} items
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-stone-400 space-y-3">
                <div className="w-16 h-16 rounded-2xl bg-stone-800 border border-stone-700 flex items-center justify-center text-stone-500">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <p className="text-base font-bold text-stone-200">Your cart is empty</p>
                <p className="text-xs max-w-xs text-stone-400">
                  Explore our artisanal pizzas, smash burgers, and fresh sushi bowls to add delicious items!
                </p>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.cartItemId}
                  className="bg-stone-800/80 rounded-2xl border border-stone-700/60 p-3.5 flex gap-3 items-start relative group"
                >
                  <img
                    src={item.dish.image}
                    alt={item.dish.name}
                    className="w-16 h-16 rounded-xl object-cover shrink-0 bg-stone-950"
                    referrerPolicy="no-referrer"
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="font-bold text-stone-100 text-sm truncate">
                        {item.dish.name}
                      </h4>
                      <button
                        onClick={() => onRemoveItem(item.cartItemId)}
                        className="text-stone-500 hover:text-red-400 transition-colors p-1"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Customization Details */}
                    <div className="text-[11px] text-stone-400 mt-1 space-y-0.5">
                      {item.choice.selectedSize && (
                        <div>Size: <span className="text-stone-300">{item.choice.selectedSize.name}</span></div>
                      )}
                      {item.choice.spiceLevel && (
                        <div>Spice: <span className="text-red-400 font-semibold">{item.choice.spiceLevel}</span></div>
                      )}
                      {item.choice.selectedAddons.length > 0 && (
                        <div className="truncate">
                          Addons: {item.choice.selectedAddons.map((a) => a.name).join(', ')}
                        </div>
                      )}
                      {item.choice.specialInstructions && (
                        <div className="italic text-amber-300/80 truncate">
                          "{item.choice.specialInstructions}"
                        </div>
                      )}
                    </div>

                    {/* Price and Quantity Adjuster */}
                    <div className="mt-2.5 flex items-center justify-between">
                      <span className="text-sm font-extrabold text-amber-400">
                        ${item.totalPrice.toFixed(2)}
                      </span>

                      <div className="flex items-center gap-2 bg-stone-900 border border-stone-700 rounded-lg p-1">
                        <button
                          onClick={() => onUpdateQuantity(item.cartItemId, item.quantity - 1)}
                          className="w-5 h-5 rounded flex items-center justify-center bg-stone-800 hover:bg-stone-700 text-stone-200"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold w-4 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.cartItemId, item.quantity + 1)}
                          className="w-5 h-5 rounded flex items-center justify-center bg-stone-800 hover:bg-stone-700 text-stone-200"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Cart Summary & Checkout Footer */}
          {cartItems.length > 0 && (
            <div className="p-4 bg-stone-950 border-t border-stone-800 space-y-3 shrink-0">
              
              {/* Promo Code Input */}
              <div>
                {appliedPromo ? (
                  <div className="flex items-center justify-between bg-emerald-950/60 border border-emerald-500/50 p-2.5 rounded-xl text-xs text-emerald-300">
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4 text-emerald-400" />
                      <span>Code <strong>{appliedPromo}</strong> applied</span>
                    </div>
                    <button
                      onClick={onRemovePromo}
                      className="text-stone-400 hover:text-stone-100 underline text-[11px]"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <input
                      type="text"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      placeholder="Promo Code (e.g. WELCOME20)"
                      className="flex-1 px-3 py-1.5 bg-stone-900 text-stone-100 placeholder-stone-500 rounded-xl text-xs border border-stone-800 focus:outline-none focus:border-amber-500 uppercase font-mono"
                    />
                    <button
                      type="submit"
                      className="px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 font-bold rounded-xl text-xs border border-stone-700"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {promoError && (
                  <p className="text-[11px] text-red-400 mt-1 font-medium">{promoError}</p>
                )}
              </div>

              {/* Tip Selection */}
              <div>
                <label className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block mb-1">
                  Courier Tip
                </label>
                <div className="grid grid-cols-4 gap-1.5">
                  {[2.00, 3.50, 5.00, 7.00].map((amt) => {
                    const isSelected = tipAmount === amt;
                    return (
                      <button
                        key={amt}
                        onClick={() => setTipAmount(amt)}
                        className={`py-1 rounded-lg text-xs font-bold border transition-all ${
                          isSelected
                            ? 'bg-amber-500 border-amber-400 text-stone-950'
                            : 'bg-stone-900 border-stone-800 text-stone-400 hover:text-stone-200'
                        }`}
                      >
                        ${amt.toFixed(2)}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Itemized Calculation */}
              <div className="space-y-1.5 text-xs text-stone-300 pt-2 border-t border-stone-800/80">
                <div className="flex justify-between">
                  <span className="text-stone-400">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Discount</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-stone-400">Delivery Fee</span>
                  <span>{deliveryFee === 0 ? <strong className="text-emerald-400">FREE</strong> : `$${deliveryFee.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">Estimated Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">Courier Tip</span>
                  <span>${tipAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm font-black text-stone-100 pt-2 border-t border-stone-800">
                  <span>Total</span>
                  <span className="text-amber-400">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={onProceedToCheckout}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-stone-950 font-black py-3 rounded-xl shadow-lg shadow-amber-500/20 text-sm transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Checkout</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </button>

            </div>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
