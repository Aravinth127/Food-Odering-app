import React, { useEffect, useState } from 'react';
import { Order, OrderStatus } from '../types';
import { X, CheckCircle2, Clock, MapPin, Phone, MessageSquare, Star, Truck, Navigation, Bike, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface LiveTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order | null;
  onAdvanceStatus?: (orderId: string) => void;
}

const STATUS_STEPS: { status: OrderStatus; title: string; subtitle: string }[] = [
  { status: 'placed', title: 'Order Confirmed', subtitle: 'Kitchen received your request' },
  { status: 'preparing', title: 'Preparing Food', subtitle: 'Chef is crafting your meal' },
  { status: 'picked_up', title: 'Driver Picked Up', subtitle: 'Courier collected order' },
  { status: 'on_the_way', title: 'Out for Delivery', subtitle: 'Courier is en route to you' },
  { status: 'delivered', title: 'Delivered!', subtitle: 'Enjoy your meal 🎉' },
];

export const LiveTrackerModal: React.FC<LiveTrackerModalProps> = ({
  isOpen,
  onClose,
  order,
  onAdvanceStatus,
}) => {
  if (!isOpen || !order) return null;

  // Courier scooter position animation on simulated map canvas
  const [driverPosProgress, setDriverPosProgress] = useState<number>(0.2);

  useEffect(() => {
    const interval = setInterval(() => {
      setDriverPosProgress((prev) => (prev >= 0.95 ? 0.95 : prev + 0.05));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const getStepIndex = (status: OrderStatus) => {
    switch (status) {
      case 'placed': return 0;
      case 'preparing': return 1;
      case 'picked_up': return 2;
      case 'on_the_way': return 3;
      case 'delivered': return 4;
      default: return 0;
    }
  };

  const currentStepIdx = getStepIndex(order.status);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          className="bg-stone-900 border border-stone-800 w-full max-w-2xl rounded-3xl overflow-hidden text-stone-100 shadow-2xl flex flex-col max-h-[92vh]"
        >
          {/* Header */}
          <div className="p-4 bg-stone-950 border-b border-stone-800 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                <h2 className="text-lg font-black text-stone-100">Live Delivery Tracker</h2>
              </div>
              <span className="text-xs text-stone-400 font-mono">
                Order #{order.id} • {order.restaurantName}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {/* Simulation button to fast forward order status */}
              {onAdvanceStatus && order.status !== 'delivered' && (
                <button
                  onClick={() => onAdvanceStatus(order.id)}
                  className="flex items-center gap-1 text-[11px] font-bold bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 px-2.5 py-1 rounded-lg transition-all"
                  title="Simulate next delivery stage"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Next Stage</span>
                </button>
              )}

              <button
                onClick={onClose}
                className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="p-5 overflow-y-auto space-y-6 flex-1">
            
            {/* Live Map Visualization Canvas */}
            <div className="relative h-48 sm:h-56 w-full rounded-2xl bg-stone-950 border border-stone-800 overflow-hidden shadow-inner flex flex-col justify-between p-4">
              {/* Map grid lines background styling */}
              <div 
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                  backgroundImage: `radial-gradient(#f59e0b 1px, transparent 1px), radial-gradient(#38bdf8 1px, transparent 1px)`,
                  backgroundSize: '24px 24px',
                  backgroundPosition: '0 0, 12px 12px'
                }}
              />

              {/* Map Route SVG Line */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <path
                  d="M 40,160 C 150,40 300,180 520,60"
                  fill="none"
                  stroke="#44403c"
                  strokeWidth="6"
                  strokeDasharray="6 6"
                />
                <path
                  d="M 40,160 C 150,40 300,180 520,60"
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="6"
                  strokeDasharray="500"
                  strokeDashoffset={500 * (1 - (currentStepIdx / 4))}
                  className="transition-all duration-700"
                />
              </svg>

              {/* Restaurant Marker */}
              <div className="absolute left-8 bottom-6 z-10 flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-orange-600 text-white flex items-center justify-center shadow-lg border-2 border-stone-900">
                  <Truck className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-bold text-stone-300 mt-1 bg-stone-900/90 px-1.5 py-0.5 rounded border border-stone-800">
                  Kitchen
                </span>
              </div>

              {/* Customer Destination Marker */}
              <div className="absolute right-8 top-6 z-10 flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-emerald-500 text-stone-950 flex items-center justify-center shadow-lg border-2 border-stone-900">
                  <MapPin className="w-4 h-4 fill-stone-950" />
                </div>
                <span className="text-[10px] font-bold text-stone-300 mt-1 bg-stone-900/90 px-1.5 py-0.5 rounded border border-stone-800">
                  You
                </span>
              </div>

              {/* Animated Driver Scooter Marker */}
              {order.status !== 'delivered' && (
                <div 
                  className="absolute z-20 transition-all duration-700 transform -translate-x-1/2 -translate-y-1/2"
                  style={{
                    left: `${Math.min(85, Math.max(15, (currentStepIdx + 1) * 20))}%`,
                    top: `${currentStepIdx % 2 === 0 ? '60%' : '35%'}`
                  }}
                >
                  <div className="w-10 h-10 rounded-full bg-amber-500 text-stone-950 flex items-center justify-center shadow-xl border-2 border-amber-300 animate-bounce">
                    <Bike className="w-5 h-5 stroke-[2.5]" />
                  </div>
                </div>
              )}

              {/* ETA Overlay Card */}
              <div className="relative z-10 self-start bg-stone-900/90 backdrop-blur-md px-3.5 py-2 rounded-xl border border-stone-700/80 shadow-md flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400" />
                <div>
                  <span className="text-[10px] uppercase text-stone-400 block font-bold">Estimated Arrival</span>
                  <span className="text-sm font-black text-emerald-400">
                    {order.status === 'delivered' ? 'Arrived & Delivered 🎉' : order.estimatedDeliveryTime}
                  </span>
                </div>
              </div>

            </div>

            {/* Timeline Progress Stages */}
            <div className="bg-stone-800/60 rounded-2xl border border-stone-700/60 p-4">
              <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-4">
                Delivery Progress
              </h3>

              <div className="space-y-4 relative before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-stone-700">
                {STATUS_STEPS.map((step, idx) => {
                  const isDone = idx <= currentStepIdx;
                  const isCurrent = idx === currentStepIdx;

                  return (
                    <div key={step.status} className="relative flex items-start gap-3.5 z-10">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-all ${
                        isDone
                          ? 'bg-amber-500 text-stone-950 ring-4 ring-amber-500/20'
                          : 'bg-stone-800 text-stone-500 border border-stone-700'
                      }`}>
                        {isDone ? <CheckCircle2 className="w-4 h-4 stroke-[2.5]" /> : idx + 1}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className={`text-xs font-bold ${isCurrent ? 'text-amber-400 font-extrabold' : isDone ? 'text-stone-100' : 'text-stone-500'}`}>
                            {step.title}
                          </h4>
                          {isCurrent && (
                            <span className="bg-amber-500/20 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-500/40">
                              IN PROGRESS
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-stone-400 mt-0.5">
                          {step.subtitle}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Courier Driver Profile Card */}
            <div className="bg-stone-800/80 rounded-2xl border border-stone-700/60 p-4 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <img
                  src={order.driver.avatar}
                  alt={order.driver.name}
                  className="w-12 h-12 rounded-xl object-cover border border-amber-500/50 shadow-md"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-sm font-bold text-stone-100">{order.driver.name}</h4>
                    <span className="flex items-center text-[10px] font-bold text-amber-400 bg-stone-900 px-1.5 py-0.2 rounded">
                      <Star className="w-3 h-3 fill-amber-400 mr-0.5" />
                      {order.driver.rating}
                    </span>
                  </div>
                  <p className="text-xs text-stone-400 mt-0.5">
                    {order.driver.vehicle} • {order.driver.licensePlate}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={`tel:${order.driver.phone}`}
                  className="p-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold shadow-md transition-colors"
                  title="Call Driver"
                >
                  <Phone className="w-4 h-4 stroke-[2.5]" />
                </a>
                <button
                  onClick={() => alert(`Messaging courier ${order.driver.name}: "Hello, please leave at front door!"`)}
                  className="p-2.5 rounded-xl bg-stone-700 hover:bg-stone-600 text-stone-100 font-bold transition-colors"
                  title="Message Courier"
                >
                  <MessageSquare className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Order Receipt Breakdown */}
            <div className="bg-stone-950 p-4 rounded-2xl border border-stone-800 text-xs space-y-2">
              <h4 className="font-bold text-stone-300 uppercase tracking-wider text-[11px] mb-2">
                Order Items ({order.items.length})
              </h4>
              {order.items.map((item) => (
                <div key={item.cartItemId} className="flex justify-between text-stone-300">
                  <span>{item.quantity}x {item.dish.name}</span>
                  <span className="font-bold">${item.totalPrice.toFixed(2)}</span>
                </div>
              ))}
              <div className="pt-2 border-t border-stone-800 flex justify-between font-black text-amber-400 text-sm">
                <span>Total Paid</span>
                <span>${order.total.toFixed(2)} ({order.paymentMethod})</span>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
