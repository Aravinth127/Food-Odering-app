import React from 'react';
import { 
  MapPin, 
  Search, 
  ShoppingBag, 
  Sparkles, 
  Clock, 
  Filter, 
  Utensils, 
  ChevronDown,
  History
} from 'lucide-react';
import { motion } from 'motion/react';

interface HeaderProps {
  address: string;
  onOpenAddressModal: () => void;
  orderType: 'delivery' | 'pickup';
  setOrderType: (type: 'delivery' | 'pickup') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  cartCount: number;
  cartTotal: number;
  onOpenCart: () => void;
  onOpenAIAssistant: () => void;
  activeOrderCount: number;
  onOpenLiveTracker: () => void;
  onOpenHistory: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  address,
  onOpenAddressModal,
  orderType,
  setOrderType,
  searchQuery,
  setSearchQuery,
  cartCount,
  cartTotal,
  onOpenCart,
  onOpenAIAssistant,
  activeOrderCount,
  onOpenLiveTracker,
  onOpenHistory,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-stone-900/95 backdrop-blur-md text-stone-100 border-b border-stone-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Navbar Row */}
        <div className="flex items-center justify-between h-16 gap-3">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center shadow-md shadow-orange-900/30">
              <Utensils className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-200 bg-clip-text text-transparent">
                FlavorDash
              </span>
              <span className="hidden md:inline-block ml-2 text-xs font-medium text-stone-400 bg-stone-800/80 px-2 py-0.5 rounded-full border border-stone-700/60">
                Express Delivery
              </span>
            </div>
          </div>

          {/* Delivery Location Selector & Order Type Toggle */}
          <div className="hidden md:flex items-center gap-3 bg-stone-800/90 border border-stone-700/80 rounded-full px-3 py-1.5 text-xs text-stone-300">
            <div className="flex items-center bg-stone-900/90 rounded-full p-0.5 border border-stone-700/50">
              <button
                onClick={() => setOrderType('delivery')}
                className={`px-3 py-1 rounded-full font-medium transition-all ${
                  orderType === 'delivery'
                    ? 'bg-amber-500 text-stone-950 font-bold shadow-sm'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                Delivery
              </button>
              <button
                onClick={() => setOrderType('pickup')}
                className={`px-3 py-1 rounded-full font-medium transition-all ${
                  orderType === 'pickup'
                    ? 'bg-amber-500 text-stone-950 font-bold shadow-sm'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                Pickup
              </button>
            </div>

            <button
              onClick={onOpenAddressModal}
              className="flex items-center gap-1.5 hover:text-amber-400 transition-colors text-left max-w-[200px] truncate"
            >
              <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span className="truncate font-medium">{address}</span>
              <ChevronDown className="w-3 h-3 text-stone-400 shrink-0" />
            </button>
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* AI Assistant Button */}
            <button
              onClick={onOpenAIAssistant}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-purple-900/60 via-amber-900/40 to-orange-900/60 hover:from-purple-800/80 hover:to-orange-800/80 text-amber-300 border border-amber-500/40 text-xs sm:text-sm font-semibold shadow-md shadow-purple-950/40 transition-all hover:scale-102 active:scale-98"
            >
              <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
              <span className="hidden sm:inline">AI Meal Assistant</span>
              <span className="sm:hidden">AI Advisor</span>
            </button>

            {/* Active Order Live Track Button if order placed */}
            {activeOrderCount > 0 && (
              <motion.button
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                onClick={onOpenLiveTracker}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-xs sm:text-sm font-semibold shadow-md hover:bg-emerald-900/90 transition-all"
              >
                <Clock className="w-4 h-4 text-emerald-400 animate-spin" />
                <span className="hidden sm:inline">Track Order</span>
                <span className="bg-emerald-500 text-stone-950 text-[10px] font-extrabold px-1.5 py-0.2 rounded-full">
                  LIVE
                </span>
              </motion.button>
            )}

            {/* Order History */}
            <button
              onClick={onOpenHistory}
              className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-stone-100 transition-colors border border-stone-700/60"
              title="Order History"
            >
              <History className="w-4 h-4" />
            </button>

            {/* Shopping Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs sm:text-sm shadow-md shadow-amber-500/20 transition-all hover:scale-102 active:scale-98"
            >
              <ShoppingBag className="w-4 h-4 shrink-0" />
              <span className="hidden xs:inline">Cart</span>
              {cartCount > 0 && (
                <span className="bg-stone-950 text-amber-400 text-xs font-black px-1.5 py-0.5 rounded-md min-w-[20px] text-center">
                  {cartCount}
                </span>
              )}
              {cartTotal > 0 && (
                <span className="hidden sm:inline text-xs font-black border-l border-stone-900/30 pl-2">
                  ${cartTotal.toFixed(2)}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Location bar & Search Bar Row */}
        <div className="py-2 border-t border-stone-800/80 flex flex-col sm:flex-row gap-2 pb-3">
          {/* Mobile location bar */}
          <div className="flex md:hidden items-center justify-between text-xs text-stone-300 bg-stone-800/60 px-3 py-1.5 rounded-lg border border-stone-700/50">
            <button onClick={onOpenAddressModal} className="flex items-center gap-1.5 truncate">
              <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span className="truncate">{address}</span>
            </button>
            <span className="text-amber-400 font-bold uppercase text-[10px] tracking-wider bg-stone-900 px-2 py-0.5 rounded">
              {orderType}
            </span>
          </div>

          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search dishes, burgers, pizza, sushi, bowls..."
              className="w-full pl-10 pr-4 py-2 bg-stone-800/90 text-stone-100 placeholder-stone-400 rounded-xl text-sm border border-stone-700/80 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-200 bg-stone-700 rounded-full w-4 h-4 flex items-center justify-center"
              >
                ✕
              </button>
            )}
          </div>
        </div>

      </div>
    </header>
  );
};
