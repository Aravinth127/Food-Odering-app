import React, { useState } from 'react';
import { Dish, CategoryType, CartItem, CustomizationChoice, Order, OrderStatus } from './types';
import { DISHES, RESTAURANTS, PROMO_CODES } from './data/mockData';
import { Header } from './components/Header';
import { CategoryNav } from './components/CategoryNav';
import { HeroBanner } from './components/HeroBanner';
import { DishCard } from './components/DishCard';
import { DishCustomizeModal } from './components/DishCustomizeModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { LiveTrackerModal } from './components/LiveTrackerModal';
import { AIAssistantModal } from './components/AIAssistantModal';
import { OrderHistoryModal } from './components/OrderHistoryModal';
import { LocationModal } from './components/LocationModal';
import { Star, Clock, Sparkles, Utensils, Award } from 'lucide-react';

export default function App() {
  // App State
  const [address, setAddress] = useState<string>('124 Main Street, Downtown');
  const [orderType, setOrderType] = useState<'delivery' | 'pickup'>('delivery');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('all');
  const [activeDietaryFilters, setActiveDietaryFilters] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Cart State
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [appliedPromo, setAppliedPromo] = useState<string | null>('WELCOME20'); // Default welcome offer preset
  const [tipAmount, setTipAmount] = useState<number>(3.50);

  // Orders State
  const [orders, setOrders] = useState<Order[]>([]);
  const [activeTrackingOrderId, setActiveTrackingOrderId] = useState<string | null>(null);

  // Modals Visibility
  const [customizingDish, setCustomizingDish] = useState<Dish | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [isLiveTrackerOpen, setIsLiveTrackerOpen] = useState<boolean>(false);
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState<boolean>(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState<boolean>(false);
  const [isLocationOpen, setIsLocationOpen] = useState<boolean>(false);

  // Filter Dishes Logic
  const filteredDishes = DISHES.filter((dish) => {
    // Category match
    if (selectedCategory !== 'all' && dish.category !== selectedCategory) {
      return false;
    }

    // Search query match
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const nameMatch = dish.name.toLowerCase().includes(q);
      const descMatch = dish.description.toLowerCase().includes(q);
      const catMatch = dish.category.toLowerCase().includes(q);
      const ingMatch = dish.ingredients.some((ing) => ing.toLowerCase().includes(q));
      if (!nameMatch && !descMatch && !catMatch && !ingMatch) {
        return false;
      }
    }

    // Dietary filters match
    if (activeDietaryFilters.includes('popular') && !dish.isPopular) return false;
    if (activeDietaryFilters.includes('vegan') && !dish.isVegan) return false;
    if (activeDietaryFilters.includes('glutenFree') && !dish.isGlutenFree) return false;
    if (activeDietaryFilters.includes('spicy') && !dish.isSpicy) return false;
    if (activeDietaryFilters.includes('under30') && dish.prepTimeMinutes > 20) return false;

    return true;
  });

  // Toggle Dietary Filter Tag
  const handleToggleDietaryFilter = (filter: string) => {
    if (activeDietaryFilters.includes(filter)) {
      setActiveDietaryFilters(activeDietaryFilters.filter((f) => f !== filter));
    } else {
      setActiveDietaryFilters([...activeDietaryFilters, filter]);
    }
  };

  // Cart Helpers
  const handleAddToCart = (dish: Dish, quantity: number, choice: CustomizationChoice) => {
    const sizeDelta = choice.selectedSize ? choice.selectedSize.priceDelta : 0;
    const addonsTotal = choice.selectedAddons.reduce((sum, a) => sum + a.price, 0);
    const unitPrice = dish.price + sizeDelta + addonsTotal;
    const totalPrice = unitPrice * quantity;

    const cartItemId = `${dish.id}-${choice.selectedSize?.name || 'def'}-${choice.spiceLevel || 'normal'}-${choice.selectedAddons.map(a => a.id).sort().join('-')}`;

    // Check if identical item with same customizations exists
    const existingIndex = cartItems.findIndex((item) => item.cartItemId === cartItemId);
    if (existingIndex > -1) {
      const updated = [...cartItems];
      const newQty = updated[existingIndex].quantity + quantity;
      updated[existingIndex].quantity = newQty;
      updated[existingIndex].totalPrice = updated[existingIndex].unitPrice * newQty;
      setCartItems(updated);
    } else {
      const newItem: CartItem = {
        cartItemId,
        dish,
        quantity,
        choice,
        unitPrice,
        totalPrice,
      };
      setCartItems([...cartItems, newItem]);
    }

    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(cartItemId);
    } else {
      setCartItems(
        cartItems.map((item) => {
          if (item.cartItemId === cartItemId) {
            return {
              ...item,
              quantity: newQty,
              totalPrice: item.unitPrice * newQty,
            };
          }
          return item;
        })
      );
    }
  };

  const handleRemoveItem = (cartItemId: string) => {
    setCartItems(cartItems.filter((item) => item.cartItemId !== cartItemId));
  };

  const handleApplyPromo = (code: string): string | null => {
    const upper = code.toUpperCase();
    if (PROMO_CODES[upper]) {
      setAppliedPromo(upper);
      return null;
    }
    return 'Invalid promo code. Try WELCOME20, FREEDELIVERY, or SAVEOFF5';
  };

  // Place Order Success
  const handlePlaceOrderSuccess = (newOrder: Order) => {
    setOrders([newOrder, ...orders]);
    setActiveTrackingOrderId(newOrder.id);
    setCartItems([]);
    setIsCheckoutOpen(false);
    setIsCartOpen(false);
    setIsLiveTrackerOpen(true);
  };

  // Advance Order Status for live tracker simulation
  const handleAdvanceOrderStatus = (orderId: string) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id === orderId) {
          let nextStatus: OrderStatus = 'placed';
          if (o.status === 'placed') nextStatus = 'preparing';
          else if (o.status === 'preparing') nextStatus = 'picked_up';
          else if (o.status === 'picked_up') nextStatus = 'on_the_way';
          else if (o.status === 'on_the_way') nextStatus = 'delivered';
          else if (o.status === 'delivered') return o;

          return {
            ...o,
            status: nextStatus,
          };
        }
        return o;
      })
    );
  };

  const activeTrackingOrder = orders.find((o) => o.id === activeTrackingOrderId) || orders[0] || null;
  const activeOrderCount = orders.filter((o) => o.status !== 'delivered').length;

  const cartSubtotal = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 font-sans antialiased selection:bg-amber-500 selection:text-stone-950">
      
      {/* Sticky Header */}
      <Header
        address={address}
        onOpenAddressModal={() => setIsLocationOpen(true)}
        orderType={orderType}
        setOrderType={setOrderType}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        cartCount={cartItems.reduce((sum, i) => sum + i.quantity, 0)}
        cartTotal={cartSubtotal}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAIAssistant={() => setIsAIAssistantOpen(true)}
        activeOrderCount={activeOrderCount}
        onOpenLiveTracker={() => {
          if (orders.length > 0) {
            setActiveTrackingOrderId(orders[0].id);
            setIsLiveTrackerOpen(true);
          }
        }}
        onOpenHistory={() => setIsHistoryOpen(true)}
      />

      {/* Category Navigation Bar */}
      <CategoryNav
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        activeDietaryFilters={activeDietaryFilters}
        onToggleDietaryFilter={handleToggleDietaryFilter}
      />

      {/* Main Body Layout */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        
        {/* Promotional Hero Banner */}
        <HeroBanner
          onOpenAIAssistant={() => setIsAIAssistantOpen(true)}
          onApplyPromoCode={(code) => {
            setAppliedPromo(code);
            setIsCartOpen(true);
          }}
        />

        {/* Featured Restaurants Bar */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-extrabold text-stone-100 tracking-tight flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" />
              <span>Top Featured Kitchens</span>
            </h2>
            <span className="text-xs text-stone-400 font-medium">Curated Local Artisans</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {RESTAURANTS.map((rest) => (
              <div
                key={rest.id}
                className="bg-stone-900 rounded-2xl border border-stone-800 p-4 flex gap-3.5 items-center hover:border-stone-700 transition-all shadow-md"
              >
                <img
                  src={rest.bannerImage}
                  alt={rest.name}
                  className="w-16 h-16 rounded-xl object-cover shrink-0 bg-stone-950"
                  referrerPolicy="no-referrer"
                />
                <div className="min-w-0 flex-1">
                  <h3 className="font-bold text-stone-100 text-sm truncate">{rest.name}</h3>
                  <p className="text-xs text-stone-400 truncate mt-0.5">{rest.cuisine}</p>
                  
                  <div className="flex items-center gap-2 text-[11px] font-semibold text-stone-300 mt-2">
                    <span className="flex items-center text-amber-400 bg-stone-800 px-1.5 py-0.2 rounded">
                      <Star className="w-3 h-3 fill-amber-400 mr-1" />
                      {rest.rating}
                    </span>
                    <span>• {rest.deliveryTime}</span>
                    <span className="text-emerald-400">
                      • {rest.deliveryFee === 0 ? 'Free Delivery' : `$${rest.deliveryFee}`}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Dishes Menu Grid */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-extrabold text-stone-100 tracking-tight">
                {selectedCategory === 'all' ? 'All Gourmet Menu Items' : `${selectedCategory.toUpperCase()} Menu`}
              </h2>
              <p className="text-xs text-stone-400 mt-0.5">
                Showing {filteredDishes.length} handcrafted options
              </p>
            </div>

            {activeDietaryFilters.length > 0 && (
              <button
                onClick={() => setActiveDietaryFilters([])}
                className="text-xs text-amber-400 hover:underline font-semibold"
              >
                Clear Filters ({activeDietaryFilters.length})
              </button>
            )}
          </div>

          {filteredDishes.length === 0 ? (
            <div className="py-16 text-center bg-stone-900 rounded-3xl border border-stone-800 p-8 text-stone-400 space-y-3">
              <Utensils className="w-10 h-10 mx-auto text-stone-600" />
              <p className="text-base font-bold text-stone-200">No dishes match your filter</p>
              <p className="text-xs text-stone-400">
                Try searching for something else or clearing your dietary filters!
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setActiveDietaryFilters([]);
                  setSearchQuery('');
                }}
                className="px-4 py-2 bg-amber-500 text-stone-950 font-bold rounded-xl text-xs"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDishes.map((dish) => {
                const rest = RESTAURANTS.find((r) => r.id === dish.restaurantId);
                return (
                  <DishCard
                    key={dish.id}
                    dish={dish}
                    restaurant={rest}
                    onCustomizeDish={(d) => setCustomizingDish(d)}
                  />
                );
              })}
            </div>
          )}

        </section>

      </main>

      {/* Floating Active Order Status Bar if order placed */}
      {activeOrderCount > 0 && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-11/12 max-w-lg bg-emerald-950/95 text-emerald-100 border border-emerald-500/60 p-3.5 rounded-2xl shadow-2xl backdrop-blur-md flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
            <div>
              <span className="text-xs font-black uppercase text-emerald-300 block">
                Live Order #{orders[0].id}
              </span>
              <span className="text-xs text-emerald-200">
                Status: <strong className="capitalize">{orders[0].status.replace('_', ' ')}</strong> ({orders[0].estimatedDeliveryTime})
              </span>
            </div>
          </div>

          <button
            onClick={() => {
              setActiveTrackingOrderId(orders[0].id);
              setIsLiveTrackerOpen(true);
            }}
            className="bg-emerald-500 hover:bg-emerald-400 text-stone-950 text-xs font-black px-3.5 py-2 rounded-xl transition-all shadow-md"
          >
            Track Map
          </button>
        </div>
      )}

      {/* Modals & Drawers */}
      <DishCustomizeModal
        dish={customizingDish}
        onClose={() => setCustomizingDish(null)}
        onAddToCart={handleAddToCart}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        appliedPromo={appliedPromo}
        onApplyPromo={handleApplyPromo}
        onRemovePromo={() => setAppliedPromo(null)}
        tipAmount={tipAmount}
        setTipAmount={setTipAmount}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        deliveryAddress={address}
        subtotal={cartSubtotal}
        deliveryFee={cartSubtotal >= 25 ? 0 : 2.99}
        discount={
          appliedPromo && PROMO_CODES[appliedPromo]
            ? PROMO_CODES[appliedPromo].type === 'percentage'
              ? (cartSubtotal * PROMO_CODES[appliedPromo].value) / 100
              : PROMO_CODES[appliedPromo].value
            : 0
        }
        tax={cartSubtotal * 0.0825}
        tipAmount={tipAmount}
        total={
          cartSubtotal +
          (cartSubtotal >= 25 ? 0 : 2.99) +
          cartSubtotal * 0.0825 +
          tipAmount -
          (appliedPromo && PROMO_CODES[appliedPromo]
            ? PROMO_CODES[appliedPromo].type === 'percentage'
              ? (cartSubtotal * PROMO_CODES[appliedPromo].value) / 100
              : PROMO_CODES[appliedPromo].value
            : 0)
        }
        promoCode={appliedPromo || undefined}
        onPlaceOrderSuccess={handlePlaceOrderSuccess}
      />

      <LiveTrackerModal
        isOpen={isLiveTrackerOpen}
        onClose={() => setIsLiveTrackerOpen(false)}
        order={activeTrackingOrder}
        onAdvanceStatus={handleAdvanceOrderStatus}
      />

      <AIAssistantModal
        isOpen={isAIAssistantOpen}
        onClose={() => setIsAIAssistantOpen(false)}
        onAddToCart={(dish, qty, choice) => {
          handleAddToCart(dish, qty, choice);
          setIsAIAssistantOpen(false);
        }}
      />

      <OrderHistoryModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        orders={orders}
        onReorder={(items) => {
          setCartItems([...cartItems, ...items]);
          setIsHistoryOpen(false);
          setIsCartOpen(true);
        }}
        onSelectOrderToTrack={(order) => {
          setActiveTrackingOrderId(order.id);
          setIsHistoryOpen(false);
          setIsLiveTrackerOpen(true);
        }}
      />

      <LocationModal
        isOpen={isLocationOpen}
        onClose={() => setIsLocationOpen(false)}
        currentAddress={address}
        onSaveAddress={setAddress}
      />

    </div>
  );
}
