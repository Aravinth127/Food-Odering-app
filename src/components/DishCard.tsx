import React from 'react';
import { Dish, Restaurant } from '../types';
import { Star, Clock, Flame, Plus, Sparkles } from 'lucide-react';

interface DishCardProps {
  dish: Dish;
  restaurant?: Restaurant;
  onCustomizeDish: (dish: Dish) => void;
}

export const DishCard: React.FC<DishCardProps> = ({
  dish,
  restaurant,
  onCustomizeDish,
}) => {
  return (
    <div className="group bg-stone-900 rounded-2xl border border-stone-800 hover:border-stone-700 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden">
      
      {/* Dish Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-950">
        <img
          src={dish.image}
          alt={dish.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
        
        {/* Top Floating Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          {dish.isPopular && (
            <span className="bg-amber-500 text-stone-950 text-[11px] font-extrabold px-2 py-0.5 rounded-full shadow-md flex items-center gap-1">
              <Flame className="w-3 h-3 fill-stone-950" />
              Popular
            </span>
          )}
          {dish.isVegan && (
            <span className="bg-emerald-900/90 text-emerald-300 border border-emerald-500/50 text-[10px] font-bold px-2 py-0.5 rounded-full backdrop-blur-md">
              Vegan
            </span>
          )}
          {dish.isGlutenFree && (
            <span className="bg-sky-900/90 text-sky-300 border border-sky-500/50 text-[10px] font-bold px-2 py-0.5 rounded-full backdrop-blur-md">
              Gluten-Free
            </span>
          )}
          {dish.isSpicy && (
            <span className="bg-red-950/90 text-red-300 border border-red-500/50 text-[10px] font-bold px-2 py-0.5 rounded-full backdrop-blur-md">
              Spicy 🌶️
            </span>
          )}
        </div>

        {/* Prep Time Badge */}
        <div className="absolute bottom-3 right-3 bg-stone-900/80 backdrop-blur-md text-stone-300 text-xs font-semibold px-2.5 py-1 rounded-lg border border-stone-700/60 flex items-center gap-1">
          <Clock className="w-3.5 h-3.5 text-amber-400" />
          <span>{dish.prepTime}</span>
        </div>
      </div>

      {/* Dish Details */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Restaurant name if provided */}
          {restaurant && (
            <span className="text-xs font-medium text-amber-400 block mb-1">
              {restaurant.name}
            </span>
          )}

          {/* Title */}
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-bold text-stone-100 text-base leading-snug group-hover:text-amber-400 transition-colors">
              {dish.name}
            </h3>
            <div className="flex items-center gap-1 text-amber-400 text-xs font-bold shrink-0 bg-stone-800 px-1.5 py-0.5 rounded-md">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>{dish.rating}</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-stone-400 text-xs line-clamp-2 mt-1.5 leading-relaxed">
            {dish.description}
          </p>

          {/* Calories & Ingredients snippet */}
          <div className="mt-2.5 flex items-center gap-2 text-[11px] text-stone-400 font-medium">
            <span className="bg-stone-800/80 px-2 py-0.5 rounded text-stone-300">
              {dish.calories} kcal
            </span>
            <span className="truncate">
              {dish.ingredients.slice(0, 3).join(', ')}
            </span>
          </div>
        </div>

        {/* Price & Add Button */}
        <div className="mt-4 pt-3 border-t border-stone-800/80 flex items-center justify-between">
          <div>
            <span className="text-xs text-stone-400 block">Price</span>
            <span className="text-lg font-extrabold text-stone-100">
              ${dish.price.toFixed(2)}
            </span>
          </div>

          <button
            onClick={() => onCustomizeDish(dish)}
            className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs px-3.5 py-2 rounded-xl shadow-md transition-all active:scale-95"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Customize</span>
          </button>
        </div>

      </div>
    </div>
  );
};
