import React from 'react';
import { Sparkles, Tag, ArrowRight, ShieldCheck, Clock, Truck } from 'lucide-react';
import { HERO_BANNER_IMAGE } from '../data/mockData';

interface HeroBannerProps {
  onOpenAIAssistant: () => void;
  onApplyPromoCode: (code: string) => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onOpenAIAssistant,
  onApplyPromoCode,
}) => {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-stone-900 border border-stone-800 shadow-xl my-6">
      
      {/* Background Hero Image with Dark Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={HERO_BANNER_IMAGE}
          alt="Gourmet Food Feast"
          className="w-full h-full object-cover object-center opacity-40 scale-105 transform hover:scale-100 transition-transform duration-700"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-950/90 to-stone-900/30" />
      </div>

      {/* Content Area */}
      <div className="relative z-10 max-w-3xl px-6 py-8 sm:py-12 sm:px-10">
        
        {/* Promo Badge */}
        <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 border border-amber-500/40 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
          <Tag className="w-3.5 h-3.5 text-amber-400" />
          <span>Special Offer: Use Code <strong className="text-amber-200">WELCOME20</strong> for 20% OFF</span>
        </div>

        {/* Heading */}
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-stone-100 leading-tight">
          Crave It. Order It.{' '}
          <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-200 bg-clip-text text-transparent">
            Delivered in 25 Mins.
          </span>
        </h1>

        <p className="mt-3 text-stone-300 text-sm sm:text-base leading-relaxed max-w-xl">
          Order from top wood-fired pizzerias, smash burger spots, sushi bars, and healthy grain bowls with real-time live map tracking.
        </p>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button
            onClick={onOpenAIAssistant}
            className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-stone-950 font-extrabold px-5 py-3 rounded-xl shadow-lg shadow-amber-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 text-sm"
          >
            <Sparkles className="w-4 h-4 fill-stone-950" />
            <span>Ask AI Food Assistant</span>
          </button>

          <button
            onClick={() => onApplyPromoCode('WELCOME20')}
            className="flex items-center gap-2 bg-stone-800/90 hover:bg-stone-700/90 text-stone-200 border border-stone-700 px-4 py-3 rounded-xl text-sm font-semibold transition-all"
          >
            <Tag className="w-4 h-4 text-amber-400" />
            <span>Claim 20% Promo</span>
          </button>
        </div>

        {/* Service Highlights */}
        <div className="mt-8 pt-6 border-t border-stone-800/80 flex flex-wrap items-center gap-6 text-xs text-stone-400 font-medium">
          <div className="flex items-center gap-2">
            <Truck className="w-4 h-4 text-amber-400" />
            <span>Free Delivery on $25+</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-emerald-400" />
            <span>Avg 22 Min Arrival</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>100% Quality Guarantee</span>
          </div>
        </div>

      </div>
    </div>
  );
};
