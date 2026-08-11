import React, { useState } from 'react';
import { Dish, AIRecommendation, CustomizationChoice } from '../types';
import { X, Sparkles, Send, Plus, Check, Utensils, Flame, Leaf } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { DISHES } from '../data/mockData';

interface AIAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (dish: Dish, quantity: number, choice: CustomizationChoice) => void;
}

export const AIAssistantModal: React.FC<AIAssistantModalProps> = ({
  isOpen,
  onClose,
  onAddToCart,
}) => {
  if (!isOpen) return null;

  const [promptInput, setPromptInput] = useState<string>('');
  const [selectedDietary, setSelectedDietary] = useState<string[]>([]);
  const [maxBudget, setMaxBudget] = useState<number>(25);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [recommendation, setRecommendation] = useState<AIRecommendation | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const toggleDiet = (diet: string) => {
    if (selectedDietary.includes(diet)) {
      setSelectedDietary(selectedDietary.filter((d) => d !== diet));
    } else {
      setSelectedDietary([...selectedDietary, diet]);
    }
  };

  const handleAskAI = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsLoading(true);
    setErrorMsg(null);

    try {
      const response = await fetch('/api/ai/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: promptInput || 'Recommend a balanced, flavorful meal for me',
          availableDishes: DISHES,
          dietaryRestrictions: selectedDietary,
          maxBudget,
        }),
      });

      const json = await response.json();
      if (json.success && json.data) {
        setRecommendation(json.data);
      } else {
        setErrorMsg(json.error || 'Unable to get recommendation at the moment.');
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg('Network error while connecting to AI Concierge.');
    } finally {
      setIsLoading(false);
    }
  };

  const getDishById = (id: string): Dish | undefined => {
    return DISHES.find((d) => d.id === id);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-stone-900 border border-stone-800 w-full max-w-xl rounded-3xl overflow-hidden text-stone-100 shadow-2xl flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-purple-950 via-amber-950 to-orange-950 border-b border-amber-500/30 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40">
                <Sparkles className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <h2 className="text-lg font-black text-amber-200">AI Meal Concierge</h2>
                <p className="text-xs text-amber-300/80">Smart Craving & Dietary Recommendation</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-stone-900/80 hover:bg-stone-800 text-stone-300 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form & AI Interaction Area */}
          <div className="p-5 overflow-y-auto space-y-5 flex-1">
            
            {/* Craving Input Form */}
            <form onSubmit={handleAskAI} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-stone-300 uppercase tracking-wider block mb-1.5">
                  What are you craving today?
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={promptInput}
                    onChange={(e) => setPromptInput(e.target.value)}
                    placeholder="e.g. High protein dinner under $20, spicy Asian comfort food..."
                    className="w-full pl-4 pr-12 py-3 bg-stone-800 text-stone-100 placeholder-stone-400 rounded-2xl border border-stone-700 text-sm focus:outline-none focus:border-amber-500"
                  />
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-amber-500 hover:bg-amber-400 text-stone-950 rounded-xl transition-colors disabled:opacity-50"
                  >
                    <Send className="w-4 h-4 stroke-[2.5]" />
                  </button>
                </div>
              </div>

              {/* Quick Prompt Chips */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {[
                  '💪 High Protein Gym Meal',
                  '🍕 Comfort Food Night',
                  '🌱 Low Carb Vegan Bowl',
                  '🌶️ Spicy Seafood Craving'
                ].map((chip) => (
                  <button
                    key={chip}
                    type="button"
                    onClick={() => {
                      setPromptInput(chip);
                    }}
                    className="text-xs bg-stone-800/80 hover:bg-stone-700 text-stone-300 px-3 py-1 rounded-full border border-stone-700/60"
                  >
                    {chip}
                  </button>
                ))}
              </div>

              {/* Dietary Toggles & Budget Slider */}
              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-stone-400 uppercase block mb-1">
                    Dietary Requirements
                  </label>
                  <div className="flex flex-wrap gap-1">
                    {['Vegan', 'Gluten-Free', 'High Protein', 'Keto'].map((diet) => {
                      const active = selectedDietary.includes(diet);
                      return (
                        <button
                          key={diet}
                          type="button"
                          onClick={() => toggleDiet(diet)}
                          className={`text-xs px-2.5 py-1 rounded-lg border font-medium ${
                            active
                              ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-bold'
                              : 'bg-stone-800 border-stone-700 text-stone-400'
                          }`}
                        >
                          {diet}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] font-bold text-stone-400 uppercase mb-1">
                    <span>Max Dish Budget</span>
                    <span className="text-amber-400 font-black">${maxBudget}</span>
                  </div>
                  <input
                    type="range"
                    min={10}
                    max={40}
                    value={maxBudget}
                    onChange={(e) => setMaxBudget(Number(e.target.value))}
                    className="w-full accent-amber-500 bg-stone-800 rounded-lg cursor-pointer h-2"
                  />
                </div>
              </div>

            </form>

            {/* Error Display */}
            {errorMsg && (
              <div className="p-3 bg-red-950/60 border border-red-500/50 rounded-xl text-xs text-red-300">
                {errorMsg}
              </div>
            )}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="py-8 flex flex-col items-center justify-center space-y-3 text-stone-400">
                <Sparkles className="w-8 h-8 text-amber-400 animate-spin" />
                <p className="text-xs font-semibold animate-pulse">
                  Gemini AI analyzing flavors, dietary profiles & pairings...
                </p>
              </div>
            )}

            {/* AI Recommendation Output Result */}
            {recommendation && !isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4 pt-2 border-t border-stone-800"
              >
                {/* AI Reasoning Box */}
                <div className="bg-stone-800/80 p-4 rounded-2xl border border-amber-500/30 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400 uppercase">
                    <Sparkles className="w-4 h-4" />
                    <span>AI Culinary Sommelier Insight</span>
                  </div>
                  <p className="text-xs text-stone-200 leading-relaxed">
                    {recommendation.reasoning}
                  </p>
                  <div className="pt-2 border-t border-stone-700/60 text-[11px] text-emerald-400 font-medium">
                    🌱 {recommendation.nutritionHighlights}
                  </div>
                </div>

                {/* Recommended Dish Cards */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider">
                    Matched Dishes ({recommendation.recommendedDishIds.length})
                  </h4>

                  {recommendation.recommendedDishIds.map((dishId) => {
                    const dish = getDishById(dishId);
                    if (!dish) return null;

                    return (
                      <div
                        key={dish.id}
                        className="bg-stone-950 rounded-2xl border border-stone-800 p-3 flex items-center justify-between gap-3 hover:border-amber-500/50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={dish.image}
                            alt={dish.name}
                            className="w-14 h-14 rounded-xl object-cover shrink-0 bg-stone-900"
                            referrerPolicy="no-referrer"
                          />
                          <div>
                            <h5 className="text-xs font-bold text-stone-100">{dish.name}</h5>
                            <span className="text-xs font-black text-amber-400 mt-0.5 block">
                              ${dish.price.toFixed(2)}
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            onAddToCart(dish, 1, { selectedAddons: [] });
                          }}
                          className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs px-3 py-2 rounded-xl shadow transition-all"
                        >
                          <Plus className="w-4 h-4 stroke-[2.5]" />
                          <span>Add</span>
                        </button>
                      </div>
                    );
                  })}
                </div>

                {/* Suggested Pairings */}
                {recommendation.suggestedPairings && recommendation.suggestedPairings.length > 0 && (
                  <div className="bg-stone-950/60 p-3 rounded-xl border border-stone-800 text-xs text-stone-300">
                    <span className="font-bold text-amber-400 block mb-1">
                      💡 Complementary Pairing Suggestions:
                    </span>
                    <ul className="list-disc list-inside space-y-0.5 text-stone-400">
                      {recommendation.suggestedPairings.map((pairing, i) => (
                        <li key={i}>{pairing}</li>
                      ))}
                    </ul>
                  </div>
                )}

              </motion.div>
            )}

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
