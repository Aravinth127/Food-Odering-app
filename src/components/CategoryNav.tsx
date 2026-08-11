import React from 'react';
import { CategoryType } from '../types';
import { 
  Flame, 
  Pizza, 
  Beef, 
  Fish, 
  Salad, 
  Coffee, 
  Cake, 
  UtensilsCrossed,
  GlassWater,
  Sparkles
} from 'lucide-react';

interface CategoryNavProps {
  selectedCategory: CategoryType;
  onSelectCategory: (cat: CategoryType) => void;
  activeDietaryFilters: string[];
  onToggleDietaryFilter: (filter: string) => void;
}

const CATEGORIES: { id: CategoryType; label: string; icon: React.ReactNode }[] = [
  { id: 'all', label: 'All Dishes', icon: <UtensilsCrossed className="w-4 h-4" /> },
  { id: 'pizza', label: 'Pizza', icon: <Pizza className="w-4 h-4" /> },
  { id: 'burger', label: 'Burgers', icon: <Beef className="w-4 h-4" /> },
  { id: 'sushi', label: 'Sushi & Asian', icon: <Fish className="w-4 h-4" /> },
  { id: 'healthy', label: 'Healthy Bowls', icon: <Salad className="w-4 h-4" /> },
  { id: 'mexican', label: 'Mexican Tacos', icon: <Flame className="w-4 h-4 text-orange-500" /> },
  { id: 'desserts', label: 'Desserts', icon: <Cake className="w-4 h-4" /> },
  { id: 'drinks', label: 'Beverages', icon: <GlassWater className="w-4 h-4" /> },
];

const DIETARY_TAGS = [
  { id: 'popular', label: '🔥 Popular' },
  { id: 'vegan', label: '🌱 Vegan' },
  { id: 'glutenFree', label: '🌾 Gluten-Free' },
  { id: 'spicy', label: '🌶️ Spicy' },
  { id: 'under30', label: '⚡ Fast (<20 min)' },
];

export const CategoryNav: React.FC<CategoryNavProps> = ({
  selectedCategory,
  onSelectCategory,
  activeDietaryFilters,
  onToggleDietaryFilter,
}) => {
  return (
    <div className="bg-stone-900 border-b border-stone-800/80 py-4 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Category Horizontal Carousel */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 border ${
                  isSelected
                    ? 'bg-amber-500 text-stone-950 border-amber-400 shadow-md shadow-amber-500/20 scale-102'
                    : 'bg-stone-800/90 text-stone-300 border-stone-700/60 hover:bg-stone-700 hover:text-stone-100'
                }`}
              >
                {cat.icon}
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Dietary & Fast Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1">
          <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider shrink-0 mr-1">
            Filter:
          </span>
          {DIETARY_TAGS.map((tag) => {
            const isFilterActive = activeDietaryFilters.includes(tag.id);
            return (
              <button
                key={tag.id}
                onClick={() => onToggleDietaryFilter(tag.id)}
                className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all border ${
                  isFilterActive
                    ? 'bg-amber-900/40 text-amber-300 border-amber-500/80 font-bold'
                    : 'bg-stone-800/50 text-stone-400 border-stone-700/40 hover:text-stone-200 hover:border-stone-600'
                }`}
              >
                {tag.label}
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
};
