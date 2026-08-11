import React, { useState } from 'react';
import { X, MapPin, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentAddress: string;
  onSaveAddress: (newAddress: string) => void;
}

const PRESET_LOCATIONS = [
  '124 Main Street, Downtown',
  '742 Evergreen Terrace, Westside',
  '88 Financial Plaza, Suite 400',
  '505 University Avenue, Campus Quarter'
];

export const LocationModal: React.FC<LocationModalProps> = ({
  isOpen,
  onClose,
  currentAddress,
  onSaveAddress,
}) => {
  if (!isOpen) return null;

  const [inputVal, setInputVal] = useState<string>(currentAddress);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputVal.trim()) {
      onSaveAddress(inputVal.trim());
      onClose();
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-stone-900 border border-stone-800 w-full max-w-md rounded-3xl overflow-hidden text-stone-100 shadow-2xl p-5 space-y-4"
        >
          <div className="flex items-center justify-between pb-3 border-b border-stone-800">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-amber-400" />
              <h2 className="text-base font-bold text-stone-100">Delivery Address</h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="text-xs font-bold text-stone-400 uppercase tracking-wider block mb-1">
                Enter Street Address
              </label>
              <input
                type="text"
                required
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="Street address, city, apt/suite..."
                className="w-full px-3.5 py-2.5 bg-stone-800 text-stone-100 placeholder-stone-500 rounded-xl border border-stone-700 text-sm focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-stone-400 uppercase tracking-wider block">
                Saved Locations
              </label>
              {PRESET_LOCATIONS.map((loc) => (
                <button
                  key={loc}
                  type="button"
                  onClick={() => setInputVal(loc)}
                  className={`w-full text-left p-2.5 rounded-xl border text-xs font-medium transition-all flex items-center justify-between ${
                    inputVal === loc
                      ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                      : 'bg-stone-800/60 border-stone-700/50 text-stone-300 hover:border-stone-600'
                  }`}
                >
                  <span className="truncate">{loc}</span>
                  {inputVal === loc && <Check className="w-4 h-4 text-amber-400 shrink-0" />}
                </button>
              ))}
            </div>

            <button
              type="submit"
              className="w-full bg-amber-500 hover:bg-amber-400 text-stone-950 font-black py-3 rounded-xl shadow-md text-sm transition-all mt-2"
            >
              Save Address
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
