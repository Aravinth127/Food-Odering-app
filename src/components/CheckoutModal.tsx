import React, { useState } from 'react';
import { CartItem, Order, DriverInfo } from '../types';
import { X, MapPin, CreditCard, ShieldCheck, Check, Truck, Lock, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  deliveryAddress: string;
  subtotal: number;
  deliveryFee: number;
  discount: number;
  tax: number;
  tipAmount: number;
  total: number;
  promoCode?: string;
  onPlaceOrderSuccess: (newOrder: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  deliveryAddress,
  subtotal,
  deliveryFee,
  discount,
  tax,
  tipAmount,
  total,
  promoCode,
  onPlaceOrderSuccess,
}) => {
  if (!isOpen) return null;

  const [addressInput, setAddressInput] = useState<string>(deliveryAddress);
  const [phoneInput, setPhoneInput] = useState<string>('(555) 234-5678');
  const [deliveryNote, setDeliveryNote] = useState<string>('Leave at front door / Ring bell');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple_pay' | 'cash'>('card');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      // Mock driver information
      const mockDriver: DriverInfo = {
        name: 'Carlos Mendez',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        phone: '(555) 882-1920',
        rating: 4.9,
        vehicle: 'Yamaha Scooter 🛵',
        licensePlate: 'FLVR-882',
        currentLat: 37.7749,
        currentLng: -122.4194,
      };

      const now = new Date();
      const orderId = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;

      const newOrder: Order = {
        id: orderId,
        restaurantName: cartItems[0]?.dish ? 'FlavorDash Express' : 'Gourmet Kitchen',
        items: cartItems,
        subtotal,
        deliveryFee,
        tax,
        discount,
        promoCodeApplied: promoCode,
        tip: tipAmount,
        total,
        deliveryAddress: addressInput,
        paymentMethod: paymentMethod === 'card' ? 'Visa •••• 4242' : paymentMethod === 'apple_pay' ? 'Apple Pay' : 'Cash on Delivery',
        status: 'placed',
        createdAt: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        estimatedDeliveryTime: '22-28 min',
        estimatedDeliveryTimestamp: Date.now() + 25 * 60 * 1000,
        driver: mockDriver,
        timeline: [
          { status: 'placed', label: 'Order Received', timestamp: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), completed: true, active: true },
          { status: 'preparing', label: 'Kitchen Preparing Dish', timestamp: 'In ~3 mins', completed: false, active: false },
          { status: 'picked_up', label: 'Driver Picked Up', timestamp: 'In ~12 mins', completed: false, active: false },
          { status: 'on_the_way', label: 'Out for Delivery', timestamp: 'In ~18 mins', completed: false, active: false },
          { status: 'delivered', label: 'Delivered to Doorstep', timestamp: 'In ~25 mins', completed: false, active: false },
        ]
      };

      setIsSubmitting(false);
      onPlaceOrderSuccess(newOrder);
    }, 1200);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-stone-900 border border-stone-800 w-full max-w-lg rounded-3xl overflow-hidden text-stone-100 shadow-2xl flex flex-col max-h-[92vh]"
        >
          {/* Header */}
          <div className="p-4 bg-stone-950 border-b border-stone-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-amber-400" />
              <h2 className="text-lg font-bold text-stone-100">Secure Checkout</h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handlePlaceOrder} className="p-5 overflow-y-auto space-y-5 flex-1">
            
            {/* Delivery Address */}
            <div className="bg-stone-800/80 rounded-2xl border border-stone-700/60 p-3.5 space-y-2">
              <label className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                Delivery Address
              </label>
              <input
                type="text"
                required
                value={addressInput}
                onChange={(e) => setAddressInput(e.target.value)}
                className="w-full px-3 py-2 bg-stone-900 text-stone-100 rounded-xl border border-stone-700 text-xs focus:outline-none focus:border-amber-500"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                <div>
                  <label className="text-[11px] font-medium text-stone-400">Contact Phone</label>
                  <input
                    type="text"
                    required
                    value={phoneInput}
                    onChange={(e) => setPhoneInput(e.target.value)}
                    className="w-full px-3 py-1.5 bg-stone-900 text-stone-100 rounded-lg border border-stone-700 text-xs focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-medium text-stone-400">Delivery Notes</label>
                  <input
                    type="text"
                    value={deliveryNote}
                    onChange={(e) => setDeliveryNote(e.target.value)}
                    className="w-full px-3 py-1.5 bg-stone-900 text-stone-100 rounded-lg border border-stone-700 text-xs focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-stone-400 uppercase tracking-wider block">
                Payment Method
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-2xl border flex flex-col items-center gap-1.5 text-xs font-bold transition-all ${
                    paymentMethod === 'card'
                      ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                      : 'bg-stone-800/80 border-stone-700/60 text-stone-400 hover:text-stone-200'
                  }`}
                >
                  <CreditCard className="w-5 h-5" />
                  <span>Card</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('apple_pay')}
                  className={`p-3 rounded-2xl border flex flex-col items-center gap-1.5 text-xs font-bold transition-all ${
                    paymentMethod === 'apple_pay'
                      ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                      : 'bg-stone-800/80 border-stone-700/60 text-stone-400 hover:text-stone-200'
                  }`}
                >
                  <Lock className="w-5 h-5" />
                  <span>Apple Pay</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('cash')}
                  className={`p-3 rounded-2xl border flex flex-col items-center gap-1.5 text-xs font-bold transition-all ${
                    paymentMethod === 'cash'
                      ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                      : 'bg-stone-800/80 border-stone-700/60 text-stone-400 hover:text-stone-200'
                  }`}
                >
                  <Truck className="w-5 h-5" />
                  <span>Cash</span>
                </button>
              </div>
            </div>

            {/* Order Final Summary */}
            <div className="bg-stone-950 p-3.5 rounded-2xl border border-stone-800 text-xs space-y-1.5">
              <div className="flex justify-between font-medium text-stone-400">
                <span>Items Subtotal ({cartItems.reduce((s, i) => s + i.quantity, 0)})</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-400 font-medium">
                  <span>Discount</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between font-medium text-stone-400">
                <span>Delivery & Tax</span>
                <span>${(deliveryFee + tax).toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-medium text-stone-400">
                <span>Tip</span>
                <span>${tipAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm font-black text-amber-400 pt-2 border-t border-stone-800">
                <span>Total Due</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-stone-950 font-black py-3.5 rounded-2xl shadow-xl shadow-amber-500/25 text-sm flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Processing Payment...</span>
              ) : (
                <>
                  <Check className="w-5 h-5 stroke-[3]" />
                  <span>Confirm & Pay ${total.toFixed(2)}</span>
                </>
              )}
            </button>

          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
