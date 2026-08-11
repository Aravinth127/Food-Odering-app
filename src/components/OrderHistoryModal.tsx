import React from 'react';
import { Order, CartItem } from '../types';
import { X, History, RotateCcw, Clock, CheckCircle2, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface OrderHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: Order[];
  onReorder: (items: CartItem[]) => void;
  onSelectOrderToTrack: (order: Order) => void;
}

export const OrderHistoryModal: React.FC<OrderHistoryModalProps> = ({
  isOpen,
  onClose,
  orders,
  onReorder,
  onSelectOrderToTrack,
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-stone-900 border border-stone-800 w-full max-w-lg rounded-3xl overflow-hidden text-stone-100 shadow-2xl flex flex-col max-h-[85vh]"
        >
          {/* Header */}
          <div className="p-4 bg-stone-950 border-b border-stone-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <History className="w-5 h-5 text-amber-400" />
              <h2 className="text-lg font-bold text-stone-100">Order History</h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List */}
          <div className="p-4 overflow-y-auto space-y-3 flex-1">
            {orders.length === 0 ? (
              <div className="py-12 text-center text-stone-400 space-y-2">
                <ShoppingBag className="w-10 h-10 mx-auto text-stone-600" />
                <p className="font-bold text-stone-300">No past orders yet</p>
                <p className="text-xs">Place an order to track real-time delivery and re-order anytime!</p>
              </div>
            ) : (
              orders.map((order) => (
                <div
                  key={order.id}
                  className="bg-stone-800/80 rounded-2xl border border-stone-700/60 p-4 space-y-3"
                >
                  <div className="flex items-start justify-between border-b border-stone-700/60 pb-2.5">
                    <div>
                      <span className="text-xs font-mono font-bold text-amber-400">
                        #{order.id}
                      </span>
                      <h4 className="font-bold text-stone-100 text-sm">{order.restaurantName}</h4>
                      <span className="text-[11px] text-stone-400">{order.createdAt} • {order.deliveryAddress}</span>
                    </div>

                    <button
                      onClick={() => onSelectOrderToTrack(order)}
                      className="flex items-center gap-1 text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2.5 py-1 rounded-lg hover:bg-amber-500/30 transition-all"
                    >
                      <Clock className="w-3.5 h-3.5" />
                      <span>Track</span>
                    </button>
                  </div>

                  {/* Items summary */}
                  <div className="text-xs text-stone-300 space-y-1">
                    {order.items.map((item) => (
                      <div key={item.cartItemId} className="flex justify-between">
                        <span>{item.quantity}x {item.dish.name}</span>
                        <span className="text-stone-400">${item.totalPrice.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-stone-700/60 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-stone-400 uppercase block">Total</span>
                      <span className="text-sm font-black text-amber-400">${order.total.toFixed(2)}</span>
                    </div>

                    <button
                      onClick={() => onReorder(order.items)}
                      className="flex items-center gap-1.5 bg-stone-700 hover:bg-stone-600 text-stone-100 font-bold text-xs px-3 py-1.5 rounded-xl transition-all"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Re-order Items</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
