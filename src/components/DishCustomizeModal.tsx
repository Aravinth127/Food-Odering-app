import React, { useState } from 'react';
import { Dish, CustomizationChoice, AddonOption } from '../types';
import { X, Plus, Minus, Flame, Check, Utensils } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface DishCustomizeModalProps {
  dish: Dish | null;
  onClose: () => void;
  onAddToCart: (dish: Dish, quantity: number, choice: CustomizationChoice) => void;
}

export const DishCustomizeModal: React.FC<DishCustomizeModalProps> = ({
  dish,
  onClose,
  onAddToCart,
}) => {
  if (!dish) return null;

  const [quantity, setQuantity] = useState<number>(1);
  const [selectedSize, setSelectedSize] = useState<{ name: string; priceDelta: number } | undefined>(
    dish.options?.sizes ? dish.options.sizes[0] : undefined
  );
  const [selectedSpice, setSelectedSpice] = useState<string | undefined>(
    dish.options?.spiceLevels ? dish.options.spiceLevels[0] : undefined
  );
  const [selectedAddons, setSelectedAddons] = useState<AddonOption[]>([]);
  const [specialInstructions, setSpecialInstructions] = useState<string>('');

  const toggleAddon = (addon: AddonOption) => {
    if (selectedAddons.some((a) => a.id === addon.id)) {
      setSelectedAddons(selectedAddons.filter((a) => a.id !== addon.id));
    } else {
      setSelectedAddons([...selectedAddons, addon]);
    }
  };

  // Calculate unit price based on base price + size delta + add-ons
  const sizeDelta = selectedSize ? selectedSize.priceDelta : 0;
  const addonsTotal = selectedAddons.reduce((sum, a) => sum + a.price, 0);
  const unitPrice = dish.price + sizeDelta + addonsTotal;
  const totalPrice = unitPrice * quantity;

  const handleAdd = () => {
    onAddToCart(dish, quantity, {
      selectedSize,
      spiceLevel: selectedSpice,
      selectedAddons,
      specialInstructions: specialInstructions.trim() || undefined,
    });
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/75 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          className="bg-stone-900 border border-stone-800 w-full max-w-lg rounded-t-3xl sm:rounded-3xl max-h-[90vh] flex flex-col overflow-hidden text-stone-100 shadow-2xl"
        >
          {/* Header Image & Close */}
          <div className="relative h-48 w-full bg-stone-950 shrink-0">
            <img
              src={dish.image}
              alt={dish.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-transparent" />
            
            <button
              onClick={onClose}
              className="absolute top-3 right-3 p-2 bg-stone-900/80 hover:bg-stone-800 text-stone-300 rounded-full border border-stone-700/80 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="absolute bottom-3 left-4 right-4">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-stone-950/80 px-2.5 py-0.5 rounded">
                Customize Dish
              </span>
              <h2 className="text-xl font-black text-stone-100 mt-1">
                {dish.name}
              </h2>
            </div>
          </div>

          {/* Modal Scrollable Content */}
          <div className="p-5 overflow-y-auto space-y-6 flex-1">
            <p className="text-stone-300 text-sm leading-relaxed">
              {dish.description}
            </p>

            {/* Size Selector if available */}
            {dish.options?.sizes && dish.options.sizes.length > 0 && (
              <div>
                <label className="text-xs font-bold text-stone-400 uppercase tracking-wider block mb-2">
                  Choose Size
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {dish.options.sizes.map((size) => {
                    const isSelected = selectedSize?.name === size.name;
                    return (
                      <button
                        key={size.name}
                        onClick={() => setSelectedSize(size)}
                        className={`flex items-center justify-between p-3 rounded-xl border text-xs font-semibold transition-all ${
                          isSelected
                            ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                            : 'bg-stone-800/80 border-stone-700/60 text-stone-300 hover:border-stone-600'
                        }`}
                      >
                        <span>{size.name}</span>
                        <span>
                          {size.priceDelta > 0 ? `+$${size.priceDelta.toFixed(2)}` : 'Included'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Spice Level Selector if available */}
            {dish.options?.spiceLevels && dish.options.spiceLevels.length > 0 && (
              <div>
                <label className="text-xs font-bold text-stone-400 uppercase tracking-wider block mb-2">
                  Spice Level 🌶️
                </label>
                <div className="flex flex-wrap gap-2">
                  {dish.options.spiceLevels.map((spice) => {
                    const isSelected = selectedSpice === spice;
                    return (
                      <button
                        key={spice}
                        onClick={() => setSelectedSpice(spice)}
                        className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all ${
                          isSelected
                            ? 'bg-red-950/80 border-red-500 text-red-300'
                            : 'bg-stone-800/80 border-stone-700/60 text-stone-400 hover:text-stone-200'
                        }`}
                      >
                        {spice}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Addons Checklist if available */}
            {dish.options?.addons && dish.options.addons.length > 0 && (
              <div>
                <label className="text-xs font-bold text-stone-400 uppercase tracking-wider block mb-2">
                  Add Extra Toppings & Sides
                </label>
                <div className="space-y-2">
                  {dish.options.addons.map((addon) => {
                    const isChecked = selectedAddons.some((a) => a.id === addon.id);
                    return (
                      <button
                        key={addon.id}
                        onClick={() => toggleAddon(addon)}
                        className={`w-full flex items-center justify-between p-3 rounded-xl border text-xs font-medium transition-all ${
                          isChecked
                            ? 'bg-amber-500/10 border-amber-500 text-stone-100'
                            : 'bg-stone-800/60 border-stone-700/50 text-stone-300 hover:border-stone-600'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <div className={`w-4 h-4 rounded flex items-center justify-center border ${
                            isChecked ? 'bg-amber-500 border-amber-400 text-stone-950' : 'border-stone-600'
                          }`}>
                            {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                          <span>{addon.name}</span>
                        </div>
                        <span className="font-bold text-amber-400">
                          +${addon.price.toFixed(2)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Special Instructions Input */}
            <div>
              <label className="text-xs font-bold text-stone-400 uppercase tracking-wider block mb-1">
                Special Requests / Allergies
              </label>
              <textarea
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                placeholder="e.g. Extra sauce on side, no onions, light salt..."
                rows={2}
                className="w-full p-3 bg-stone-800/80 text-stone-100 placeholder-stone-400 rounded-xl border border-stone-700 text-xs focus:outline-none focus:border-amber-500"
              />
            </div>

          </div>

          {/* Modal Footer: Quantity Selector & Add to Cart Button */}
          <div className="p-4 bg-stone-950 border-t border-stone-800 flex items-center justify-between gap-4">
            
            {/* Quantity Controller */}
            <div className="flex items-center gap-3 bg-stone-800 border border-stone-700 rounded-xl p-1.5">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 rounded-lg bg-stone-700 hover:bg-stone-600 flex items-center justify-center text-stone-200 transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-6 text-center font-extrabold text-sm text-stone-100">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-8 h-8 rounded-lg bg-stone-700 hover:bg-stone-600 flex items-center justify-center text-stone-200 transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Submit Add to Cart Button */}
            <button
              onClick={handleAdd}
              className="flex-1 flex items-center justify-between bg-amber-500 hover:bg-amber-400 text-stone-950 font-black px-5 py-3 rounded-xl shadow-lg shadow-amber-500/20 text-sm transition-all"
            >
              <span>Add to Order</span>
              <span>${totalPrice.toFixed(2)}</span>
            </button>

          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
